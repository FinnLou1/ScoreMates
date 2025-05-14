import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import { useAuth } from './AuthContext';

const Stack = createStackNavigator();

// Stack für nicht-authentifizierte Benutzer (Login/Register)
const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

// Stack für authentifizierte Benutzer (Home und andere Screens)
const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2E7D32',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'ScoreMates',
        }}
      />
      {/* Hier weitere Screens für authentifizierte Benutzer hinzufügen */}
    </Stack.Navigator>
  );
};

// Hauptnavigation, die zwischen Auth und App je nach Authentifizierungsstatus wechselt
const Navigation = () => {
  const { currentUser } = useAuth();

  // Plattformspezifische Konfiguration für die Navigation
  const navigationTheme = {
    colors: {
      // Anpassung der Farben je nach Plattform
      primary: '#2E7D32',
      background: Platform.OS === 'ios' ? '#F9F9F9' : '#F2F2F2',
      card: '#FFFFFF',
      text: '#000000',
      border: Platform.OS === 'ios' ? '#C8C8C8' : '#E0E0E0',
      notification: '#FF3B30',
    },
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navigationTheme}>
        {currentUser ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Navigation;
