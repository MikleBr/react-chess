import React from 'react';
import { Turn } from '../../App';

import s from './TurnElement.module.css';

type Props = {
  turn: Turn;
};

export const TurnElement = ({ turn }: Props) => {
  return (
    <div className={s.turn}>
      <div className={s.number}>{turn.number}</div>
      <div className={s.info}>{turn.whiteTurn}</div>
      <div className={s.info}>{turn.blackTurn}</div>
    </div>
  );
};
