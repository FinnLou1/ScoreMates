import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, ScrollView } from 'react-native';
import { auth, db } from '../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { AntDesign } from '@expo/vector-icons';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [handicap, setHandicap] = useState('');
  const [loading, setLoading] = useState(false);

  // Funktion zur Registrierung
  const handleRegister = async () => {
    if (email === '' || password === '' || confirmPassword === '' || displayName === '') {
      Alert.alert('Fehler', 'Bitte fülle alle Pflichtfelder aus.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Fehler', 'Passwörter stimmen nicht überein.');
      return;
    }

    try {
      setLoading(true);
      // Benutzer mit Firebase erstellen
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Benutzerdaten in Firestore speichern
      await setDoc(doc(db, 'users', user.uid), {
        email: email,
        displayName: displayName,
        handicap: handicap || 'Nicht angegeben',
        userId: user.uid,
        createdAt: new Date(),
      });

      setLoading(false);
      // Nach erfolgreicher Registrierung wird automatisch zu Home navigiert
    } catch (error) {
      setLoading(false);
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Fehler', 'Diese E-Mail-Adresse wird bereits verwendet.');
      } else if (error.code === 'auth/weak-password') {
        Alert.alert('Fehler', 'Das Passwort ist zu schwach. Bitte wähle ein stärkeres Passwort.');
      } else {
        Alert.alert('Fehler', error.message);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Registrieren</Text>
          <Text style={styles.headerSubtext}>Tritt der Golf-Community bei</Text>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <AntDesign name="user" size={20} color="#333" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={displayName}
              onChangeText={setDisplayName}
            />
          </View>

          <View style={styles.inputWrapper}>
            <AntDesign name="mail" size={20} color="#333" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="E-Mail"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputWrapper}>
            <AntDesign name="lock" size={20} color="#333" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Passwort"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <View style={styles.inputWrapper}>
            <AntDesign name="lock" size={20} color="#333" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Passwort bestätigen"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>

          <View style={styles.inputWrapper}>
            <AntDesign name="Trophy" size={20} color="#333" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Golf-Handicap (optional)"
              value={handicap}
              onChangeText={setHandicap}
              keyboardType="numeric"
            />
          </View>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
            disabled={loading}
          >
            <Text style={styles.registerButtonText}>
              {loading ? 'Registrierung läuft...' : 'Registrieren'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Bereits ein Konto?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginText}>Anmelden</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  headerSubtext: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  inputContainer: {
    width: '100%',
    maxWidth: 400,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  registerButton: {
    backgroundColor: '#2E7D32',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  footerText: {
    color: '#555',
    fontSize: 14,
  },
  loginText: {
    color: '#2E7D32',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default RegisterScreen;
