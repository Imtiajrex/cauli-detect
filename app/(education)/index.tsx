import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  ArrowLeft,
  Leaf,
  Heart,
  ChefHat,
  Sprout,
  Package,
  BookOpen,
  Bug,
  TrendingUp,
  Star,
} from 'lucide-react-native';
import { router } from 'expo-router';

const educationTopics = [
  {
    id: 'nutrition',
    title: 'পুষ্টিগুণ ও উপকারিতা',
    subtitle: 'ফুলকপির পুষ্টিগুণ এবং স্বাস্থ্য উপকারিতা জানুন',
    icon: Heart,
    color: '#EF4444',
    bgColor: '#FEE2E2',
  },
  {
    id: 'varieties',
    title: 'জাত ও প্রকারভেদ',
    subtitle: 'বিভিন্ন ধরনের ফুলকপির জাত পরিচিতি',
    icon: Leaf,
    color: '#22C55E',
    bgColor: '#DCFCE7',
  },
  {
    id: 'cultivation',
    title: 'চাষাবাদ পদ্ধতি',
    subtitle: 'ফুলকপি চাষের সম্পূর্ণ গাইড',
    icon: Sprout,
    color: '#10B981',
    bgColor: '#D1FAE5',
  },
  {
    id: 'health-benefits',
    title: 'স্বাস্থ্য উপকারিতা',
    subtitle: 'ফুলকপির বিশেষ স্বাস্থ্য উপকারিতা',
    icon: Heart,
    color: '#F59E0B',
    bgColor: '#FEF3C7',
  },
  {
    id: 'recipes',
    title: 'রেসিপি ও রান্নার পদ্ধতি',
    subtitle: 'ফুলকপির সুস্বাদু রেসিপি সমূহ',
    icon: ChefHat,
    color: '#8B5CF6',
    bgColor: '#EDE9FE',
  },
  {
    id: 'storage',
    title: 'সংরক্ষণ ও রক্ষণাবেক্ষণ',
    subtitle: 'ফুলকপি সতেজ রাখার উপায়',
    icon: Package,
    color: '#06B6D4',
    bgColor: '#CFFAFE',
  },
  // Add these to the educationTopics array in index.tsx
{
  id: 'pest-diseases',
  title: 'পোকামাকড় ও রোগবালাই',
  subtitle: 'ফুলকপির রোগ ও পোকামাকড় নিয়ন্ত্রণ',
  icon: Bug,
  color: '#7C2D12',
  bgColor: '#FEE2E2',
},
{
  id: 'market-info',
  title: 'বাজার তথ্য ও দাম',
  subtitle: 'বাজারে ফুলকপির চাহিদা ও দাম',
  icon: TrendingUp,
  color: '#059669',
  bgColor: '#D1FAE5',
},
{
  id: 'success-stories',
  title: 'সফল চাষির গল্প',
  subtitle: 'ফুলকপি চাষে সফল চাষিদের অভিজ্ঞতা',
  icon: Star,
  color: '#F59E0B',
  bgColor: '#FEF3C7',
},
];

export default function EducationIndexScreen() {
  const navigateToTopic = (topicId: string) => {
    router.push(`/(education)/${topicId}` as any);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#111827" strokeWidth={2} />
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <Text style={styles.title}>ফুলকপি সম্পর্কে জানুন</Text>
          <Text style={styles.subtitle}>
            ফুলকপি সংক্রান্ত বিস্তারিত তথ্য ও শিক্ষামূলক কন্টেন্ট
          </Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <View style={styles.heroIcon}>
            <BookOpen size={32} color="#22C55E" strokeWidth={2} />
          </View>
          <Text style={styles.heroTitle}>সম্পূর্ণ গাইড</Text>
          <Text style={styles.heroText}>
            ফুলকপি সম্পর্কে সব ধরনের তথ্য এবং উপকারী পরামর্শ একসাথে পাবেন
          </Text>
        </View>

        <View style={styles.topicsGrid}>
          {educationTopics.map((topic) => (
            <TouchableOpacity
              key={topic.id}
              style={styles.topicCard}
              onPress={() => navigateToTopic(topic.id)}
              activeOpacity={0.7}
            >
              <View style={[styles.topicIcon, { backgroundColor: topic.bgColor }]}>
                <topic.icon size={24} color={topic.color} strokeWidth={2} />
              </View>
              
              <View style={styles.topicContent}>
                <Text style={styles.topicTitle}>{topic.title}</Text>
                <Text style={styles.topicSubtitle}>{topic.subtitle}</Text>
              </View>

              <View style={styles.arrow}>
                <Text style={styles.arrowText}>→</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>কেন ফুলকপি?</Text>
          <Text style={styles.infoText}>
            ফুলকপি একটি অত্যন্ত পুষ্টিকর সবজি যা আমাদের দৈনন্দিন খাদ্যতালিকায় গুরুত্বপূর্ণ ভূমিকা পালন করে। এটি ভিটামিন সি, ভিটামিন কে, ফাইবার এবং অ্যান্টিঅক্সিডেন্ট সমৃদ্ধ।
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            তথ্য সূত্র: বাংলাদেশ কৃষি গবেষণা ইনস্টিটিউট
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
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
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
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  content: {
    flex: 1,
  },
  heroSection: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
    backgroundColor: '#FFFFFF',
    marginBottom: 24,
  },
  heroIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#DCFCE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  heroTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#111827',
    marginBottom: 8,
  },
  heroText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 280,
  },
  topicsGrid: {
    paddingHorizontal: 24,
    gap: 16,
  },
  topicCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  topicIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  topicContent: {
    flex: 1,
  },
  topicTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 4,
  },
  topicSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  arrow: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: {
    fontSize: 18,
    color: '#9CA3AF',
  },
  infoSection: {
    marginTop: 32,
    paddingHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    borderRadius: 16,
  },
  infoTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 12,
  },
  infoText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
  footer: {
    paddingVertical: 32,
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