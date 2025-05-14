import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';

const HomeScreen = () => {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // Navigation zurück zum Login-Screen wird automatisch durch AuthStack/AuthContext gehandhabt
    } catch (error) {
      console.log('Fehler beim Ausloggen:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.welcomeBox}>
        <Text style={styles.welcomeTitle}>Willkommen bei ScoreMates!</Text>
        <Text style={styles.welcomeText}>
          Deine Golf-Community, um Scores zu verfolgen und mit Freunden zu spielen.
        </Text>
      </View>
      
      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>Neue Runde starten</Text>
          <Text style={styles.cardDescription}>Beginne eine neue Golfrunde und verfolge deinen Score.</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>Meine Statistiken</Text>
          <Text style={styles.cardDescription}>Sieh dir deine persönlichen Golfstatistiken und Fortschritte an.</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>Freunde finden</Text>
          <Text style={styles.cardDescription}>Finde und verbinde dich mit anderen Golfspielern.</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
        <Text style={styles.logoutButtonText}>Abmelden</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  welcomeBox: {
    backgroundColor: '#2E7D32',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 16,
    color: 'white',
  },
  cardContainer: {
    flex: 1,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
  },
  logoutButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default HomeScreen;
