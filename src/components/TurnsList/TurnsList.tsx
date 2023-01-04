import React from 'react';
import { Turn } from '../../App';
import { TurnElement } from './TurnElement';

import s from './TurnsList.module.css';

type Props = {
  turnsList: Turn[];
};

export const TurnsList = ({ turnsList }: Props) => {
  return (
    <div className={s.turnsList}>
      {turnsList.map(turn => {
        if (!turn.whiteTurn) return null;
        return <TurnElement turn={turn} />;
      })}
    </div>
  );
};
