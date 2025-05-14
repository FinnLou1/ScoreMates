// Platform-spezifische Styles für die ScoreMates App
import { Platform, Dimensions } from 'react-native';

// Die Breite und Höhe des Bildschirms abrufen
const { width, height } = Dimensions.get('window');
const isSmallDevice = width < 375;

// Gemeinsame Farben
export const colors = {
  primary: '#2E7D32', // Hauptfarbe (Golfgrün)
  secondary: '#81C784', // Hellgrün
  accent: '#FFA000', // Akzentfarbe (Golf-Gelb)
  background: '#F5F5F5',
  white: '#FFFFFF',
  black: '#000000',
  grey: '#9E9E9E',
  lightGrey: '#EEEEEE',
  error: '#D32F2F',
  success: '#388E3C',
};

// Gemeinsame Schriftgrößen
export const fontSizes = {
  small: isSmallDevice ? 12 : 14,
  medium: isSmallDevice ? 14 : 16,
  large: isSmallDevice ? 16 : 18,
  xlarge: isSmallDevice ? 20 : 22,
  xxlarge: isSmallDevice ? 24 : 28,
};

// Platform-spezifische Schatten
export const shadows = Platform.select({
  ios: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
    },
  },
  android: {
    small: {
      elevation: 2,
    },
    medium: {
      elevation: 4,
    },
    large: {
      elevation: 8,
    },
  },
});

// Platform-spezifische Rundungen
export const borderRadius = {
  small: 4,
  medium: 8,
  large: 12,
  xlarge: 20,
};

// Gemeinsame Abstandsgrößen
export const spacing = {
  xs: 4,
  small: 8,
  medium: 16,
  large: 24,
  xlarge: 32,
  xxlarge: 48,
};

// Platform-spezifische Systemabstände (z.B. für Safe Areas)
export const systemSpacing = Platform.select({
  ios: {
    top: 50, // Für iOS-Geräte mit Notch
    bottom: 34, // Für iOS-Geräte mit Home-Indikator
  },
  android: {
    top: 0,
    bottom: 0,
  },
  default: {
    top: 0,
    bottom: 0,
  },
});
