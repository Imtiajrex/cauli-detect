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
  Zap,
  Shield,
  Eye,
  Brain,
  Bone,
} from 'lucide-react-native';
import { router } from 'expo-router';

const nutritionData = [
  {
    icon: Zap,
    color: '#F59E0B',
    bgColor: '#FEF3C7',
    title: 'ক্যালরি',
    value: '২৫',
    unit: 'প্রতি ১০০ গ্রামে',
    description: 'অত্যন্ত কম ক্যালরি সমৃদ্ধ',
  },
  {
    icon: Shield,
    color: '#22C55E',
    bgColor: '#DCFCE7',
    title: 'ভিটামিন সি',
    value: '৪৮ মি.গ্রা.',
    unit: 'প্রতি ১০০ গ্রামে',
    description: 'দৈনিক চাহিদার ৮০%',
  },
  {
    icon: Bone,
    color: '#8B5CF6',
    bgColor: '#EDE9FE',
    title: 'ভিটামিন কে',
    value: '১৫.৫ মাইক্রো.',
    unit: 'প্রতি ১০০ গ্রামে',
    description: 'হাড়ের স্বাস্থ্যের জন্য',
  },
  {
    icon: Brain,
    color: '#EF4444',
    bgColor: '#FEE2E2',
    title: 'ফোলেট',
    value: '৫৭ মাইক্রো.',
    unit: 'প্রতি ১০০ গ্রামে',
    description: 'মস্তিষ্কের কার্যক্রমে সহায়ক',
  },
];

const benefits = [
  {
    title: 'রোগ প্রতিরোধ ক্ষমতা বৃদ্ধি',
    description: 'উচ্চমাত্রার ভিটামিন সি রোগ প্রতিরোধ ক্ষমতা বাড়ায় এবং সংক্রমণ থেকে রক্ষা করে।',
    icon: Shield,
    color: '#10B981',
  },
  {
    title: 'ক্যান্সার প্রতিরোধ',
    description: 'অ্যান্টিঅক্সিডেন্ট এবং গ্লুকোসাইনোলেট ক্যান্সার কোষের বৃদ্ধি রোধ করে।',
    icon: Shield,
    color: '#EF4444',
  },
  {
    title: 'হৃদযন্ত্রের স্বাস্থ্য',
    description: 'ফাইবার এবং পটাসিয়াম রক্তচাপ নিয়ন্ত্রণে রাখে এবং হার্ট ভালো রাখে।',
    icon: Heart,
    color: '#F59E0B',
  },
  {
    title: 'ওজন নিয়ন্ত্রণ',
    description: 'কম কক্যালরি এবং উচ্চ ফাইবার ওজন কমাতে এবং নিয়ন্ত্রণে রাখতে সাহায্য করে।',
    icon: Zap,
    color: '#8B5CF6',
  },
  {
    title: 'পেটের স্বাস্থ্য',
    description: 'ফাইবার পাচনতন্ত্র ভালো রাখে এবং কোষ্ঠকাঠিন্য দূর করে।',
    icon: Brain,
    color: '#06B6D4',
  },
  {
    title: 'চোখের যত্ন',
    description: 'লুটেইন এবং জিক্সান্থিন চোখের স্বাস্থ্য রক্ষা করে এবং দৃষ্টিশক্তি বাড়ায়।',
    icon: Eye,
    color: '#22C55E',
  },
];

export default function NutritionScreen() {
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
          <Text style={styles.title}>পুষ্টিগুণ ও উপকারিতা</Text>
          <Text style={styles.subtitle}>
            ফুলকপির সম্পূর্ণ পুষ্টি তালিকা ও স্বাস্থ্য উপকারিতা
          </Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.nutritionSection}>
          <Text style={styles.sectionTitle}>পুষ্টি উপাদান</Text>
          <Text style={styles.sectionSubtitle}>
            প্রতি ১০০ গ্রাম কাঁচা ফুলকপিতে রয়েছে:
          </Text>

          <View style={styles.nutritionGrid}>
            {nutritionData.map((item, index) => (
              <View key={index} style={styles.nutritionCard}>
                <View style={[styles.nutritionIcon, { backgroundColor: item.bgColor }]}>
                  <item.icon size={24} color={item.color} strokeWidth={2} />
                </View>
                
                <Text style={styles.nutritionTitle}>{item.title}</Text>
                <Text style={styles.nutritionValue}>{item.value}</Text>
                <Text style={styles.nutritionUnit}>{item.unit}</Text>
                <Text style={styles.nutritionDescription}>{item.description}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.additionalNutrition}>
          <Text style={styles.additionalTitle}>অন্যান্য পুষ্টি উপাদান</Text>
          <View style={styles.nutritionList}>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionName}>কার্বোহাইড্রেট</Text>
              <Text style={styles.nutritionAmount}>৫ গ্রাম</Text>
            </View>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionName}>প্রোটিন</Text>
              <Text style={styles.nutritionAmount}>২ গ্রাম</Text>
            </View>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionName}>ফাইবার</Text>
              <Text style={styles.nutritionAmount}>২ গ্রাম</Text>
            </View>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionName}>পটাসিয়াম</Text>
              <Text style={styles.nutritionAmount}>২৯৯ মি.গ্রা.</Text>
            </View>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionName}>ফসফরাস</Text>
              <Text style={styles.nutritionAmount}>৪৪ মি.গ্রা.</Text>
            </View>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionName}>ম্যাগনেসিয়াম</Text>
              <Text style={styles.nutritionAmount}>১৫ মি.গ্রা.</Text>
            </View>
          </View>
        </View>

        <View style={styles.benefitsSection}>
          <Text style={styles.sectionTitle}>স্বাস্থ্য উপকারিতা</Text>
          <Text style={styles.sectionSubtitle}>
            নিয়মিত ফুলকপি খেলে যে স্বাস্থ্য উপকারিতা পাবেন:
          </Text>

          <View style={styles.benefitsList}>
            {benefits.map((benefit, index) => (
              <View key={index} style={styles.benefitCard}>
                <View style={styles.benefitIcon}>
                  <benefit.icon size={20} color={benefit.color} strokeWidth={2} />
                </View>
                
                <View style={styles.benefitContent}>
                  <Text style={styles.benefitTitle}>{benefit.title}</Text>
                  <Text style={styles.benefitDescription}>{benefit.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.tipSection}>
          <Text style={styles.tipTitle}>পুষ্টি সংরক্ষণের টিপস</Text>
          <View style={styles.tipCard}>
            <Text style={styles.tipText}>
              • হালকা সিদ্ধ করে খেলে সবচেয়ে বেশি পুষ্টি পাবেন{'\n'}
              • অতিরিক্ত রান্না করলে ভিটামিন সি নষ্ট হয়ে যায়{'\n'}
              • কাঁচা সালাদেও খাওয়া যায়{'\n'}
              • স্টিমিং পদ্ধতিতে রান্না করা সবচেয়ে ভালো
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            তথ্যসূত্র: বাংলাদেশ পুষ্টি ইনস্টিটিউট ও WHO
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
    backgroundColor: '#22C55E',
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
  nutritionSection: {
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
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  nutritionCard: {
    width: '47%',
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  nutritionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  nutritionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },
  nutritionValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 2,
  },
  nutritionUnit: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  nutritionDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 16,
  },
  additionalNutrition: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    marginBottom: 16,
    padding: 20,
    borderRadius: 16,
  },
  additionalTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 16,
  },
  nutritionList: {
    gap: 12,
  },
  nutritionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  nutritionName: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#374151',
  },
  nutritionAmount: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
  },
  benefitsSection: {
    padding: 24,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  benefitsList: {
    gap: 16,
  },
  benefitCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
  },
  benefitIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  benefitContent: {
    flex: 1,
  },
  benefitTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 4,
  },
  benefitDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  tipSection: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  tipTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 16,
  },
  tipCard: {
    backgroundColor: '#FEF3C7',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  tipText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#92400E',
    lineHeight: 24,
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