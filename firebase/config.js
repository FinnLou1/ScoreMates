import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase-Konfiguration
const firebaseConfig = {
    apiKey: "AIzaSyBhJ6e8_i5NeWDlpMQHjN3YtXYuxRlUk4g",
    authDomain: "scoremates-af12f.firebaseapp.com",
    projectId: "scoremates-af12f",
    storageBucket: "scoremates-af12f.firebasestorage.app",
    messagingSenderId: "21732806698",
    appId: "1:21732806698:web:0453344680a0b7fe2f3353",
    measurementId: "G-4WFL7J8Z76"
};

// Firebase initialisieren
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Auth mit AsyncStorage-Persistenz initialisieren
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);
