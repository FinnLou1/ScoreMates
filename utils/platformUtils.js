// Diese Datei enthält plattformspezifische Hilfsfunktionen
import { Platform, Dimensions, NativeModules } from 'react-native';

/**
 * Prüft, ob die App auf iOS ausgeführt wird
 */
export const isIOS = Platform.OS === 'ios';

/**
 * Prüft, ob die App auf Android ausgeführt wird
 */
export const isAndroid = Platform.OS === 'android';

/**
 * Prüft, ob die App im Web ausgeführt wird
 */
export const isWeb = Platform.OS === 'web';

/**
 * Ermittelt die Ausrichtung des Geräts (Portrait/Landscape)
 */
export const getOrientation = () => {
  const { width, height } = Dimensions.get('window');
  return width < height ? 'portrait' : 'landscape';
};

/**
 * Gibt einen Wert basierend auf der Platform zurück (ähnlich zu Platform.select)
 * 
 * @param {Object} options - Ein Objekt mit den platform-spezifischen Optionen
 * @param {*} defaultValue - Der Standardwert, wenn keine passende Option gefunden wurde
 * @returns {*} Der platform-spezifische Wert
 */
export const getPlatformValue = (options, defaultValue) => {
  const platform = Platform.OS;
  if (platform in options) {
    return options[platform];
  }
  
  return defaultValue;
};

/**
 * Gibt Information über die Statusleiste zurück (Höhe usw.)
 */
export const getStatusBarHeight = () => {
  if (Platform.OS === 'android') {
    return 0; // Auf Android wird das automatisch gehandhabt
  }
  
  // Für iOS (basierend auf dem Gerätetyp)
  return Platform.OS === 'ios' ? 20 : 0;
};

/**
 * Prüft, ob das Gerät ein Tablet ist
 */
export const isTablet = () => {
  const { width, height } = Dimensions.get('window');
  const aspectRatio = width / height;
  
  // Tablets haben oft ein Seitenverhältnis zwischen 1:1 und 4:3
  if (Platform.OS === 'ios') {
    return Platform.isPad;
  }
  
  // Für Android und Web: Breite > 600dp oder Aspektverhältnis nahe 4:3
  return width >= 600 || (aspectRatio > 0.6 && aspectRatio < 0.85);
};
