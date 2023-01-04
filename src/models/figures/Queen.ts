import { getFigureIcon } from '../../utils/getFigureIcon';
import { Cell } from '../Cell';
import { Colors } from '../Colors';
import { BaseFigure, FigureNames } from './BaseFigure';

export class Queen extends BaseFigure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.name = FigureNames.QUEEN;
    this.icon = getFigureIcon(this.name, color);
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }
    if (
      this.cell.isEmptyVertical(target) ||
      this.cell.isEmptyHorizontal(target) ||
      this.cell.isEmptyDiagonal(target)
    ) {
      return true;
    }

    return false;
  }
}
