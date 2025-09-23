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
  Package,
  Refrigerator,
  Thermometer,
  Clock,
  Eye,
  AlertCircle,
} from 'lucide-react-native';
import { router } from 'expo-router';

const storageTypes = [
  {
    type: 'ঘরের তাপমাত্রায়',
    temperature: '২০-২৫°সে',
    humidity: '৬০-৭০%',
    duration: '১-২ দিন',
    conditions: [
      'ছায়াযুক্ত ও শুষ্ক জায়গায় রাখুন',
      'বাতাস চলাচলের ব্যবস্থা রাখুন',
      'সরাসরি সূর্যের আলো এড়িয়ে চলুন',
      'প্লাস্টিকের ব্যাগে রাখবেন না',
    ],
    icon: Package,
    color: '#F59E0B',
    bgColor: '#FEF3C7',
  },
  {
    type: 'রেফ্রিজারেটরে',
    temperature: '০-৪°সে',
    humidity: '৯০-৯৫%',
    duration: '৫-৭ দিন',
    conditions: [
      'পলিথিন ব্যাগে ছিদ্র করে রাখুন',
      'সবজির ড্রয়ারে সংরক্ষণ করুন',
      'অন্য সবজি থেকে আলাদা রাখুন',
      'মাঝে মাঝে চেক করুন',
    ],
    icon: Refrigerator,
    color: '#06B6D4',
    bgColor: '#CFFAFE',
  },
  {
    type: 'ফ্রিজারে',
    temperature: '-১৮°সে বা কম',
    humidity: 'কম',
    duration: '৮-১২ মাস',
    conditions: [
      'ছোট টুকরা করে কেটে নিন',
      '২-৩ মিনিট ব্লাঞ্চ করুন',
      'বরফ পানিতে ঠান্ডা করুন',
      'এয়ার টাইট ব্যাগে রাখুন',
    ],
    icon: Package,
    color: '#8B5CF6',
    bgColor: '#EDE9FE',
  },
];

const qualityIndicators = [
  {
    condition: 'তাজা ও ভালো',
    signs: [
      'সাদা রঙের ফুল',
      'শক্ত ও আটসাট',
      'পাতা সবুজ ও তাজা',
      'কোনো দুর্গন্ধ নেই',
    ],
    color: '#22C55E',
    icon: '✅',
  },
  {
    condition: 'মাঝারি অবস্থা',
    signs: [
      'হালকা হলুদাভ রঙ',
      'কিছুটা নরম',
      'পাতা শুকিয়ে যাচ্ছে',
      'তাড়াতাড়ি ব্যবহার করুন',
    ],
    color: '#F59E0B',
    icon: '⚠️',
  },
  {
    condition: 'নষ্ট হয়ে গেছে',
    signs: [
      'কালো বা বাদামি দাগ',
      'অতিরিক্ত নরম',
      'দুর্গন্ধ বের হচ্ছে',
      'পচন শুরু হয়েছে',
    ],
    color: '#EF4444',
    icon: '❌',
  },
];

const preservationMethods = [
  {
    method: 'শুকিয়ে সংরক্ষণ',
    description: 'পাতলা টুকরা করে রোদে শুকিয়ে বায়ুরোধী পাত্রে রাখুন',
    duration: '৬-১২ মাস',
    uses: 'তরকারি, স্যুপে ব্যবহার',
    color: '#F59E0B',
  },
  {
    method: 'আচার তৈরি',
    description: 'লবণ, হলুদ ও তেল দিয়ে আচার তৈরি করুন',
    duration: '৩-৬ মাস',
    uses: 'খাবারের সাথে সাইড ডিশ',
    color: '#EF4444',
  },
  {
    method: 'ফ্রিজিং',
    description: 'ব্লাঞ্চ করে ফ্রিজারে সংরক্ষণ',
    duration: '৮-১২ মাস',
    uses: 'যেকোনো রান্নায় ব্যবহার',
    color: '#8B5CF6',
  },
  {
    method: 'ডিহাইড্রেশন',
    description: 'ডিহাইড্রেটর বা ওভেনে শুকিয়ে রাখুন',
    duration: '১-২ বছর',
    uses: 'পাউডার বা স্ন্যাকস',
    color: '#10B981',
  },
];

const commonMistakes = [
  {
    mistake: 'ধোয়ার পর ভেজা রাখা',
    solution: 'সংরক্ষণের আগে সম্পূর্ণ শুকিয়ে নিন',
    impact: 'তাড়াতাড়ি পচে যায়',
  },
  {
    mistake: 'প্লাস্টিক ব্যাগে আটকে রাখা',
    solution: 'বাতাস চলাচলের ব্যবস্থা রাখুন',
    impact: 'আর্দ্রতায় নষ্ট হয়',
  },
  {
    mistake: 'অন্য ফল-সবজির সাথে রাখা',
    solution: 'আলাদা করে সংরক্ষণ করুন',
    impact: 'ইথিলিনে তাড়াতাড়ি পাকে',
  },
  {
    mistake: 'তাপমাত্রার পরিবর্তন',
    solution: 'স্থির তাপমাত্রায় রাখুন',
    impact: 'গুণগত মান নষ্ট হয়',
  },
];

export default function StorageScreen() {
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
          <Text style={styles.title}>সংরক্ষণ ও রক্ষণাবেক্ষণ</Text>
          <Text style={styles.subtitle}>
            ফুলকপি সতেজ ও পুষ্টিকর রাখার কার্যকর উপায়
          </Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.storageSection}>
          <Text style={styles.sectionTitle}>সংরক্ষণ পদ্ধতি</Text>
          <Text style={styles.sectionSubtitle}>
            বিভিন্ন পরিবেশে ফুলকপি সংরক্ষণের নিয়ম:
          </Text>

          <View style={styles.storageList}>
            {storageTypes.map((storage, index) => (
              <View key={index} style={[styles.storageCard, { backgroundColor: storage.bgColor }]}>
                <View style={styles.storageHeader}>
                  <View style={[styles.storageIcon, { backgroundColor: 'rgba(255, 255, 255, 0.8)' }]}>
                    <storage.icon size={24} color={storage.color} strokeWidth={2} />
                  </View>
                  
                  <View style={styles.storageTitleContainer}>
                    <Text style={[styles.storageType, { color: storage.color }]}>
                      {storage.type}
                    </Text>
                    <Text style={[styles.storageDuration, { color: storage.color }]}>
                      স্থায়িত্ব: {storage.duration}
                    </Text>
                  </View>
                </View>

                <View style={styles.storageDetails}>
                  <View style={styles.tempHumidity}>
                    <View style={styles.detailItem}>
                      <Thermometer size={16} color={storage.color} strokeWidth={2} />
                      <Text style={[styles.detailText, { color: storage.color }]}>
                        {storage.temperature}
                      </Text>
                    </View>
                    
                    <View style={styles.detailItem}>
                      <Text style={[styles.detailLabel, { color: storage.color }]}>
                        আর্দ্রতা: {storage.humidity}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.conditionsList}>
                  <Text style={[styles.conditionsTitle, { color: storage.color }]}>
                    শর্তাবলী:
                  </Text>
                  {storage.conditions.map((condition, idx) => (
                    <View key={idx} style={styles.conditionItem}>
                      <View style={[styles.conditionBullet, { backgroundColor: storage.color }]} />
                      <Text style={[styles.conditionText, { color: storage.color }]}>
                        {condition}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.qualitySection}>
          <Text style={styles.sectionTitle}>গুণগত মান পরীক্ষা</Text>
          <Text style={styles.sectionSubtitle}>
            ফুলকপির অবস্থা বুঝার উপায়:
          </Text>

          <View style={styles.qualityList}>
            {qualityIndicators.map((quality, index) => (
              <View key={index} style={styles.qualityCard}>
                <View style={styles.qualityHeader}>
                  <Text style={styles.qualityEmoji}>{quality.icon}</Text>
                  <Text style={[styles.qualityCondition, { color: quality.color }]}>
                    {quality.condition}
                  </Text>
                </View>
                
                <View style={styles.signsList}>
                  {quality.signs.map((sign, idx) => (
                    <View key={idx} style={styles.signItem}>
                      <View style={[styles.signBullet, { backgroundColor: quality.color }]} />
                      <Text style={styles.signText}>{sign}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.preservationSection}>
          <Text style={styles.sectionTitle}>দীর্ঘমেয়াদি সংরক্ষণ</Text>
          <Text style={styles.sectionSubtitle}>
            বছরভর ফুলকপি সংরক্ষণের বিশেষ পদ্ধতি:
          </Text>

          <View style={styles.methodsList}>
            {preservationMethods.map((method, index) => (
              <View key={index} style={styles.methodCard}>
                <View style={styles.methodHeader}>
                  <Text style={styles.methodName}>{method.method}</Text>
                  <View style={[styles.durationBadge, { backgroundColor: method.color }]}>
                    <Clock size={12} color="#FFFFFF" strokeWidth={2} />
                    <Text style={styles.durationText}>{method.duration}</Text>
                  </View>
                </View>
                
                <Text style={styles.methodDescription}>{method.description}</Text>
                
                <View style={styles.usesContainer}>
                  <Text style={styles.usesLabel}>ব্যবহার:</Text>
                  <Text style={styles.usesText}>{method.uses}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.mistakesSection}>
          <Text style={styles.mistakesTitle}>সাধারণ ভুল ও সমাধান</Text>
          
          <View style={styles.mistakesList}>
            {commonMistakes.map((item, index) => (
              <View key={index} style={styles.mistakeCard}>
                <View style={styles.mistakeHeader}>
                  <AlertCircle size={20} color="#EF4444" strokeWidth={2} />
                  <Text style={styles.mistakeTitle}>ভুল:</Text>
                  <Text style={styles.mistakeText}>{item.mistake}</Text>
                </View>
                
                <View style={styles.solutionContainer}>
                  <Text style={styles.solutionLabel}>সমাধান:</Text>
                  <Text style={styles.solutionText}>{item.solution}</Text>
                </View>
                
                <View style={styles.impactContainer}>
                  <Text style={styles.impactLabel}>প্রভাব:</Text>
                  <Text style={styles.impactText}>{item.impact}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>বিশেষ টিপস</Text>
          
          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>ক্রয়ের সময়:</Text>
            <Text style={styles.tipText}>
              • শক্ত ও সাদা ফুল নির্বাচন করুন{'\n'}
              • পাতা তাজা ও সবুজ হতে হবে{'\n'}
              • কোনো দাগ বা গর্ত থাকবে না{'\n'}
              • উপযুক্ত আকারের বেছে নিন
            </Text>
          </View>

          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>পরিবহনের সময়:</Text>
            <Text style={styles.tipText}>
              • নরম কাগজে মুড়ে নিন{'\n'}
              • চাপ লাগতে দেবেন না{'\n'}
              • তাড়াতাড়ি ঘরে পৌঁছান{'\n'}
              • রোদে রাখবেন না
            </Text>
          </View>

          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>ব্যবহারের আগে:</Text>
            <Text style={styles.tipText}>
              • ভালোভাবে পরীক্ষা করুন{'\n'}
              • পচা অংশ কেটে ফেলুন{'\n'}
              • ঠান্ডা পানিতে ধুয়ে নিন{'\n'}
              • প্রয়োজন অনুযায়ী কেটে নিন
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            সঠিক সংরক্ষণে ফুলকপির পুষ্টি ও স্বাদ দীর্ঘদিন বজায় থাকে
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
    backgroundColor: '#0F766E',
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
  storageSection: {
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
  storageList: {
    gap: 20,
  },
  storageCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  storageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  storageIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  storageTitleContainer: {
    flex: 1,
  },
  storageType: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    marginBottom: 4,
  },
  storageDuration: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    opacity: 0.8,
  },
  storageDetails: {
    marginBottom: 16,
  },
  tempHumidity: {
    flexDirection: 'row',
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  detailLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  conditionsList: {
    gap: 8,
  },
  conditionsTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: 8,
  },
  conditionItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  conditionBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 12,
  },
  conditionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
  qualitySection: {
    padding: 24,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  qualityList: {
    gap: 16,
  },
  qualityCard: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
  },
  qualityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  qualityEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  qualityCondition: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
  signsList: {
    gap: 6,
  },
  signItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 12,
  },
  signText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  preservationSection: {
    padding: 24,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  methodsList: {
    gap: 16,
  },
  methodCard: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#06B6D4',
  },
  methodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  methodName: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#111827',
  },
  durationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  durationText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#FFFFFF',
  },
  methodDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
    lineHeight: 20,
  },
  usesContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  usesLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#374151',
  },
  usesText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
  },
  mistakesSection: {
    marginHorizontal: 24,
    marginBottom: 16,
  },
  mistakesTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 16,
  },
  mistakesList: {
    gap: 16,
  },
  mistakeCard: {
    backgroundColor: '#FEF2F2',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
  },
  mistakeHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 8,
  },
  mistakeTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#991B1B',
  },
  mistakeText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#991B1B',
    flex: 1,
  },
  solutionContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    gap: 8,
  },
  solutionLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#059669',
  },
  solutionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#059669',
    flex: 1,
  },
  impactContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  impactLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#B91C1C',
  },
  impactText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#B91C1C',
    flex: 1,
  },
  tipsSection: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  tipsTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 16,
  },
  tipCard: {
    backgroundColor: '#EBF8FF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  tipTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1E40AF',
    marginBottom: 12,
  },
  tipText: {
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