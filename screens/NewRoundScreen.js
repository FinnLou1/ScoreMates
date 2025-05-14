import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  Alert,
  ActivityIndicator
} from 'react-native';
import { auth, db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { AntDesign } from '@expo/vector-icons';

const NewRoundScreen = ({ navigation }) => {
  const [courseName, setCourseName] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [players, setPlayers] = useState([{ id: 1, name: '', score: '' }]);
  const [loading, setLoading] = useState(false);

  // Spieler hinzufügen
  const addPlayer = () => {
    const newPlayerId = players.length > 0 ? Math.max(...players.map(p => p.id)) + 1 : 1;
    setPlayers([...players, { id: newPlayerId, name: '', score: '' }]);
  };

  // Spieler entfernen
  const removePlayer = (id) => {
    if (players.length > 1) {
      setPlayers(players.filter(player => player.id !== id));
    }
  };

  // Spielername aktualisieren
  const updatePlayerName = (id, name) => {
    setPlayers(players.map(player => 
      player.id === id ? { ...player, name } : player
    ));
  };

  // Spielerscore aktualisieren
  const updatePlayerScore = (id, score) => {
    setPlayers(players.map(player => 
      player.id === id ? { ...player, score: score.replace(/[^0-9]/g, '') } : player
    ));
  };

  // Neue Runde speichern
  const saveRound = async () => {
    if (!courseName) {
      Alert.alert('Fehler', 'Bitte gib einen Platznamen ein.');
      return;
    }

    if (players.some(player => !player.name || !player.score)) {
      Alert.alert('Fehler', 'Bitte fülle alle Spielernamen und Scores aus.');
      return;
    }

    try {
      setLoading(true);
      const userId = auth.currentUser.uid;
      
      // Spieler strukturieren
      const formattedPlayers = players.reduce((acc, player) => {
        acc[player.name] = {
          score: parseInt(player.score, 10),
          isCreator: player.name === auth.currentUser.displayName
        };
        return acc;
      }, {});

      // Runde zur Datenbank hinzufügen
      await addDoc(collection(db, 'golfRounds'), {
        courseName,
        date,
        players: formattedPlayers,
        createdBy: userId,
        createdAt: serverTimestamp(),
      });

      setLoading(false);
      Alert.alert('Erfolg', 'Golfrunde erfolgreich gespeichert!');
      
      // Zurück zur Hauptseite navigieren
      navigation.navigate('Home');
    } catch (error) {
      setLoading(false);
      Alert.alert('Fehler', 'Beim Speichern ist ein Fehler aufgetreten: ' + error.message);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Neue Golfrunde</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Golfplatz</Text>
        <View style={styles.inputWrapper}>
          <AntDesign name="enviromento" size={20} color="#333" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Name des Golfplatzes"
            value={courseName}
            onChangeText={setCourseName}
          />
        </View>
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Datum</Text>
        <View style={styles.inputWrapper}>
          <AntDesign name="calendar" size={20} color="#333" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="JJJJ-MM-TT"
            value={date}
            onChangeText={setDate}
          />
        </View>
      </View>
      
      <Text style={styles.playersTitle}>Spieler</Text>
      
      {players.map((player) => (
        <View key={player.id} style={styles.playerContainer}>
          <View style={styles.playerNameContainer}>
            <View style={styles.inputWrapper}>
              <AntDesign name="user" size={20} color="#333" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Spielername"
                value={player.name}
                onChangeText={(name) => updatePlayerName(player.id, name)}
              />
            </View>
          </View>
          
          <View style={styles.playerScoreContainer}>
            <View style={styles.inputWrapper}>
              <AntDesign name="Trophy" size={20} color="#333" style={styles.inputIcon} />
              <TextInput
                style={styles.scoreInput}
                placeholder="Score"
                value={player.score}
                onChangeText={(score) => updatePlayerScore(player.id, score)}
                keyboardType="numeric"
              />
            </View>
          </View>
          
          {players.length > 1 && (
            <TouchableOpacity 
              style={styles.removeButton} 
              onPress={() => removePlayer(player.id)}
            >
              <AntDesign name="close" size={20} color="white" />
            </TouchableOpacity>
          )}
        </View>
      ))}
      
      <TouchableOpacity style={styles.addPlayerButton} onPress={addPlayer}>
        <AntDesign name="plus" size={20} color="white" />
        <Text style={styles.addPlayerButtonText}>Spieler hinzufügen</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.saveButton} 
        onPress={saveRound}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveButtonText}>Runde speichern</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
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
  playersTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  playerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  playerNameContainer: {
    flex: 3,
    marginRight: 10,
  },
  playerScoreContainer: {
    flex: 1,
  },
  scoreInput: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
  },
  removeButton: {
    backgroundColor: '#e74c3c',
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  addPlayerButton: {
    backgroundColor: '#3498db',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  addPlayerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  saveButton: {
    backgroundColor: '#2E7D32',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default NewRoundScreen;
