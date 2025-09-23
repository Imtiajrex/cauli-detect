import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  BookOpen,
  ArrowRight,
  Apple,
  Leaf,
  Droplets,
  Thermometer,
  Calendar,
  Heart,
  Shield,
  Brain,
} from 'lucide-react-native';
import { router } from 'expo-router';

export default function InformationScreen() {
  const navigateToEducation = (screen: string) => {
    router.push(`../(education)/${screen}`);
  };

  const EducationCard = ({
    icon,
    title,
    subtitle,
    screen,
  }: {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    screen: string;
  }) => (
    <TouchableOpacity
      style={styles.educationCard}
      onPress={() => navigateToEducation(screen)}
    >
      <View style={styles.cardIcon}>{icon}</View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardSubtitle}>{subtitle}</Text>
      </View>
      <ArrowRight size={20} color="#9CA3AF" strokeWidth={2} />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>শিক্ষামূলক বিষয়</Text>
        <Text style={styles.subtitle}>
          ফুলকপি সম্পর্কে বিস্তারিত জানুন
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>পুষ্টি ও স্বাস্থ্য</Text>
        
        <EducationCard
          icon={<Apple size={20} color="#10B981" strokeWidth={2} />}
          title="পুষ্টিগুণ"
          subtitle="ভিটামিন, খনিজ পদার্থ এবং ক্যালোরি সম্পর্কে বিস্তারিত"
          screen="nutrition"
        />

        <EducationCard
          icon={<Heart size={20} color="#EF4444" strokeWidth={2} />}
          title="স্বাস্থ্য উপকারিতা"
          subtitle="ক্যান্সার প্রতিরোধ, হৃদযন্ত্র এবং হজমের জন্য উপকারী"
          screen="health-benefits"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>চাষাবাদ</Text>
        
        <EducationCard
          icon={<Leaf size={20} color="#22C55E" strokeWidth={2} />}
          title="চাষ পদ্ধতি"
          subtitle="মাটি প্রস্তুতি, বীজ বপন এবং যত্নের নিয়ম"
          screen="cultivation"
        />

        <EducationCard
          icon={<Droplets size={20} color="#06B6D4" strokeWidth={2} />}
          title="সেচ ও উর্বরক"
          subtitle="জল দেওয়ার সময় এবং সার প্রয়োগের নির্দেশনা"
          screen="cultivation"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>প্রকারভেদ</Text>
        
        <EducationCard
          icon={<Thermometer size={20} color="#F59E0B" strokeWidth={2} />}
          title="প্রকারভেদ"
          subtitle="সাদা, সবুজ, বেগুনি এবং রোমানেসকো ফুলকপি"
          screen="varieties"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>রান্না ও সংরক্ষণ</Text>
        
        <EducationCard
          icon={<Calendar size={20} color="#8B5CF6" strokeWidth={2} />}
          title="রেসিপি"
          subtitle="বাঙালি, চাইনিজ এবং আন্তর্জাতিক রান্নার পদ্ধতি"
          screen="recipes"
        />

        <EducationCard
          icon={<Shield size={20} color="#3B82F6" strokeWidth={2} />}
          title="সংরক্ষণ"
          subtitle="ফ্রিজে রাখার নিয়ম এবং তাজা রাখার টিপস"
          screen="storage"
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          ফুলকপি সম্পর্কে আরও জানতে বিভিন্ন বিষয় অন্বেষণ করুন
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 32,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#374151',
    marginBottom: 16,
  },
  educationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0FDF4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 18,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  footerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 20,
  },
});