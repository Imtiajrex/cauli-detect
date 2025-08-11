import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { Platform } from 'react-native';

// Firebase web config (public by design for client apps)
const firebaseConfig = {
  apiKey: 'AIzaSyB1oRirpgVKoVi15RfeTxplqLiDcQ6WHwc',
  authDomain: 'caulispot.firebaseapp.com',
  projectId: 'caulispot',
  storageBucket: 'caulispot.firebasestorage.app',
  messagingSenderId: '551650335446',
  appId: '1:551650335446:web:7ad7676eac97abd273c777',
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(
  app,
  Platform.OS === 'web'
    ? {}
    : {
        persistence: getReactNativePersistence(AsyncStorage),
      }
);

export { app, auth };
