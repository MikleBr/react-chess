import { Cell } from '../Cell';
import { Colors } from '../Colors';
import { BaseFigure, FigureNames } from './BaseFigure';
import { getFigureIcon } from '../../utils/getFigureIcon';

export class Bishop extends BaseFigure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.name = FigureNames.BISHOP;
    this.icon = getFigureIcon(this.name, color);
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }
    if (this.cell.isEmptyDiagonal(target)) {
      return true;
    }
    return false;
  }
}
