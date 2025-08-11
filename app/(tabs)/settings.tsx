import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import { Info, CircleHelp as HelpCircle, Star, ExternalLink, Shield, Camera, Smartphone } from 'lucide-react-native';

export default function SettingsScreen() {
  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  const SettingItem = ({ 
    icon, 
    title, 
    subtitle, 
    onPress, 
    showArrow = true 
  }: {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    showArrow?: boolean;
  }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingIcon}>
        {icon}
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      {showArrow && (
        <ExternalLink size={20} color="#9CA3AF" strokeWidth={2} />
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>App information and preferences</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        
        <SettingItem
          icon={<Info size={20} color="#22C55E" strokeWidth={2} />}
          title="About This App"
          subtitle="AI-powered cauliflower detection using computer vision"
          showArrow={false}
        />

        <SettingItem
          icon={<Camera size={20} color="#14B8A6" strokeWidth={2} />}
          title="How It Works"
          subtitle="Uses advanced image recognition to identify cauliflower"
          showArrow={false}
        />

        <SettingItem
          icon={<Shield size={20} color="#8B5CF6" strokeWidth={2} />}
          title="Privacy"
          subtitle="Photos are processed locally and not stored remotely"
          showArrow={false}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Information</Text>
        
        <View style={styles.infoGrid}>
          <View style={styles.infoCard}>
            <Smartphone size={24} color="#22C55E" strokeWidth={2} />
            <Text style={styles.infoLabel}>Version</Text>
            <Text style={styles.infoValue}>1.0.0</Text>
          </View>
          
          <View style={styles.infoCard}>
            <Camera size={24} color="#14B8A6" strokeWidth={2} />
            <Text style={styles.infoLabel}>Detection Engine</Text>
            <Text style={styles.infoValue}>AI-Powered</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        
        <SettingItem
          icon={<HelpCircle size={20} color="#F97316" strokeWidth={2} />}
          title="Help & FAQ"
          subtitle="Get answers to common questions"
          onPress={() => openLink('https://example.com/help')}
        />

        <SettingItem
          icon={<Star size={20} color="#EAB308" strokeWidth={2} />}
          title="Rate This App"
          subtitle="Help us improve by leaving a review"
          onPress={() => openLink('https://example.com/rate')}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Made with ❤️ for vegetable enthusiasts
        </Text>
        <Text style={styles.versionText}>
          Cauliflower Detector v1.0.0
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
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#374151',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 4,
  },
  settingSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  infoCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  infoLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
  },
  infoValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#374151',
    textAlign: 'center',
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
    marginBottom: 8,
  },
  versionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#D1D5DB',
    textAlign: 'center',
  },
});