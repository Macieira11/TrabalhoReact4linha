import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { startGame } from './GameScreen';

const HomeScreen = ({ navigation }) => {
  const [, setBoard] = useState([]); 
  const [, setPlayer] = useState('🔵');
  const [, setShowModal] = useState(false);

  const handleStartGame = () => {
    resetGame(); 
    setBoard(generateEmptyBoard()); 
    startGame(setBoard, setPlayer, setShowModal);
    navigation.navigate('Game'); 
  };

  const generateEmptyBoard = () => {
    return Array(6).fill(null).map(() => Array(7).fill(null));
  };

  const resetGame = () => {
    setBoard(generateEmptyBoard()); 
    setShowModal(false); 
  };

  return (
    <View style={styles.container}>
      <Text>4 em linha!</Text>
      <Text></Text>
      <Button title="Jogar" onPress={handleStartGame} color="pink" />
      <Text></Text>
      <Button title="Histórico" onPress={() => navigation.navigate('History')} color="pink" />
    </View>
  );
}; 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
  },

  board: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  cellText: {
    fontSize: 24,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default HomeScreen;