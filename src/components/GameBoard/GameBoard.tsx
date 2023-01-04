import React, { useEffect, useState } from 'react';
import { Board } from '../../models/Board';
import { Cell } from '../../models/Cell';
import { Player } from '../../models/Player';
import { getChessCoordinates } from '../../utils/getChessCoordinates';
import { BoardCell } from './BoardCell';

import s from './GameBoard.module.css';

type Props = {
  board: Board;
  currentPlayer: Player | null;
  makeTurn: (turn: string) => void;
  setBoard: (board: Board) => void;
};

export const GameBoard = ({
  board,
  currentPlayer,
  makeTurn,
  setBoard,
}: Props) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  const clickCell = (cell: Cell) => {
    if (selectedCell && selectedCell.figure?.canMove(cell)) {
      makeTurn(
        selectedCell.figure.name[0] + getChessCoordinates(cell.x, cell.y)
      );
      selectedCell.moveFigure(cell);
      return setSelectedCell(null);
    }

    if (!cell.figure || cell.id === selectedCell?.id) {
      return setSelectedCell(null);
    }

    if (cell.figure.color !== currentPlayer?.color) {
      return;
    }

    return setSelectedCell(cell);
  };

  useEffect(() => {
    highlightCell();
  }, [selectedCell]);

  const highlightCell = () => {
    board.highlightCell(selectedCell);
    updateBoard();
  };

  const updateBoard = () => {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  };

  return (
    <div className={s.board}>
      {[...board.cells].reverse().map((row, i) => (
        <React.Fragment key={i}>
          {row.map(cell => (
            <BoardCell
              key={cell.id}
              onClick={() => clickCell(cell)}
              selected={selectedCell?.id === cell.id}
              cell={cell}
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};
