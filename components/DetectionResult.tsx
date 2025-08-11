import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { CircleCheck as CheckCircle, Circle as XCircle, ArrowLeft, Share, Calendar, Eye, Gauge } from 'lucide-react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  useAnimatedProps,
} from 'react-native-reanimated';
import { DetectionResult as DetectionResultType } from '@/services/DetectionService';

const { width: screenWidth } = Dimensions.get('window');

interface Props {
  result: DetectionResultType;
  imageUri: string | null;
  onReset: () => void;
}

export function DetectionResult({ result, imageUri, onReset }: Props) {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  React.useEffect(() => {
    scale.value = withSpring(1, { damping: 20, stiffness: 90 });
    opacity.value = withTiming(1, { duration: 500 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const confidenceColor = result.confidence > 0.8 ? '#22C55E' : 
                         result.confidence > 0.6 ? '#F59E0B' : '#EF4444';

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onReset}>
          <ArrowLeft size={24} color="#FFFFFF" strokeWidth={2} />
        </TouchableOpacity>
        
        <Text style={styles.title}>Detection Result</Text>
        
        <TouchableOpacity style={styles.shareButton}>
          <Share size={24} color="#FFFFFF" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <Animated.View style={[styles.content, animatedStyle]}>
        {imageUri && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: imageUri }} style={styles.image} />
          </View>
        )}

        <View style={styles.resultCard}>
          <View style={styles.resultHeader}>
            {result.isCauliflower ? (
              <CheckCircle size={32} color="#22C55E" strokeWidth={2} />
            ) : (
              <XCircle size={32} color="#EF4444" strokeWidth={2} />
            )}
            
            <View style={styles.resultTextContainer}>
              <Text style={[
                styles.resultTitle,
                { color: result.isCauliflower ? '#22C55E' : '#EF4444' }
              ]}>
                {result.isCauliflower ? 'Cauliflower Detected!' : 'Not Cauliflower'}
              </Text>
              <Text style={styles.resultSubtitle}>
                {result.isCauliflower 
                  ? 'Fresh cauliflower identified in the image'
                  : 'No cauliflower found in this image'
                }
              </Text>
            </View>
          </View>

          <View style={styles.confidenceContainer}>
            <View style={styles.confidenceHeader}>
              <Gauge size={20} color="#374151" strokeWidth={2} />
              <Text style={styles.confidenceLabel}>Confidence Score</Text>
            </View>
            
            <View style={styles.confidenceBar}>
              <View 
                style={[
                  styles.confidenceFill,
                  { 
                    width: `${result.confidence * 100}%`,
                    backgroundColor: confidenceColor,
                  }
                ]} 
              />
            </View>
            
            <Text style={[styles.confidenceText, { color: confidenceColor }]}>
              {(result.confidence * 100).toFixed(1)}%
            </Text>
          </View>

          {result.details && (
            <View style={styles.detailsContainer}>
              <Text style={styles.detailsTitle}>Analysis Details</Text>
              
              <View style={styles.detailsGrid}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Size</Text>
                  <Text style={styles.detailValue}>{result.details.size}</Text>
                </View>
                
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Freshness</Text>
                  <Text style={styles.detailValue}>{result.details.freshness}</Text>
                </View>
                
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Quality</Text>
                  <Text style={styles.detailValue}>{result.details.quality}</Text>
                </View>
              </View>
            </View>
          )}

          <View style={styles.timestampContainer}>
            <Calendar size={16} color="#9CA3AF" strokeWidth={2} />
            <Text style={styles.timestampText}>
              {formatTimestamp(result.timestamp)}
            </Text>
          </View>
        </View>

        {result.labels && result.labels.length > 0 && (
          <View style={styles.labelsContainer}>
            <Text style={styles.labelsTitle}>Detected Labels</Text>
            <View style={styles.labelsGrid}>
              {result.labels.slice(0, 6).map((label, index) => (
                <View key={index} style={styles.labelItem}>
                  <Text style={styles.labelText}>{label.description}</Text>
                  <Text style={styles.labelScore}>
                    {(label.score * 100).toFixed(0)}%
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <TouchableOpacity style={styles.detectAgainButton} onPress={onReset}>
          <Eye size={20} color="#FFFFFF" strokeWidth={2} />
          <Text style={styles.detectAgainText}>Detect Again</Text>
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: '#111827',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#FFFFFF',
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 24,
  },
  imageContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  image: {
    width: screenWidth - 48,
    height: screenWidth - 48,
    backgroundColor: '#F3F4F6',
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  resultTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  resultTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    marginBottom: 4,
  },
  resultSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  confidenceContainer: {
    marginBottom: 24,
  },
  confidenceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  confidenceLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#374151',
    marginLeft: 8,
  },
  confidenceBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  confidenceFill: {
    height: '100%',
    borderRadius: 4,
  },
  confidenceText: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    textAlign: 'right',
  },
  detailsContainer: {
    marginBottom: 24,
  },
  detailsTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#374151',
    marginBottom: 16,
  },
  detailsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  detailItem: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  detailLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  detailValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#374151',
    textAlign: 'center',
  },
  labelsContainer: {
    marginBottom: 24,
  },
  labelsTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#374151',
    marginBottom: 12,
  },
  labelsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  labelItem: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#374151',
    marginRight: 6,
  },
  labelScore: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 11,
    color: '#6B7280',
  },
  timestampContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  timestampText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9CA3AF',
    marginLeft: 8,
  },
  detectAgainButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#22C55E',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    shadowColor: '#22C55E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  detectAgainText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
});