import React, { useEffect, useState } from 'react';
import './App.css';
import { GameBoard } from './components/GameBoard/GameBoard';
import { TurnsList } from './components/TurnsList/TurnsList';
import { Board } from './models/Board';
import { Colors } from './models/Colors';
import { Player } from './models/Player';

export type Turn = {
  number: number;
  whiteTurn: string;
  blackTurn: string;
};

function App() {
  const [board, setBoard] = useState(new Board());
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [turnsList, setTurnsList] = useState<Turn[]>([]);

  const restart = () => {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
    setCurrentPlayer(whitePlayer);
  };

  const makeTurn = (turn: string) => {
    if (turnsList.length === 0) {
      setTurnsList([
        {
          number: 1,
          whiteTurn: turn,
          blackTurn: '',
        },
      ]);
      return setCurrentPlayer(blackPlayer);
    }

    const currentTurn = turnsList[turnsList.length - 1];

    if (currentPlayer?.color === Colors.WHITE) {
      currentTurn.whiteTurn = turn;

      setCurrentPlayer(blackPlayer);
    } else {
      const newTurnsList = [...turnsList];
      newTurnsList[turnsList.length - 1].blackTurn = turn;
      newTurnsList.push({
        number: newTurnsList.length + 1,
        whiteTurn: '',
        blackTurn: '',
      });
      setTurnsList(newTurnsList);
      setCurrentPlayer(whitePlayer);
    }
  };

  useEffect(() => {
    restart();
  }, []);

  return (
    <div className="App">
      <p className="currentPlayer">
        {currentPlayer?.color === Colors.WHITE ? 'Ход белых' : 'Ход черных'}
      </p>
      <div className="desk">
        <GameBoard
          board={board}
          setBoard={setBoard}
          makeTurn={makeTurn}
          currentPlayer={currentPlayer}
        />
      </div>
      <TurnsList turnsList={turnsList} />
    </div>
  );
}

export default App;
