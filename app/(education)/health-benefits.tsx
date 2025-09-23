import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  ArrowLeft,
  Heart,
  Shield,
  Brain,
  Eye,
  Bone,
  Activity,
  Zap,
  Star,
} from 'lucide-react-native';
import { router } from 'expo-router';

const healthBenefits = [
  {
    icon: Shield,
    title: 'ক্যান্সার প্রতিরোধ',
    subtitle: 'শক্তিশালী অ্যান্টিঅক্সিডেন্ট',
    description: 'গ্লুকোসাইনোলেট এবং সালফোরাফেন ক্যান্সার কোষের বৃদ্ধি রোধ করে এবং প্রাকৃতিক ডিটক্সিফিকেশন প্রক্রিয়া সাহায্য করে।',
    benefits: [
      'স্তন ক্যান্সার প্রতিরোধ',
      'কোলন ক্যান্সার থেকে সুরক্ষা',
      'ফুসফুসের ক্যান্সার প্রতিরোধ',
      'লিভার ক্যান্সারের ঝুঁকি কমায়',
    ],
    color: '#EF4444',
    bgColor: '#FEE2E2',
  },
  {
    icon: Heart,
    title: 'হৃদযন্ত্রের স্বাস্থ্য',
    subtitle: 'কার্ডিওভাসকুলার সুরক্ষা',
    description: 'পটাসিয়াম, ভিটামিন কে এবং ফাইবার হৃদযন্ত্রের স্বাস্থ্য ভালো রাখে এবং রক্তচাপ নিয়ন্ত্রণ করে।',
    benefits: [
      'রক্তচাপ কমায়',
      'কোলেস্টেরল নিয়ন্ত্রণ',
      'হার্ট অ্যাটাকের ঝুঁকি কমায়',
      'রক্ত সঞ্চালন উন্নত করে',
    ],
    color: '#F59E0B',
    bgColor: '#FEF3C7',
  },
  {
    icon: Brain,
    title: 'মস্তিষ্কের কার্যক্রম',
    subtitle: 'জ্ঞানীয় ক্ষমতা বৃদ্ধি',
    description: 'কোলিন এবং ভিটামিন কে মস্তিষ্কের কার্যকারিতা উন্নত করে এবং স্মৃতিশক্তি বাড়ায়।',
    benefits: [
      'স্মৃতিশক্তি বৃদ্ধি',
      'মনোযোগ বাড়ায়',
      'আলঝেইমার প্রতিরোধ',
      'নিউরোডেভেলপমেন্ট সাহায্য',
    ],
    color: '#8B5CF6',
    bgColor: '#EDE9FE',
  },
  {
    icon: Bone,
    title: 'হাড়ের মজবুতি',
    subtitle: 'ক্যালসিয়াম ও ভিটামিন কে',
    description: 'ভিটামিন কে এবং ক্যালসিয়াম হাড়ের ঘনত্ব বজায় রাখে এবং অস্টিওপরোসিস প্রতিরোধ করে।',
    benefits: [
      'হাড়ের ঘনত্ব বাড়ায়',
      'অস্টিওপরোসিস প্রতিরোধ',
      'ফ্র্যাকচারের ঝুঁকি কমায়',
      'জয়েন্টের স্বাস্থ্য রক্ষা',
    ],
    color: '#10B981',
    bgColor: '#D1FAE5',
  },
  {
    icon: Eye,
    title: 'চোখের যত্ন',
    subtitle: 'দৃষ্টিশক্তি সুরক্ষা',
    description: 'লুটেইন এবং জিক্সান্থিন চোখের রেটিনা রক্ষা করে এবং দৃষ্টিশক্তি ভালো রাখে।',
    benefits: [
      'ম্যাকুলার ডিজেনারেশন প্রতিরোধ',
      'ক্যাটার‍্যাক্টের ঝুঁকি কমায়',
      'রাতের দৃষ্টিশক্তি বাড়ায়',
      'চোখের ক্লান্তি দূর করে',
    ],
    color: '#06B6D4',
    bgColor: '#CFFAFE',
  },
  {
    icon: Activity,
    title: 'ওজন নিয়ন্ত্রণ',
    subtitle: 'স্বাস্থ্যকর ওজন বজায় রাখা',
    description: 'কম ক্যালরি এবং উচ্চ ফাইবার ওজন কমাতে সাহায্য করে এবং দীর্ঘক্ষণ পেট ভরা রাখে।',
    benefits: [
      'ক্যালরি কম (২৫/১০০গ্রাম)',
      'ফাইবার বেশি',
      'মেটাবলিজম বাড়ায়',
      'ক্ষুধা নিয়ন্ত্রণ',
    ],
    color: '#22C55E',
    bgColor: '#DCFCE7',
  },
];

const specificConditions = [
  {
    condition: 'ডায়াবেটিস',
    benefits: 'রক্তের গ্লুকোজ নিয়ন্ত্রণে রাখে এবং ইনসুলিন সেন্সিটিভিটি বাড়ায়।',
    recommendation: 'দিনে ১ কাপ রান্না করা ফুলকপি খেতে পারেন।',
    icon: Activity,
    color: '#10B981',
  },
  {
    condition: 'উচ্চ রক্তচাপ',
    benefits: 'পটাসিয়াম রক্তচাপ কমায় এবং সোডিয়ামের প্রভাব কমায়।',
    recommendation: 'লবণ ছাড়া রান্না করে খান।',
    icon: Heart,
    color: '#F59E0B',
  },
  {
    condition: 'কোষ্ঠকাঠিন্য',
    benefits: 'ফাইবার পাচনতন্ত্র ভালো রাখে এবং মলত্যাগ সহজ করে।',
    recommendation: 'প্রতিদিন কাঁচা বা হালকা সিদ্ধ খান।',
    icon: Zap,
    color: '#8B5CF6',
  },
  {
    condition: 'রোগ প্রতিরোধ ক্ষমতা কম',
    benefits: 'ভিটামিন সি রোগ প্রতিরোধ ক্ষমতা বাড়ায় এবং সংক্রমণ থেকে রক্ষা করে।',
    recommendation: 'কাঁচা সালাদ বা জুস করে খান।',
    icon: Shield,
    color: '#EF4444',
  },
];

const dailyRecommendations = [
  {
    group: 'শিশুদের জন্য (২-১২ বছর)',
    amount: '৫০-৭৫ গ্রাম',
    preparation: 'নরম করে সিদ্ধ করুন',
    benefits: 'বৃদ্ধি ও মানসিক বিকাশ',
    icon: Star,
  },
  {
    group: 'কিশোর-কিশোরী (১৩-১৮ বছর)',
    amount: '৭৫-১০০ গ্রাম',
    preparation: 'বিভিন্নভাবে রান্na করুন',
    benefits: 'হাড় ও মস্তিষ্কের বিকাশ',
    icon: Brain,
  },
  {
    group: 'প্রাপ্তবয়স্ক (১৯-৬০ বছর)',
    amount: '১০০-১৫০ গ্রাম',
    preparation: 'কাঁচা বা রান্na',
    benefits: 'রোগ প্রতিরোধ ও শক্তি',
    icon: Activity,
  },
  {
    group: 'বয়স্ক (৬০+ বছর)',
    amount: '৭৫-১০০ গ্রাম',
    preparation: 'সহজপাচ্য করে রান্na',
    benefits: 'হাড় ও হৃদযন্ত্রের যত্ন',
    icon: Bone,
  },
];

export default function HealthBenefitsScreen() {
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
          <Text style={styles.title}>স্বাস্থ্য উপকারিতা</Text>
          <Text style={styles.subtitle}>
            ফুলকপির অসাধারণ স্বাস্থ্য উপকারিতা সমূহ
          </Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.benefitsSection}>
          <Text style={styles.sectionTitle}>প্রধান স্বাস্থ্য উপকারিতা</Text>
          <Text style={styles.sectionSubtitle}>
            নিয়মিত ফুলকপি খেলে যে স্বাস্থ্য উপকারিতা পাবেন:
          </Text>

          <View style={styles.benefitsList}>
            {healthBenefits.map((benefit, index) => (
              <View key={index} style={[styles.benefitCard, { backgroundColor: benefit.bgColor }]}>
                <View style={styles.benefitHeader}>
                  <View style={[styles.benefitIcon, { backgroundColor: 'rgba(255, 255, 255, 0.8)' }]}>
                    <benefit.icon size={24} color={benefit.color} strokeWidth={2} />
                  </View>
                  
                  <View style={styles.benefitTitleContainer}>
                    <Text style={[styles.benefitTitle, { color: benefit.color }]}>
                      {benefit.title}
                    </Text>
                    <Text style={[styles.benefitSubtitle, { color: benefit.color }]}>
                      {benefit.subtitle}
                    </Text>
                  </View>
                </View>

                <Text style={[styles.benefitDescription, { color: benefit.color }]}>
                  {benefit.description}
                </Text>

                <View style={styles.benefitPointsList}>
                  {benefit.benefits.map((point, idx) => (
                    <View key={idx} style={styles.benefitPoint}>
                      <View style={[styles.bulletPoint, { backgroundColor: benefit.color }]} />
                      <Text style={[styles.benefitPointText, { color: benefit.color }]}>
                        {point}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.conditionsSection}>
          <Text style={styles.sectionTitle}>বিশেষ স্বাস্থ্য সমস্যায় উপকারিতা</Text>
          <Text style={styles.sectionSubtitle}>
            নির্দিষ্ট স্বাস্থ্য সমস্যায় ফুলকপি কীভাবে সাহায্য করে:
          </Text>

          <View style={styles.conditionsList}>
            {specificConditions.map((item, index) => (
              <View key={index} style={styles.conditionCard}>
                <View style={styles.conditionHeader}>
                  <item.icon size={24} color={item.color} strokeWidth={2} />
                  <Text style={styles.conditionTitle}>{item.condition}</Text>
                </View>
                
                <Text style={styles.conditionBenefits}>{item.benefits}</Text>
                
                <View style={styles.recommendationBox}>
                  <Text style={styles.recommendationLabel}>পরামর্শ:</Text>
                  <Text style={styles.recommendationText}>{item.recommendation}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.recommendationsSection}>
          <Text style={styles.sectionTitle}>দৈনিক সেবনের পরিমাণ</Text>
          <Text style={styles.sectionSubtitle}>
            বয়স অনুযায়ী দৈনিক কতটুকু ফুলকপি খাওয়া উচিত:
          </Text>

          <View style={styles.recommendationsList}>
            {dailyRecommendations.map((rec, index) => (
              <View key={index} style={styles.recommendationCard}>
                <View style={styles.recIcon}>
                  <rec.icon size={20} color="#22C55E" strokeWidth={2} />
                </View>
                
                <View style={styles.recContent}>
                  <Text style={styles.recGroup}>{rec.group}</Text>
                  <Text style={styles.recAmount}>পরিমাণ: {rec.amount}</Text>
                  <Text style={styles.recPreparation}>প্রস্তুতি: {rec.preparation}</Text>
                  <Text style={styles.recBenefits}>উপকারিতা: {rec.benefits}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.cautionSection}>
          <Text style={styles.cautionTitle}>সতর্কতা ও পার্শ্বপ্রতিক্রিয়া</Text>
          
          <View style={styles.cautionCard}>
            <Text style={styles.cautionSubtitle}>যাদের সাবধানতা প্রয়োজন:</Text>
            <Text style={styles.cautionText}>
              • থাইরয়েডের সমস্যা থাকলে পরিমিত খান{'\n'}
              • কিডনিতে পাথর থাকলে ডাক্তারের পরামর্শ নিন{'\n'}
              • অতিরিক্ত খেলে পেটে গ্যাস হতে পারে{'\n'}
              • রক্ত পাতলা করার ওষুধ খেলে সাবধান থাকুন
            </Text>
          </View>

          <View style={styles.cautionCard}>
            <Text style={styles.cautionSubtitle}>সঠিক সেবনের নিয়ম:</Text>
            <Text style={styles.cautionText}>
              • ভালোভাবে ধুয়ে পরিষ্কার করুন{'\n'}
              • অতিরিক্ত রান্না করবেন না{'\n'}
              • সতেজ এবং পরিচ্ছন্ন ফুলকপি খান{'\n'}
              • সংরক্ষিত ফুলকপি ২-৩ দিনের মধ্যে খান
            </Text>
          </View>
        </View>

        <View style={styles.researchSection}>
          <Text style={styles.researchTitle}>গবেষণার তথ্য</Text>
          
          <View style={styles.researchCard}>
            <Text style={styles.researchText}>
              বিশ্ব স্বাস্থ্য সংস্থা (WHO) এবং আমেরিকান ক্যান্সার সোসাইটি ক্রুসিফেরাস সবজি (যার মধ্যে ফুলকপি রয়েছে) নিয়মিত খাওয়ার পরামর্শ দেয়।
            </Text>
          </View>

          <View style={styles.researchCard}>
            <Text style={styles.researchText}>
              ২০১৯ সালের একটি গবেষণায় দেখা গেছে, সপ্তাহে ৩-৪ বার ফুলকপি খেলে হৃদরোগের ঝুঁকি ২৫% পর্যন্ত কমে যায়।
            </Text>
          </View>

          <View style={styles.researchCard}>
            <Text style={styles.researchText}>
              জার্নাল অব নিউট্রিশনে প্রকাশিত গবেষণা অনুযায়ী, ফুলকপিতে থাকা সালফোরাফেন ব্রেন ক্যান্সার প্রতিরোধে কার্যকর।
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            বিশেষ স্বাস্থ্য সমস্যার জন্য অবশ্যই চিকিৎসকের পরামর্শ নিন
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
    backgroundColor: '#DC2626',
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
  benefitsSection: {
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
  benefitsList: {
    gap: 20,
  },
  benefitCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  benefitHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  benefitIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  benefitTitleContainer: {
    flex: 1,
  },
  benefitTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    marginBottom: 4,
  },
  benefitSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    opacity: 0.8,
  },
  benefitDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
    opacity: 0.9,
  },
  benefitPointsList: {
    gap: 8,
  },
  benefitPoint: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 12,
  },
  benefitPointText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    flex: 1,
    opacity: 0.9,
  },
  conditionsSection: {
    padding: 24,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  conditionsList: {
    gap: 16,
  },
  conditionCard: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
  },
  conditionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  conditionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#111827',
    marginLeft: 12,
  },
  conditionBenefits: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 12,
  },
  recommendationBox: {
    backgroundColor: '#ECFDF5',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#10B981',
  },
  recommendationLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#065F46',
    marginBottom: 4,
  },
  recommendationText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#065F46',
  },
  recommendationsSection: {
    padding: 24,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  recommendationsList: {
    gap: 16,
  },
  recommendationCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
  },
  recIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#DCFCE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  recContent: {
    flex: 1,
  },
  recGroup: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 8,
  },
  recAmount: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#059669',
    marginBottom: 4,
  },
  recPreparation: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  recBenefits: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  cautionSection: {
    marginHorizontal: 24,
    marginBottom: 16,
  },
  cautionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 16,
  },
  cautionCard: {
    backgroundColor: '#FEF3C7',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  cautionSubtitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#92400E',
    marginBottom: 12,
  },
  cautionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#92400E',
    lineHeight: 20,
  },
  researchSection: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  researchTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 16,
  },
  researchCard: {
    backgroundColor: '#EBF8FF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  researchText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#1E40AF',
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
});