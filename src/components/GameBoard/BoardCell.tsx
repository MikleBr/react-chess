import React from 'react';
import cn from 'classnames';
import { Cell } from '../../models/Cell';

import s from './BoardCell.module.css';

type Props = {
  cell: Cell;
  selected: boolean;
  onClick: () => void;
};

const xCoordinateLetter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

export const BoardCell = ({ cell, selected, onClick }: Props) => {
  const { color, figure, available } = cell;

  return (
    <div
      className={cn(s.cell, s[color], {
        [s.selected]: selected,
        [s.available]: available && figure,
      })}
      onClick={onClick}
    >
      {cell.x === 0 && <div className={s.coordinateY}>{cell.y + 1}</div>}
      {cell.y === 0 && (
        <div className={s.coordinateX}>{xCoordinateLetter[cell.x]}</div>
      )}

      {!figure && available && <div className={s.available}></div>}
      {figure && (
        <div className={cn(s.figure, s[figure.color])}>
          {figure.icon ? (
            <img src={figure.icon} alt={figure.name} />
          ) : (
            <p>{figure.name}</p>
          )}
        </div>
      )}
    </div>
  );
};
