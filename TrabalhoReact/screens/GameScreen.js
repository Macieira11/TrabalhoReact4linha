import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { GameContext } from './GameContext';


const INITIAL_BOARD = Array(6).fill(null).map(() => Array(7).fill(null));

export const startGame = (setBoard, setPlayer, setShowModal) => {
  setBoard(INITIAL_BOARD);
  setPlayer('🔵');
  setShowModal(false);
};

const GameScreen = ({ navigation }) => {
  const { history, setHistory } = useContext(GameContext);
  const [board, setBoard] = useState(INITIAL_BOARD);
  const [player, setPlayer] = useState('🔵');
  const [showModal, setShowModal] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  


  useEffect(() => {
    resetGame(); 
  }, []); 
  
  const makeMove = (col) => {
    const row = findAvailableRow(col);
    if (row === -1 || !board) return;
    const newBoard = [...board];
    newBoard[row][col] = player;
    setBoard(newBoard);

    let newResultMessage = '';

    if (checkWinner(row, col)) {
      newResultMessage = `${player} ganhou!`;
    } else if (checkDraw()) {
      newResultMessage = 'Empate!';
    }

    if (newResultMessage) {
      setResultMessage(newResultMessage);
      setShowModal(true);
      setHistory([...history, newResultMessage]);
    } else {
      setPlayer(player === '🔵' ? '🔴' : '🔵');
    }
  };

  const generateEmptyBoard = () => {
    return Array(6).fill(null).map(() => Array(7).fill(null));
  };
  
  const resetGame = () => {
    const row = 0; 
    const col = 0; 

    if (checkWinner(row, col) || checkDraw()) {
      const result = checkWinner(row, col) ? `${player} Ganhou!` : 'Empate!';
      setHistory([...history, result]);
    }

    setBoard(generateEmptyBoard());
    togglePlayer();
    setShowModal(false);
  };

  const togglePlayer = () => {
    setPlayer((prevPlayer) => (prevPlayer === '🔵' ? '🔴' : '🔵'));
  };

  const findAvailableRow = (col) => {
    for (let row = 5; row >= 0; row--) {
      if (board[row][col] === null) {
        return row;
      }
    }
    return -1;
  };

  const checkWinner = (row, col) => {
    const directions = [
      [1, 0],
      [0, 1], 
      [0, -1],
      [1, 1], 
      [-1, 1], 
      [1, -1], 
    ];
  
    const currentPlayer = board[row][col];
  
    if (currentPlayer) {
      for (const [dx, dy] of directions) {
        let count = 1;
  
        for (let i = 1; i <= 3; i++) {
          const newRow = row + i * dx;
          const newCol = col + i * dy;
  
          if (
            newRow >= 0 &&
            newRow < 6 &&
            newCol >= 0 &&
            newCol < 7 &&
            board[newRow][newCol] === currentPlayer
          ) {
            count++;
          } else {
            break; 
          }
        }
  
        if (count >= 4) {
          return true; 
        }
      }
    }
  
    return false; 
  };
  
  

  const checkDraw = () => {
    
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 7; col++) {
        if (!board[row][col]) {
          return false; 
        }
      }
    }
  
    return true;
  };
  
  

  const renderCell = (cellValue, row, col) => {
    return (
      <TouchableOpacity
        key={`${row}-${col}`}
        style={styles.cell}
        onPress={() => makeMove(col)}
        disabled={cellValue !== null}
        testID={`cell-${col}`}
      >
        <Text style={styles.cellText}>{cellValue}</Text>
      </TouchableOpacity>
    );
  };

  const renderBoard = () => {
    return (
      <View style={styles.board} testID="board">
        {board.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cellValue, colIndex) =>
              renderCell(cellValue, rowIndex, colIndex)
            )}
          </View>
        ))}
      </View>
    );
  };

  return (
    <View>
       <Text></Text>
       <Text></Text>
       <Text></Text>
       <Text></Text>
       <Text></Text>
    
      {renderBoard()}
      <Text></Text>
      <Text></Text>
      <Button title="Voltar ao menu principal" onPress={() => navigation.goBack()} color="pink" />
      <Text></Text>

      <Button title="Historico" onPress={() => navigation.navigate('History')} color="pink"/>
      <Modal isVisible={showModal}>
        <View style={styles.modalContent}>
          <Text>{resultMessage}</Text>
          <Button title="Reiniciar" onPress={resetGame} color="pink"/>
        </View>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center', 
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
    borderColor: 'pink ',
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

export default GameScreen;