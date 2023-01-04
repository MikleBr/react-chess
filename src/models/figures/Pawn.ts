import { Cell } from '../Cell';
import { Colors } from '../Colors';
import { BaseFigure, FigureNames } from './BaseFigure';
import { getFigureIcon } from '../../utils/getFigureIcon';

export class Pawn extends BaseFigure {
  isFirstStep: boolean = true;

  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.name = FigureNames.PAWN;
    this.icon = getFigureIcon(this.name, color);
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }
    const direction = this.color === Colors.WHITE ? 1 : -1;

    if (target.y === this.cell.y + direction) {
      if (target.x === this.cell.x && target.isEmpty()) {
        return true;
      }

      if (
        (target.x === this.cell.x - 1 || target.x === this.cell.x + 1) &&
        this.cell.isEnemy(target)
      ) {
        return true;
      }
    }

    if (this.isFirstStep && target.y === this.cell.y + direction * 2) {
      if (
        target.x === this.cell.x &&
        target.isEmpty() &&
        this.cell.board.getCell(target.x, target.y - direction).isEmpty()
      ) {
        return true;
      }
    }

    return false;
  }

  moveFigure(target: Cell): void {
    super.moveFigure(target);
    this.isFirstStep = false;
  }
}
