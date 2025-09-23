// _layout.tsx
import React from 'react';
import { Stack } from 'expo-router';

export default function EducationLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="nutrition" />
      <Stack.Screen name="varieties" />
      <Stack.Screen name="cultivation" />
      <Stack.Screen name="health-benefits" />
      <Stack.Screen name="recipes" />
      <Stack.Screen name="storage" />
      <Stack.Screen name="pest-diseases" />
    </Stack>
  );
}