import { Cell } from '../Cell';
import { Colors } from '../Colors';

export enum FigureNames {
  FIGURE = 'figure',
  KING = 'king',
  KNIGHT = 'knight',
  PAWN = 'pawn',
  QUEEN = 'queen',
  ROOK = 'rook', // ладья
  BISHOP = 'bishop', // слон
}

export class BaseFigure {
  id: number;
  color: Colors;
  icon: string | null;
  cell: Cell;
  name: FigureNames;

  constructor(color: Colors, cell: Cell) {
    this.color = color;
    this.cell = cell;
    this.cell.figure = this;
    this.icon = null;
    this.id = Math.random();
    this.name = FigureNames.FIGURE;
  }

  canMove(target: Cell): boolean {
    if (target.figure?.color === this.color) {
      return false;
    }
    if (target.figure?.name === FigureNames.KING) {
      return false;
    }
    return true;
  }

  moveFigure(target: Cell) {}
}
