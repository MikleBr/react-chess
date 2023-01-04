import { Board } from './Board';
import { Colors } from './Colors';
import { BaseFigure } from './figures/BaseFigure';

export class Cell {
  readonly x: number;
  readonly y: number;
  readonly color: Colors;
  figure: BaseFigure | null;
  board: Board;
  available: boolean;
  id: number;

  constructor(
    board: Board,
    x: number,
    y: number,
    color: Colors,
    figure: BaseFigure | null
  ) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.figure = figure;
    this.board = board;
    this.available = false;
    this.id = Math.random();
  }

  setFigure(figure: BaseFigure) {
    this.figure = figure;
    this.figure.cell = this;
  }

  moveFigure(target: Cell) {
    if (this.figure && this.figure.canMove(target)) {
      this.figure.moveFigure(target);
      target.setFigure(this.figure);
      this.figure = null;
    }
  }

  isEmpty(): boolean {
    return this.figure === null;
  }

  isEnemy(target: Cell): boolean {
    if (target.figure) {
      return this.figure?.color !== target.figure.color;
    }
    return false;
  }

  isAttackedByEnemyFigure(): boolean {
    const cells = this.board.cells;
    for (let y = 0; y < cells.length; y++) {
      const row = cells[y];
      for (let x = 0; x < row.length; x++) {
        if (row[x].figure?.canMove(this)) {
          return true;
        }
      }
    }
    return false;
  }

  isEmptyVertical(target: Cell): boolean {
    if (this.x !== target.x) {
      return false;
    }

    const min = Math.min(this.y, target.y);
    const max = Math.max(this.y, target.y);

    for (let y = min + 1; y < max; y++) {
      if (!this.board.getCell(this.x, y).isEmpty()) {
        return false;
      }
    }
    return true;
  }

  isEmptyHorizontal(target: Cell): boolean {
    if (this.y !== target.y) {
      return false;
    }

    const min = Math.min(this.x, target.x);
    const max = Math.max(this.x, target.x);

    for (let x = min + 1; x < max; x++) {
      if (!this.board.getCell(x, this.y).isEmpty()) {
        return false;
      }
    }
    return true;
  }

  isEmptyDiagonal(target: Cell): boolean {
    const absX = Math.abs(target.x - this.x);
    const absY = Math.abs(target.y - this.y);
    if (absX !== absY) {
      return false;
    }

    const yDirection = this.y < target.y ? 1 : -1;
    const xDirection = this.x < target.x ? 1 : -1;

    for (let i = 1; i < absX; i++) {
      if (
        !this.board
          .getCell(this.x + xDirection * i, this.y + yDirection * i)
          .isEmpty()
      ) {
        return false;
      }
    }

    return true;
  }
}