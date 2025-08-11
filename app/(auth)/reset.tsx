import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Link } from 'expo-router';
import { useAuth } from '@/providers/AuthProvider';

export default function ResetScreen() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const onReset = async () => {
    try {
      setLoading(true);
      await resetPassword(email.trim());
      Alert.alert(
        'Reset email sent',
        'Check your inbox for a password reset link.'
      );
    } catch (e: any) {
      Alert.alert('Reset failed', e?.message ?? 'Please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset password</Text>
      <Text style={styles.subtitle}>
        Enter your email to receive reset link
      </Text>

      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholderTextColor="#9CA3AF"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={onReset}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Sending...' : 'Send reset link'}
        </Text>
      </TouchableOpacity>

      <View style={styles.row}>
        <Link href="/(auth)/login" style={styles.link}>
          Back to login
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 24,
    backgroundColor: '#FFFFFF',
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
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    color: '#111827',
    fontFamily: 'Inter-Regular',
  },
  button: {
    backgroundColor: '#22C55E',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: { color: '#FFFFFF', fontFamily: 'Inter-SemiBold', fontSize: 16 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 12 },
  link: { color: '#22C55E', fontFamily: 'Inter-SemiBold' },
});
