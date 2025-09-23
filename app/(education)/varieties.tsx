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
  Leaf,
  Calendar,
  Thermometer,
  Clock,
  MapPin,
} from 'lucide-react-native';
import { router } from 'expo-router';

const varieties = [
  {
    name: 'স্নোবল',
    season: 'শীতকাল',
    duration: '৫৫-৬০ দিন',
    temperature: '১৫-২০°সে',
    description: 'সাদা, মাঝারি আকারের, খুবই জনপ্রিয় জাত',
    features: ['দ্রুত বৃদ্ধি', 'ভালো উৎপাদন', 'বাজারে চাহিদা বেশি'],
    color: '#F3F4F6',
    textColor: '#374151',
  },
  {
    name: 'পুষা স্নোবল কে-১',
    season: 'শীতকাল',
    duration: '৬০-৬৫ দিন',
    temperature: '১৫-২০°সে',
    description: 'উন্নত জাত, বড় আকারের ফুলকপি',
    features: ['বড় ফুল', 'ভালো গুণমান', 'দীর্ঘ সংরক্ষণ'],
    color: '#ECFDF5',
    textColor: '#065F46',
  },
  {
    name: 'পুষা কার্তিক',
    season: 'কার্তিক মাস',
    duration: '৭০-৭৫ দিন',
    temperature: '১৮-২২°সে',
    description: 'দেরিতে রোপণযোগ্য, ভালো ফলন',
    features: ['দেরিতে রোপণ', 'রোগ প্রতিরোধী', 'উচ্চ ফলন'],
    color: '#FEF3C7',
    textColor: '#92400E',
  },
  {
    name: 'পাটনা আর্লি',
    season: 'শীত শুরু',
    duration: '৫০-৫৫ দিন',
    temperature: '১৬-২১°সে',
    description: 'তাড়াতাড়ি ফসল, ছোট থেকে মাঝারি আকার',
    features: ['তাড়াতাড়ি ফসল', 'কম সময়', 'ভালো স্বাদ'],
    color: '#FEE2E2',
    textColor: '#991B1B',
  },
  {
    name: 'দেশি সাদা',
    season: 'সারা শীত',
    duration: '৬৫-৭০ দিন',
    temperature: '১৪-১৯°সে',
    description: 'স্থানীয় জাত, খুবই সুস্বাদু',
    features: ['স্থানীয় জাত', 'সুস্বাদু', 'সহজ চাষ'],
    color: '#EDE9FE',
    textColor: '#6B21A8',
  },
  {
    name: 'হাইব্রিড এফ১',
    season: 'শীতকাল',
    duration: '৬০-৭০ দিন',
    temperature: '১৫-২০°সে',
    description: 'সংকর জাত, উচ্চ উৎপাদনশীল',
    features: ['উচ্চ ফলন', 'রোগ প্রতিরোধী', 'একরূপ আকার'],
    color: '#CFFAFE',
    textColor: '#0F766E',
  },
];

const seasonalGuide = [
  {
    season: 'আশ্বিন (সেপ্টেম্বর-অক্টোবর)',
    varieties: ['স্নোবল', 'পাটনা আর্লি'],
    temperature: '১৮-২৫°সে',
    tips: 'বীজ বপনের উপযুক্ত সময়, চারা তৈরি করুন',
  },
  {
    season: 'কার্তিক (অক্টোবর-নভেম্বর)',
    varieties: ['পুষা স্নোবল কে-১', 'পুষা কার্তিক'],
    temperature: '১৫-২২°সে',
    tips: 'চারা রোপণের সময়, মাটি তৈরি করুন',
  },
  {
    season: 'অগ্রহায়ণ (নভেম্বর-ডিসেম্বর)',
    varieties: ['দেশি সাদা', 'হাইব্রিড এফ১'],
    temperature: '১২-১৮°সে',
    tips: 'পরিচর্যা ও সার প্রয়োগের সময়',
  },
  {
    season: 'পৌষ-মাঘ (ডিসেম্বর-ফেব্রুয়ারি)',
    varieties: ['সব জাতের ফসল'],
    temperature: '১০-১৬°সে',
    tips: 'ফসল সংগ্রহের সময়',
  },
];

export default function VarietiesScreen() {
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
          <Text style={styles.title}>জাত ও প্রকারভেদ</Text>
          <Text style={styles.subtitle}>
            বাংলাদেশে চাষযোগ্য ফুলকপির বিভিন্ন জাত
          </Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.varietiesSection}>
          <Text style={styles.sectionTitle}>প্রধান জাতসমূহ</Text>
          <Text style={styles.sectionSubtitle}>
            বাংলাদেশের জলবায়ুতে চাষযোগ্য ফুলকপির জাত:
          </Text>

          <View style={styles.varietiesList}>
            {varieties.map((variety, index) => (
              <View key={index} style={[styles.varietyCard, { backgroundColor: variety.color }]}>
                <View style={styles.varietyHeader}>
                  <Text style={[styles.varietyName, { color: variety.textColor }]}>
                    {variety.name}
                  </Text>
                  <View style={styles.varietyBadge}>
                    <Leaf size={16} color={variety.textColor} strokeWidth={2} />
                  </View>
                </View>

                <Text style={[styles.varietyDescription, { color: variety.textColor }]}>
                  {variety.description}
                </Text>

                <View style={styles.varietyDetails}>
                  <View style={styles.detailRow}>
                    <Calendar size={16} color={variety.textColor} strokeWidth={2} />
                    <Text style={[styles.detailText, { color: variety.textColor }]}>
                      {variety.season}
                    </Text>
                  </View>
                  
                  <View style={styles.detailRow}>
                    <Clock size={16} color={variety.textColor} strokeWidth={2} />
                    <Text style={[styles.detailText, { color: variety.textColor }]}>
                      {variety.duration}
                    </Text>
                  </View>
                  
                  <View style={styles.detailRow}>
                    <Thermometer size={16} color={variety.textColor} strokeWidth={2} />
                    <Text style={[styles.detailText, { color: variety.textColor }]}>
                      {variety.temperature}
                    </Text>
                  </View>
                </View>

                <View style={styles.featuresList}>
                  {variety.features.map((feature, idx) => (
                    <View key={idx} style={[styles.featureTag, { borderColor: variety.textColor }]}>
                      <Text style={[styles.featureText, { color: variety.textColor }]}>
                        {feature}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.seasonalSection}>
          <Text style={styles.sectionTitle}>মৌসুমী গাইড</Text>
          <Text style={styles.sectionSubtitle}>
            কোন মৌসুমে কোন জাত চাষ করবেন:
          </Text>

          <View style={styles.seasonalList}>
            {seasonalGuide.map((guide, index) => (
              <View key={index} style={styles.seasonCard}>
                <View style={styles.seasonHeader}>
                  <MapPin size={20} color="#22C55E" strokeWidth={2} />
                  <Text style={styles.seasonName}>{guide.season}</Text>
                </View>

                <Text style={styles.seasonTemperature}>
                  তাপমাত্রা: {guide.temperature}
                </Text>

                <View style={styles.seasonVarieties}>
                  <Text style={styles.varietiesLabel}>উপযুক্ত জাত:</Text>
                  <Text style={styles.varietiesText}>
                    {guide.varieties.join(', ')}
                  </Text>
                </View>

                <View style={styles.seasonTips}>
                  <Text style={styles.tipsLabel}>পরামর্শ:</Text>
                  <Text style={styles.tipsText}>{guide.tips}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.selectionGuide}>
          <Text style={styles.guideTitle}>জাত নির্বাচনের নিয়ম</Text>
          <View style={styles.guideCard}>
            <Text style={styles.guideText}>
              ১. স্থানীয় জলবায়ু অনুযায়ী জাত নির্বাচন করুন{'\n'}
              ২. বাজারে চাহিদা বিবেচনা করুন{'\n'}
              ৩. রোগ প্রতিরোধী জাত বেছে নিন{'\n'}
              ৪. ফসলের সময় বিবেচনা করুন{'\n'}
              ৫. স্থানীয় কৃষি অফিসের পরামর্শ নিন
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            তথ্যসূত্র: বাংলাদেশ কৃষি গবেষণা ইনস্টিটিউট (BARI)
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
    backgroundColor: '#10B981',
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
  varietiesSection: {
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
  varietiesList: {
    gap: 16,
  },
  varietyCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  varietyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  varietyName: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
  },
  varietyBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  varietyDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  varietyDetails: {
    gap: 8,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  featuresList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  featureTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  featureText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
  seasonalSection: {
    padding: 24,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  seasonalList: {
    gap: 16,
  },
  seasonCard: {
    backgroundColor: '#F9FAFB',
    padding: 20,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#22C55E',
  },
  seasonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  seasonName: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#111827',
    marginLeft: 8,
  },
  seasonTemperature: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  seasonVarieties: {
    marginBottom: 12,
  },
  varietiesLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },
  varietiesText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  seasonTips: {},
  tipsLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },
  tipsText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  selectionGuide: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  guideTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 16,
  },
  guideCard: {
    backgroundColor: '#DBEAFE',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#93C5FD',
  },
  guideText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1E40AF',
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