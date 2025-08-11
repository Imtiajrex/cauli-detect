import React, { useEffect } from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/providers/AuthProvider';

export default function Index() {
  const { user, initializing } = useAuth();

  useEffect(() => {
    if (initializing) return;
    if (user) router.replace('/(tabs)');
    else router.replace('/(auth)/login');
  }, [user, initializing]);

  return <View style={{ flex: 1, backgroundColor: '#000' }} />;
}
