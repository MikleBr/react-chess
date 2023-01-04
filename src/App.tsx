import React, { useEffect, useState } from 'react';
import './App.css';
import { GameBoard } from './components/GameBoard/GameBoard';
import { Board } from './models/Board';
import { Colors } from './models/Colors';
import { Player } from './models/Player';

function App() {
  const [board, setBoard] = useState(new Board());
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  const restart = () => {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
    setCurrentPlayer(whitePlayer);
  };

  const swapPlayer = () => {
    if (currentPlayer?.color === Colors.WHITE) {
      return setCurrentPlayer(blackPlayer);
    }
    return setCurrentPlayer(whitePlayer);
  };

  useEffect(() => {
    restart();
  }, []);

  return (
    <div className="App">
      <p className="currentPlayer">Current player: {currentPlayer?.color}</p>
      <GameBoard
        board={board}
        setBoard={setBoard}
        swapPlayer={swapPlayer}
        currentPlayer={currentPlayer}
      />
    </div>
  );
}

export default App;
