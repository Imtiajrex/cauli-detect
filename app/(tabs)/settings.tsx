import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import {
  Info,
  CircleHelp as HelpCircle,
  Star,
  ExternalLink,
  Shield,
  Camera,
  Smartphone,
  BarChart3,
  CircleCheck as CheckCircle,
  Circle as XCircle,
  Server,
  Lock,
  Workflow,
} from 'lucide-react-native';
import { DetectionService } from '@/services/DetectionService';
import { useFocusEffect } from 'expo-router';

export default function SettingsScreen() {
  const [stats, setStats] = useState({
    total: 0,
    success: 0,
    failed: 0,
    successRate: 0,
  });

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  const loadStats = useCallback(async () => {
    try {
      const history = await DetectionService.getHistory();
      const total = history.length;
      const success = history.filter((h) => h.result?.isCauliflower).length;
      const failed = Math.max(total - success, 0);
      const successRate = total > 0 ? Math.round((success / total) * 100) : 0;
      setStats({ total, success, failed, successRate });
    } catch (e) {
      // noop
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadStats();
    }, [loadStats])
  );

  const SettingItem = ({
    icon,
    title,
    subtitle,
    onPress,
    showArrow = true,
  }: {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    showArrow?: boolean;
  }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingIcon}>{icon}</View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      {showArrow && <ExternalLink size={20} color="#9CA3AF" strokeWidth={2} />}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>App information and preferences</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Detection Stats</Text>
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, styles.cardElevated]}>
            <View style={[styles.statIcon, { backgroundColor: '#ECFDF5' }]}>
              <BarChart3 size={18} color="#10B981" strokeWidth={2} />
            </View>
            <Text style={styles.statValue}>{stats.total}</Text>
            <Text style={styles.statLabel}>Total Scans</Text>
          </View>

          <View style={[styles.statCard, styles.cardElevated]}>
            <View style={[styles.statIcon, { backgroundColor: '#F0FDF4' }]}>
              <CheckCircle size={18} color="#22C55E" strokeWidth={2} />
            </View>
            <Text style={[styles.statValue, { color: '#16A34A' }]}>
              {stats.success}
            </Text>
            <Text style={styles.statLabel}>Successful</Text>
          </View>

          <View style={[styles.statCard, styles.cardElevated]}>
            <View style={[styles.statIcon, { backgroundColor: '#FEF2F2' }]}>
              <XCircle size={18} color="#EF4444" strokeWidth={2} />
            </View>
            <Text style={[styles.statValue, { color: '#DC2626' }]}>
              {stats.failed}
            </Text>
            <Text style={styles.statLabel}>Failed</Text>
          </View>
        </View>

        <View style={styles.successRow}>
          <View style={styles.successPill}>
            <Text style={styles.successPillText}>
              Success rate {stats.successRate}%
            </Text>
          </View>
        </View>
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
        <Text style={styles.sectionTitle}>API</Text>
        <View style={styles.infoGrid}>
          <View style={styles.infoCard}>
            <Server size={24} color="#3B82F6" strokeWidth={2} />
            <Text style={styles.infoLabel}>Provider</Text>
            <Text style={styles.infoValue}>Google Cloud Vision</Text>
          </View>
          <View style={styles.infoCard}>
            <Workflow size={24} color="#8B5CF6" strokeWidth={2} />
            <Text style={styles.infoLabel}>Features</Text>
            <Text style={styles.infoValue}>
              Label Detection + Object Localization
            </Text>
          </View>
        </View>

        <SettingItem
          icon={<Lock size={20} color="#06B6D4" strokeWidth={2} />}
          title="Security"
          subtitle="Images are encoded as base64 and sent over HTTPS; only detection results are stored locally"
          showArrow={false}
        />

        <SettingItem
          icon={<ExternalLink size={20} color="#3B82F6" strokeWidth={2} />}
          title="API Docs"
          subtitle="Google Vision API: images:annotate endpoint"
          onPress={() => openLink('https://cloud.google.com/vision/docs')}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Usage</Text>

        <SettingItem
          icon={<Camera size={20} color="#10B981" strokeWidth={2} />}
          title="Capture or Pick"
          subtitle="Take a photo or choose from gallery to start a scan"
          showArrow={false}
        />
        <SettingItem
          icon={<Server size={20} color="#8B5CF6" strokeWidth={2} />}
          title="Analyze"
          subtitle="App converts the image to base64 and calls Vision API"
          showArrow={false}
        />
        <SettingItem
          icon={<Info size={20} color="#22C55E" strokeWidth={2} />}
          title="Decide"
          subtitle="Labels and objects are checked for cauliflower context to determine result and confidence"
          showArrow={false}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Made with ❤️ for vegetable enthusiasts
        </Text>
        <Text style={styles.versionText}>Cauliflower Detector v1.0.0</Text>
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
    gap: 10,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#374151',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: 'flex-start',
  },
  cardElevated: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    color: '#111827',
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  successRow: {
    marginTop: 12,
    flexDirection: 'row',
  },
  successPill: {
    backgroundColor: '#F0FDFA',
    borderColor: '#99F6E4',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  successPillText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#0D9488',
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
