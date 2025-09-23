// pest-diseases.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {
  ArrowLeft,
  Bug,
  AlertTriangle,
  Shield,
  Youtube,
} from 'lucide-react-native';
import { router } from 'expo-router';

const pests = [
  {
    name: 'জাব পোকা',
    symptoms: 'পাতা কুঁচকে যাওয়া, হলুদ হয়ে যাওয়া',
    treatment: 'নিমের তেল বা সাবান পানি স্প্রে করুন',
    prevention: 'নিয়মিত পরিদর্শন, অতিরিক্ত সার এড়িয়ে চলুন',
    videoId: 'abc123', // Example YouTube video ID
  },
  {
    name: 'কাটুই পোকা',
    symptoms: 'পাতায় ছিদ্র, ফুলকপিতে দাগ',
    treatment: 'হ্যান্ড পিকিং, नিম बीज নির্যাস',
    prevention: 'ফেরোমন ফাঁদ ব্যবহার',
    videoId: 'def456',
  },
];

const diseases = [
  {
    name: 'কালো পচা রোগ',
    symptoms: 'ফুলকপিতে কালো দাগ, পচন',
    treatment: 'বর্দো মিশ্রণ স্প্রে',
    prevention: 'ফসল আবর্তন, ভালো নিষ্কাশন',
    videoId: 'ghi789',
  },
  {
    name: 'ডাউনি মিলডিউ',
    symptoms: 'পাতার নিচে সাদা পাউডার',
    treatment: 'কপার-ভিত্তিক ছত্রাকনাশক',
    prevention: 'গাছের মধ্যে পর্যাপ্ত ফাঁকা',
    videoId: 'jkl012',
  },
];

const openYouTubeVideo = (videoId: string) => {
  Linking.openURL(`https://www.youtube.com/watch?v=${videoId}`);
};

export default function PestDiseasesScreen() {
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
          <Text style={styles.title}>পোকামাকড় ও রোগবালাই</Text>
          <Text style={styles.subtitle}>
            ফুলকপির সাধারণ পোকামাকড় ও রোগ নিয়ন্ত্রণ
          </Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.pestsSection}>
          <Text style={styles.sectionTitle}>সাধারণ পোকামাকড়</Text>
          
          {pests.map((pest, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.cardHeader}>
                <Bug size={20} color="#EF4444" strokeWidth={2} />
                <Text style={styles.pestName}>{pest.name}</Text>
              </View>
              
              <View style={styles.detailItem}>
                <Text style={styles.label}>লক্ষণ:</Text>
                <Text style={styles.text}>{pest.symptoms}</Text>
              </View>
              
              <View style={styles.detailItem}>
                <Text style={styles.label}>চিকিৎসা:</Text>
                <Text style={styles.text}>{pest.treatment}</Text>
              </View>
              
              <View style={styles.detailItem}>
                <Text style={styles.label}>প্রতিরোধ:</Text>
                <Text style={styles.text}>{pest.prevention}</Text>
              </View>
              
              <TouchableOpacity 
                style={styles.videoButton}
                onPress={() => openYouTubeVideo(pest.videoId)}
              >
                <Youtube size={16} color="#FFFFFF" strokeWidth={2} />
                <Text style={styles.videoButtonText}>ভিডিও দেখুন</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.diseasesSection}>
          <Text style={styles.sectionTitle}>সাধারণ রোগ</Text>
          
          {diseases.map((disease, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.cardHeader}>
                <AlertTriangle size={20} color="#F59E0B" strokeWidth={2} />
                <Text style={styles.diseaseName}>{disease.name}</Text>
              </View>
              
              <View style={styles.detailItem}>
                <Text style={styles.label}>লক্ষণ:</Text>
                <Text style={styles.text}>{disease.symptoms}</Text>
              </View>
              
              <View style={styles.detailItem}>
                <Text style={styles.label}>চিকিৎসা:</Text>
                <Text style={styles.text}>{disease.treatment}</Text>
              </View>
              
              <View style={styles.detailItem}>
                <Text style={styles.label}>প্রতিরোধ:</Text>
                <Text style={styles.text}>{disease.prevention}</Text>
              </View>
              
              <TouchableOpacity 
                style={styles.videoButton}
                onPress={() => openYouTubeVideo(disease.videoId)}
              >
                <Youtube size={16} color="#FFFFFF" strokeWidth={2} />
                <Text style={styles.videoButtonText}>ভিডিও দেখুন</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.organicSection}>
          <Text style={styles.sectionTitle}>জৈব পদ্ধতিতে নিয়ন্ত্রণ</Text>
          
          <View style={styles.organicCard}>
            <Text style={styles.organicText}>
              • নিমের তেল: ৫ মিলি প্রতি লিটার পানিতে{'\n'}
              • গোবরের সার: রোগ প্রতিরোধ ক্ষমতা বাড়ায়{'\n'}
              • মরিচ-রসুন স্প্রে: পোকা তাড়াতে{'\n'}
              • ফেরোমন ফাঁদ: কাটুই পোকা নিয়ন্ত্রণে
            </Text>
            
            <TouchableOpacity 
              style={styles.videoButton}
              onPress={() => openYouTubeVideo('organic123')}
            >
              <Youtube size={16} color="#FFFFFF" strokeWidth={2} />
              <Text style={styles.videoButtonText}>জৈব চাষ ভিডিও</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            সমস্যা দেখা দিলে স্থানীয় কৃষি অফিসে যোগাযোগ করুন
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
    backgroundColor: '#7C2D12',
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
  pestsSection: {
    padding: 24,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  diseasesSection: {
    padding: 24,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#111827',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  pestName: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#111827',
    marginLeft: 8,
  },
  diseaseName: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#111827',
    marginLeft: 8,
  },
  detailItem: {
    marginBottom: 12,
  },
  label: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },
  text: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  videoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EF4444',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    gap: 8,
  },
  videoButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  organicSection: {
    padding: 24,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  organicCard: {
    backgroundColor: '#D1FAE5',
    padding: 16,
    borderRadius: 12,
  },
  organicText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#065F46',
    lineHeight: 20,
    marginBottom: 16,
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