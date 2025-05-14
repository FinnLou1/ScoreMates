import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { Alert } from 'react-native';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      // Listener für Änderungen des Authentifizierungsstatus
      const unsubscribe = onAuthStateChanged(auth, 
        (user) => {
          setCurrentUser(user);
          setLoading(false);
        },
        (error) => {
          console.error("Auth state change error:", error);
          setLoading(false);
          Alert.alert(
            "Authentifizierungsfehler",
            "Es gab ein Problem mit der Firebase-Authentifizierung. Bitte versuche es erneut."
          );
        }
      );
      
      // Cleanup-Funktion zum Entfernen des Listeners
      return unsubscribe;
    } catch (error) {
      console.error("Auth setup error:", error);
      setLoading(false);
      return () => {};
    }
  }, []);

  const value = {
    currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
