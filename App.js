import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Platform } from 'react-native';
import { AuthProvider } from './context/AuthContext';
import Navigation from './context/Navigation';
import { LogBox } from 'react-native';
import * as SystemUI from 'expo-system-ui';
import * as Device from 'expo-device';
import Constants from 'expo-constants';

// Unterdrücken von Warnungen im Entwicklerumfeld
LogBox.ignoreLogs([
  'AsyncStorage has been extracted from react-native core',
  'expo-app-loading is deprecated'
]);

export default function App() {
  // Setup für diverse plattformspezifische Anpassungen
  useEffect(() => {
    // Status Bar Farbe für Android/iOS anpassen
    SystemUI.setBackgroundColorAsync('#2E7D32');
    
    // Datenverwendung nach Plattform optimieren
    const setupPerformance = async () => {
      if (Platform.OS === 'ios' || Platform.OS === 'android') {
        // Geräteinfo für Analytics oder Debugging
        const deviceInfo = await Device.getDeviceTypeAsync();
        console.log('Device type:', deviceInfo);
      }
    };
    
    setupPerformance();
  }, []);

  // Statusbar Style je nach Plattform anpassen
  const statusBarStyle = Platform.OS === 'ios' ? 'light' : 'auto';
  
  return (
    <AuthProvider>
      <View style={styles.container}>
        <Navigation />
        <StatusBar style={statusBarStyle} />
      </View>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
