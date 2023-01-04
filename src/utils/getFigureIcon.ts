import { Colors } from '../models/Colors';
import { FigureNames } from '../models/figures/BaseFigure';

import wK from './../assets/images/figures/merida/wK.svg';
import bK from './../assets/images/figures/merida/bK.svg';
import wP from './../assets/images/figures/merida/wP.svg';
import bP from './../assets/images/figures/merida/bP.svg';
import wR from './../assets/images/figures/merida/wR.svg';
import bR from './../assets/images/figures/merida/bR.svg';
import wQ from './../assets/images/figures/merida/wQ.svg';
import bQ from './../assets/images/figures/merida/bQ.svg';
import wN from './../assets/images/figures/merida/wN.svg';
import bN from './../assets/images/figures/merida/bN.svg';
import wB from './../assets/images/figures/merida/wB.svg';
import bB from './../assets/images/figures/merida/bB.svg';

const lightFigures: Record<FigureNames, string> = {
  figure: '',
  king: wK,
  bishop: wB,
  knight: wN,
  pawn: wP,
  queen: wQ,
  rook: wR,
};

const darkFigures: Record<FigureNames, string> = {
  figure: '',
  king: bK,
  bishop: bB,
  knight: bN,
  pawn: bP,
  queen: bQ,
  rook: bR,
};

export function getFigureIcon(figureName: FigureNames, color: Colors): string {
  if (color === Colors.WHITE) {
    return lightFigures[figureName];
  }
  return darkFigures[figureName];
}
