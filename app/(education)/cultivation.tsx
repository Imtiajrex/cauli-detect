import React from 'react';
// Add this to cultivation.tsx after the imports
import { Youtube } from 'lucide-react-native';
import { Alert, Linking } from 'react-native';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  ArrowLeft,
  Sprout,
  Calendar,
  Droplets,
  Sun,
  Bug,
  Scissors,
} from 'lucide-react-native';
import { router } from 'expo-router';

const cultivationSteps = [
  {
    step: '১',
    title: 'জমি প্রস্তুতি',
    duration: '১-২ সপ্তাহ',
    description: 'উর্বর, সুনিষ্কাশিত দোঁআশ মাটি নির্বাচন করুন',
    details: [
      'জমি ৩-৪ বার চাষ দিন',
      'মাটিতে জৈব সার মিশান',
      'মাটির pH ৬.০-৭.০ রাখুন',
      'উঁচু বেড তৈরি করুন',
    ],
    color: '#F59E0B',
    bgColor: '#FEF3C7',
  },
  {
    step: '২',
    title: 'বীজ বপন ও চারা তৈরি',
    duration: '২৫-৩০ দিন',
    description: 'সিড বেড বা ট্রেতে বীজ বপন করে চারা তৈরি',
    details: [
      'আশ্বিন মাসে বীজ বপন করুন',
      'বীজতলায় ছায়ার ব্যবস্থা রাখুন',
      'নিয়মিত পানি স্প্রে করুন',
      '৪-৫ পাতা হলে রোপণ উপযুক্ত',
    ],
    color: '#10B981',
    bgColor: '#D1FAE5',
  },
  {
    step: '৩',
    title: 'চারা রোপণ',
    duration: '১ দিন',
    description: 'প্রস্তুত জমিতে চারা রোপণ করুন',
    details: [
      'সারি থেকে সারি ৫০ সে.মি.',
      'চারা থেকে চারা ৪০ সে.মি.',
      'বিকেলে রোপণ করুন',
      'রোপণের পর হালকা পানি দিন',
    ],
    color: '#8B5CF6',
    bgColor: '#EDE9FE',
  },
  {
    step: '৪',
    title: 'পরিচর্যা ও সার প্রয়োগ',
    duration: '৪-৬ সপ্তাহ',
    description: 'নিয়মিত পরিচর্যা ও সার প্রয়োগ',
    details: [
      'নিড়ানি দিয়ে আগাছা পরিষ্কার',
      'ইউরিয়া সার কিস্তিতে প্রয়োগ',
      'মাটি আলগা করে দিন',
      'পানি সেচের ব্যবস্থা রাখুন',
    ],
    color: '#06B6D4',
    bgColor: '#CFFAFE',
  },
  {
    step: '৫',
    title: 'ফুল বাঁধা ও সংরক্ষণ',
    duration: '১-২ সপ্তাহ',
    description: 'ফুল বাঁধার পর সুরক্ষার ব্যবস্থা',
    details: [
      'ফুলের উপর পাতা বেঁধে দিন',
      'সরাসরি রোদ থেকে রক্ষা করুন',
      'অতিরিক্ত পানি এড়িয়ে চলুন',
      'নিয়মিত পর্যবেক্ষণ করুন',
    ],
    color: '#EF4444',
    bgColor: '#FEE2E2',
  },
  {
    step: '৬',
    title: 'ফসল সংগ্রহ',
    duration: '১-২ সপ্তাহ',
    description: 'উপযুক্ত সময়ে ফসল সংগ্রহ',
    details: [
      'ফুল শক্ত ও সাদা হলে কাটুন',
      'ভোরবেলা কাটা ভালো',
      'ধারালো ছুরি ব্যবহার করুন',
      'সংগ্রহের পর ঠান্ডা জায়গায় রাখুন',
    ],
    color: '#22C55E',
    bgColor: '#DCFCE7',
  },
];



// Update the openYouTubeVideo function
const openYouTubeVideo = (videoId: string) => {
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
  
  // Check if we can open the URL, otherwise show an error
  Linking.canOpenURL(youtubeUrl).then(supported => {
    if (supported) {
      Linking.openURL(youtubeUrl);
    } else {
      Alert.alert(
        'Error',
        'Unable to open YouTube. Please make sure the YouTube app is installed.',
        [{ text: 'OK' }]
      );
    }
  });
};

const monthlyTasks = [
  {
    month: 'ভাদ্র (আগস্ট-সেপ্টেম্বর)',
    tasks: ['জমি প্রস্তুতি শুরু', 'জৈব সার প্রয়োগ', 'বীজ সংগ্রহ'],
  },
  {
    month: 'আশ্বিন (সেপ্টেম্বর-অক্টোবর)',
    tasks: ['বীজ বপন', 'সিড বেড তৈরি', 'চারা পরিচর্যা'],
  },
  {
    month: 'কার্তিক (অক্টোবর-নভেম্বর)',
    tasks: ['চারা রোপণ', 'প্রাথমিক পরিচর্যা', 'আগাছা পরিষ্কার'],
  },
  {
    month: 'অগ্রহায়ণ (নভেম্বর-ডিসেম্বর)',
    tasks: ['নিয়মিত সেচ', 'সার প্রয়োগ', 'রোগ-পোকা নিয়ন্ত্রণ'],
  },
  {
    month: 'পৌষ (ডিসেম্বর-জানুয়ারি)',
    tasks: ['ফুল বাঁধা', 'সুরক্ষা ব্যবস্থা', 'পানি নিয়ন্ত্রণ'],
  },
  {
    month: 'মাঘ (জানুয়ারি-ফেব্রুয়ারি)',
    tasks: ['ফসল সংগ্রহ', 'বাজারজাতকরণ', 'সংরক্ষণ'],
  },
];

const fertilizers = [
  {
    name: 'গোবর/কম্পোস্ট',
    amount: '১০-১৫ টন/হেক্টর',
    timing: 'জমি প্রস্তুতির সময়',
    benefit: 'মাটির উর্বরতা বৃদ্ধি',
  },
  {
    name: 'ইউরিয়া',
    amount: '২৫০ কেজি/হেক্টর',
    timing: '৩ কিস্তিতে',
    benefit: 'পাতা ও কান্ডের বৃদ্ধি',
  },
  {
    name: 'টিএসপি',
    amount: '১৫০ কেজি/হেক্টর',
    timing: 'রোপণের আগে',
    benefit: 'শিকড় ও ফুলের বিকাশ',
  },
  {
    name: 'এমওপি',
    amount: '১০০ কেজি/হেক্টর',
    timing: 'রোপণের আগে',
    benefit: 'রোগ প্রতিরোধ ক্ষমতা',
  },
];

export default function CultivationScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#FFFFFF" strokeWidth={2} />
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <Text style={styles.title}>চাষাবাদ পদ্ধতি</Text>
          <Text style={styles.subtitle}>
            ফুলকপি চাষের সম্পূর্ণ গাইড ও পদ্ধতি
          </Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.stepsSection}>
          <Text style={styles.sectionTitle}>চাষাবাদের ধাপসমূহ</Text>
          <Text style={styles.sectionSubtitle}>
            বীজ বপন থেকে ফসল সংগ্রহ পর্যন্ত সম্পূর্ণ প্রক্রিয়া:
          </Text>

          <View style={styles.stepsList}>
            {cultivationSteps.map((item, index) => (
              <View key={index} style={styles.stepCard}>
                <View style={[styles.stepNumber, { backgroundColor: item.bgColor }]}>
                  <Text style={[styles.stepNumberText, { color: item.color }]}>
                    {item.step}
                  </Text>
                </View>

                <View style={styles.stepContent}>
                  <View style={styles.stepHeader}>
                    <Text style={styles.stepTitle}>{item.title}</Text>
                    <View style={styles.durationBadge}>
                      <Calendar size={12} color="#6B7280" strokeWidth={2} />
                      <Text style={styles.durationText}>{item.duration}</Text>
                    </View>
                  </View>

                  <Text style={styles.stepDescription}>{item.description}</Text>

                  <View style={styles.stepDetails}>
                    {item.details.map((detail, idx) => (
                      <Text key={idx} style={styles.stepDetailText}>
                        • {detail}
                      </Text>
                    ))}
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>



      <View style={styles.videoSection}>
        <Text style={styles.sectionTitle}>ভিডিও টিউটোরিয়াল</Text>
        <Text style={styles.sectionSubtitle}>
          ফুলকপি চাষ সম্পর্কিত ভিডিও দেখুন:
        </Text>

        <TouchableOpacity 
          style={styles.videoCard}
          onPress={() => openYouTubeVideo('f5pIBUgeFWs')}
        >
          <View style={styles.videoHeader}>
            <Youtube size={24} color="#EF4444" strokeWidth={2} />
            <Text style={styles.videoTitle}>ফুলকপি চাষের সম্পূর্ণ পদ্ধতি</Text>
          </View>
          <Text style={styles.videoDescription}>
            বাংলায় সম্পূর্ণ গাইড - বীজ বপন থেকে ফসল সংগ্রহ পর্যন্ত
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.videoCard}
          onPress={() => openYouTubeVideo('G9tbjdQL35Q')}
        >
          <View style={styles.videoHeader}>
            <Youtube size={24} color="#EF4444" strokeWidth={2} />
            <Text style={styles.videoTitle}>সার প্রয়োগ পদ্ধতি</Text>
          </View>
          <Text style={styles.videoDescription}>
            সঠিক সময়ে সঠিক সার প্রয়োগের কৌশল
          </Text>
        </TouchableOpacity>
      </View>


        <View style={styles.fertilizersSection}>
          <Text style={styles.sectionTitle}>সার ব্যবস্থাপনা</Text>
          <Text style={styles.sectionSubtitle}>
            প্রতি হেক্টর জমিতে প্রয়োজনীয় সার:
          </Text>

          <View style={styles.fertilizersList}>
            {fertilizers.map((fertilizer, index) => (
              <View key={index} style={styles.fertilizerCard}>
                <View style={styles.fertilizerHeader}>
                  <Text style={styles.fertilizerName}>{fertilizer.name}</Text>
                  <Text style={styles.fertilizerAmount}>{fertilizer.amount}</Text>
                </View>
                
                <View style={styles.fertilizerDetails}>
                  <Text style={styles.fertilizerTiming}>
                    প্রয়োগের সময়: {fertilizer.timing}
                  </Text>
                  <Text style={styles.fertilizerBenefit}>
                    উপকারিতা: {fertilizer.benefit}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.monthlySection}>
          <Text style={styles.sectionTitle}>মাসিক কার্যক্রম</Text>
          <Text style={styles.sectionSubtitle}>
            প্রতি মাসে করণীয় কাজসমূহ:
          </Text>

          <View style={styles.monthlyList}>
            {monthlyTasks.map((month, index) => (
              <View key={index} style={styles.monthCard}>
                <View style={styles.monthHeader}>
                  <Calendar size={20} color="#22C55E" strokeWidth={2} />
                  <Text style={styles.monthName}>{month.month}</Text>
                </View>
                
                <View style={styles.tasksList}>
                  {month.tasks.map((task, idx) => (
                    <View key={idx} style={styles.taskItem}>
                      <View style={styles.taskDot} />
                      <Text style={styles.taskText}>{task}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>গুরুত্বপূর্ণ পরামর্শ</Text>
          
          <View style={styles.tipCard}>
            <View style={styles.tipHeader}>
              <Droplets size={20} color="#06B6D4" strokeWidth={2} />
              <Text style={styles.tipCategoryTitle}>সেচ ব্যবস্থাপনা</Text>
            </View>
            <Text style={styles.tipText}>
              • ফুল বাঁধার সময় বেশি পানির প্রয়োজন{'\n'}
              • গোড়ায় পানি জমতে দেবেন না{'\n'}
              • শুষ্ক মৌসুমে ৭-১০ দিন অন্তর সেচ দিন
            </Text>
          </View>

          <View style={styles.tipCard}>
            <View style={styles.tipHeader}>
              <Bug size={20} color="#EF4444" strokeWidth={2} />
              <Text style={styles.tipCategoryTitle}>রোগ-পোকা নিয়ন্ত্রণ</Text>
            </View>
            <Text style={styles.tipText}>
              • ক্লাব রুট রোগ প্রতিরোধে চুন ব্যবহার করুন{'\n'}
              • জাব পোকার জন্য সাবান পানি স্প্রে করুন{'\n'}
              • নিয়মিত ক্ষেত পরিদর্শন করুন
            </Text>
          </View>

          <View style={styles.tipCard}>
            <View style={styles.tipHeader}>
              <Sun size={20} color="#F59E0B" strokeWidth={2} />
              <Text style={styles.tipCategoryTitle}>আবহাওয়া সতর্কতা</Text>
            </View>
            <Text style={styles.tipText}>
              • অতিরিক্ত গরমে ছায়ার ব্যবস্থা করুন{'\n'}
              • শীতে হিমে পড়লে পলিথিন দিয়ে ঢেকে রাখুন{'\n'}
              • বৃষ্টির সময় নিকাশের ব্যবস্থা রাখুন
            </Text>
          </View>

          <View style={styles.tipCard}>
            <View style={styles.tipHeader}>
              <Scissors size={20} color="#8B5CF6" strokeWidth={2} />
              <Text style={styles.tipCategoryTitle}>সংগ্রহ ও সংরক্ষণ</Text>
            </View>
            <Text style={styles.tipText}>
              • ভোর ৬-৮ টার মধ্যে সংগ্রহ করা ভালো{'\n'}
              • ফুল শক্ত ও আটসাট হলেই কাটুন{'\n'}
              • কাটার পর ছায়ায় রাখুন{'\n'}
              • বরফ দিয়ে সংরক্ষণ করতে পারেন
            </Text>
          </View>
        </View>

        <View style={styles.problemSection}>
          <Text style={styles.problemTitle}>সাধারণ সমস্যা ও সমাধান</Text>
          
          <View style={styles.problemCard}>
            <Text style={styles.problemQuestion}>প্রশ্ন: ফুল ছোট হয়ে যাচ্ছে কেন?</Text>
            <Text style={styles.problemAnswer}>
              উত্তর: পুষ্টির অভাব, অতিরিক্ত গরম বা পানির অভাবে এমন হতে পারে। নিয়মিত সার ও পানি দিন।
            </Text>
          </View>

          <View style={styles.problemCard}>
            <Text style={styles.problemQuestion}>প্রশ্ন: পাতা হলুদ হয়ে যাচ্ছে?</Text>
            <Text style={styles.problemAnswer}>
              উত্তর: নাইট্রোজেনের অভাব বা মাটিতে পানি জমে থাকলে এমন হয়। ইউরিয়া সার দিন এবং পানি নিকাশের ব্যবস্থা করুন।
            </Text>
          </View>

          <View style={styles.problemCard}>
            <Text style={styles.problemQuestion}>প্রশ্ন: ফুল কালো দাগ পড়ছে?</Text>
            <Text style={styles.problemAnswer}>
              উত্তর: ছত্রাক আক্রমণের লক্ষণ। কপার সালফেট বা অনুমোদিত ছত্রাকনাশক স্প্রে করুন।
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            বিস্তারিত জানতে স্থানীয় কৃষি সম্প্রসারণ অধিদপ্তরে যোগাযোগ করুন
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: '#059669',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 20,
  },
  content: {
    flex: 1,
  },
  stepsSection: {
    padding: 24,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#111827',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
    lineHeight: 24,
  },
  stepsList: {
    gap: 20,
  },
  stepCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  stepNumberText: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
  },
  stepContent: {
    flex: 1,
  },
  stepHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#111827',
  },
  durationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  durationText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  stepDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 12,
    lineHeight: 24,
  },
  stepDetails: {
    gap: 4,
  },
  stepDetailText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  fertilizersSection: {
    padding: 24,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  fertilizersList: {
    gap: 12,
  },
  fertilizerCard: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
  },
  fertilizerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  fertilizerName: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#111827',
  },
  fertilizerAmount: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#059669',
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  fertilizerDetails: {
    gap: 4,
  },
  fertilizerTiming: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  fertilizerBenefit: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  monthlySection: {
    padding: 24,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  monthlyList: {
    gap: 16,
  },
  monthCard: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#22C55E',
  },
  monthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  monthName: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#111827',
    marginLeft: 8,
  },
  tasksList: {
    gap: 8,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#22C55E',
    marginRight: 12,
  },
  taskText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#374151',
  },
  tipsSection: {
    padding: 24,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  tipsTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#111827',
    marginBottom: 20,
  },
  tipCard: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipCategoryTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginLeft: 8,
  },
  tipText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  problemSection: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  problemTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 16,
  },
  problemCard: {
    backgroundColor: '#FEF3C7',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  problemQuestion: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#92400E',
    marginBottom: 8,
  },
  problemAnswer: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#92400E',
    lineHeight: 20,
  },
  footer: {
    paddingVertical: 24,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  footerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },

  // Add these styles to the StyleSheet
videoSection: {
  padding: 24,
  backgroundColor: '#FFFFFF',
  marginBottom: 16,
},
videoCard: {
  backgroundColor: '#F9FAFB',
  padding: 16,
  borderRadius: 12,
  marginBottom: 12,
},
videoHeader: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 8,
  gap: 8,
},
videoTitle: {
  fontFamily: 'Inter-Bold',
  fontSize: 16,
  color: '#111827',
},
videoDescription: {
  fontFamily: 'Inter-Regular',
  fontSize: 14,
  color: '#6B7280',
  lineHeight: 20,
},

});