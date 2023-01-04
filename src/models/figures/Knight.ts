import { getFigureIcon } from '../../utils/getFigureIcon';
import { Cell } from '../Cell';
import { Colors } from '../Colors';
import { BaseFigure, FigureNames } from './BaseFigure';

export class Knight extends BaseFigure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.name = FigureNames.KNIGHT;
    this.icon = getFigureIcon(this.name, color);
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }
    const xDistance = Math.abs(this.cell.x - target.x);
    const yDistance = Math.abs(this.cell.y - target.y);

    if (
      (xDistance === 2 && yDistance === 1) ||
      (xDistance === 1 && yDistance === 2)
    ) {
      return true;
    }
    return false;
  }
}
