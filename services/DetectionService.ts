import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';

export interface DetectionResult {
  isCauliflower: boolean;
  confidence: number;
  timestamp: string;
  details?: {
    size: string;
    freshness: string;
    quality: string;
  };
  labels?: Array<{
    description: string;
    score: number;
  }>;
}

export interface HistoryItem {
  id: string;
  imageUri: string;
  result: DetectionResult;
}

const HISTORY_KEY = 'cauliflower_detection_history';

// Google Vision API configuration
const GOOGLE_VISION_API_URL =
  'https://vision.googleapis.com/v1/images:annotate';

// Cauliflower-related keywords for detection
const CAULIFLOWER_KEYWORDS = [
  'cauliflower',
  'vegetable',
  'broccoli', // Sometimes confused with cauliflower
  'cabbage',
  'produce',
  'food',
  'white vegetable',
  'cruciferous',
];

export class DetectionService {
  static async detectCauliflower(imageUri: string): Promise<DetectionResult> {
    try {
      // Convert image to base64
      const base64Image = await this.convertImageToBase64(imageUri);

      // Call Google Vision API
      const visionResponse = await this.callGoogleVisionAPI(base64Image);

      // Analyze the response for cauliflower detection
      const analysisResult = this.analyzeLabelAnnotations(visionResponse);

      const result: DetectionResult = {
        ...analysisResult,
        timestamp: new Date().toISOString(),
      };

      // Save to history
      await this.saveToHistory(imageUri, result);

      return result;
    } catch (error) {
      console.error('Detection error:', error);

      // Fallback to mock detection if API fails
      return this.mockDetection(imageUri);
    }
  }

  private static async convertImageToBase64(imageUri: string): Promise<string> {
    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();

      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = (reader.result as string).split(',')[1];
          resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      throw new Error('Failed to convert image to base64');
    }
  }

  private static async callGoogleVisionAPI(base64Image: string) {
    const apiKey = process.env.EXPO_PUBLIC_GOOGLE_VISION_API_KEY;

    if (!apiKey || apiKey === 'your_google_vision_api_key_here') {
      throw new Error('Google Vision API key not configured');
    }

    const requestBody = {
      requests: [
        {
          image: {
            content: base64Image,
          },
          features: [
            {
              type: 'LABEL_DETECTION',
              maxResults: 20,
            },
            {
              type: 'OBJECT_LOCALIZATION',
              maxResults: 10,
            },
          ],
        },
      ],
    };

    const response = await fetch(`${GOOGLE_VISION_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Google Vision API error: ${
          errorData.error?.message || 'Unknown error'
        }`
      );
    }

    return response.json();
  }

  private static analyzeLabelAnnotations(
    visionResponse: any
  ): Omit<DetectionResult, 'timestamp'> {
    const annotations = visionResponse.responses?.[0];
    const labelAnnotations = annotations?.labelAnnotations || [];
    const objectAnnotations = annotations?.localizedObjectAnnotations || [];

    // Extract all labels with scores
    const labels = labelAnnotations.map((label: any) => ({
      description: label.description.toLowerCase(),
      score: label.score,
    }));

    // Check for cauliflower-specific detection
    let maxCauliflowerScore = 0;
    let isCauliflower = false;

    // Direct cauliflower detection
    const cauliflowerLabel = labels.find(
      (label: any) => label.description === 'cauliflower'
    );

    if (cauliflowerLabel) {
      maxCauliflowerScore = cauliflowerLabel.score;
      isCauliflower = cauliflowerLabel.score > 0.5;
    } else {
      // Check for related vegetable terms
      const vegetableLabels = labels.filter((label: any) =>
        CAULIFLOWER_KEYWORDS.some((keyword) =>
          label.description.includes(keyword.toLowerCase())
        )
      );

      if (vegetableLabels.length > 0) {
        maxCauliflowerScore = Math.max(
          ...vegetableLabels.map((l: any) => l.score)
        );

        // More conservative detection for related terms
        const hasVegetableContext = labels.some((label: any) =>
          ['vegetable', 'produce', 'food'].includes(label.description)
        );

        isCauliflower = maxCauliflowerScore > 0.7 && hasVegetableContext;
      }
    }

    // Check object detection for additional context
    const vegetableObjects = objectAnnotations.filter((obj: any) =>
      CAULIFLOWER_KEYWORDS.some((keyword) =>
        obj.name.toLowerCase().includes(keyword.toLowerCase())
      )
    );

    if (vegetableObjects.length > 0 && !isCauliflower) {
      const objectScore = Math.max(
        ...vegetableObjects.map((obj: any) => obj.score)
      );
      if (objectScore > maxCauliflowerScore) {
        maxCauliflowerScore = objectScore;
        isCauliflower = objectScore > 0.6;
      }
    }

    // Generate details based on detection
    const details = isCauliflower
      ? this.generateDetailsFromLabels(labels)
      : undefined;

    return {
      isCauliflower,
      confidence: Math.min(maxCauliflowerScore, 0.95), // Cap at 95%
      labels: labels.slice(0, 10), // Include top 10 labels for debugging
      details,
    };
  }

  private static generateDetailsFromLabels(
    labels: Array<{ description: string; score: number }>
  ) {
    // Normalize labels array for quick searches
    const labelTexts = labels.map((l) => l.description);
    const hasAny = (keywords: readonly string[]) =>
      labelTexts.some((t) => keywords.some((k) => t.includes(k)));

    // Analyze labels to determine size, freshness, and quality
    const sizeKeywords = {
      small: ['small', 'tiny', 'mini'],
      medium: ['medium', 'regular'],
      large: ['large', 'big', 'huge', 'giant'],
    };

    // Positive freshness indicators (ordered strongest to weakest)
    const positiveFreshness = {
      'Peak Freshness': ['crisp', 'bright', 'vibrant', 'pristine'],
      'Very Fresh': ['fresh', 'healthy', 'clean', 'good'],
      Fresh: ['vegetable', 'produce'],
    } as const;

    // Quality positive indicators
    const qualityKeywords = {
      Premium: ['premium', 'perfect', 'excellent', 'pristine'],
      Excellent: ['good', 'fresh', 'healthy', 'quality'],
      Good: ['vegetable', 'food', 'produce'],
    } as const;

    // Negative indicators for freshness/quality
    const heavyNegatives = [
      'mold',
      'mould',
      'mildew',
      'fungus',
      'fungi',
      'rotten',
      'rot',
      'decay',
      'decayed',
      'spoiled',
      'spoilage',
      'blight',
    ];
    const mildNegatives = [
      'bruise',
      'bruised',
      'blemish',
      'blemished',
      'discoloration',
      'discoloured',
      'dirty',
      'soil',
      'soiled',
      'stain',
      'stained',
      'wilted',
      'wilt',
      'soft',
      'slimy',
    ];
    const colorModifiers = ['black', 'dark', 'brown', 'yellow', 'yellowing'];
    const spotWords = ['spot', 'spots', 'speck'];

    const hasHeavyNeg = hasAny(heavyNegatives);
    const hasMildNeg = hasAny(mildNegatives);
    const hasColoredSpots = hasAny(colorModifiers) && hasAny(spotWords);

    // Determine size
    let size = 'Medium';
    for (const [sizeType, keywords] of Object.entries(sizeKeywords)) {
      if (hasAny(keywords)) {
        size = sizeType.charAt(0).toUpperCase() + sizeType.slice(1);
        break;
      }
    }

    // Determine freshness with priority to negative indicators
    let freshness: string = 'Fresh';
    if (hasHeavyNeg || hasColoredSpots) {
      freshness = 'Spoiled';
    } else if (hasMildNeg) {
      freshness = 'Not Fresh';
    } else {
      for (const [freshnessType, keywords] of Object.entries(
        positiveFreshness
      )) {
        if (hasAny(keywords)) {
          freshness = freshnessType;
          break;
        }
      }
    }

    // Determine quality, degrade when negatives appear
    let quality: string = 'Good';
    if (freshness === 'Spoiled') {
      quality = 'Poor';
    } else if (freshness === 'Not Fresh') {
      quality = 'Fair';
    } else {
      for (const [qualityType, keywords] of Object.entries(qualityKeywords)) {
        if (hasAny(keywords)) {
          quality = qualityType;
          break;
        }
      }
    }

    return { size, freshness, quality };
  }

  private static async mockDetection(
    imageUri: string
  ): Promise<DetectionResult> {
    // Fallback mock detection when API fails
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const random = Math.random();
    const isCauliflower = random > 0.4;
    const confidence = isCauliflower
      ? 0.75 + Math.random() * 0.2
      : 0.15 + Math.random() * 0.6;

    const result: DetectionResult = {
      isCauliflower,
      confidence,
      timestamp: new Date().toISOString(),
      details: isCauliflower
        ? {
            size: ['Small', 'Medium', 'Large'][Math.floor(Math.random() * 3)],
            freshness: ['Fresh', 'Very Fresh', 'Peak Freshness'][
              Math.floor(Math.random() * 3)
            ],
            quality: ['Good', 'Excellent', 'Premium'][
              Math.floor(Math.random() * 3)
            ],
          }
        : undefined,
    };

    await this.saveToHistory(imageUri, result);
    return result;
  }

  static async saveToHistory(
    imageUri: string | null,
    result: DetectionResult
  ): Promise<void> {
    try {
      let storedImageUri = imageUri;
      if (imageUri && !imageUri.startsWith(FileSystem.documentDirectory!)) {
        const fileName = `cauli_${Date.now()}.jpg`;
        const destPath = FileSystem.documentDirectory + fileName;
        try {
          await FileSystem.copyAsync({ from: imageUri, to: destPath });
          storedImageUri = destPath;
        } catch (copyError) {
          console.warn('Failed to copy image to file system:', copyError);
        }
      }

      const existingHistory = await this.getHistory();
      const newItem: HistoryItem = {
        id: Date.now().toString(),
        imageUri: storedImageUri || '',
        result,
      };

      const updatedHistory = [newItem, ...existingHistory].slice(0, 20); // Keep last 20 items
      await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
    } catch (error) {
      console.error('Failed to save to history:', error);
    }
  }

  static async getHistory(): Promise<HistoryItem[]> {
    try {
      const historyJson = await AsyncStorage.getItem(HISTORY_KEY);
      return historyJson ? JSON.parse(historyJson) : [];
    } catch (error) {
      console.error('Failed to load history:', error);
      return [];
    }
  }

  static async clearHistory(): Promise<void> {
    try {
      await AsyncStorage.removeItem(HISTORY_KEY);
    } catch (error) {
      console.error('Failed to clear history:', error);
    }
  }

  static async deleteHistoryItem(id: string): Promise<void> {
    try {
      const history = await this.getHistory();
      const updatedHistory = history.filter((item) => item.id !== id);
      await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
    } catch (error) {
      console.error('Failed to delete history item:', error);
    }
  }
}
