import { Cell } from './Cell';
import { Colors } from './Colors';
import { Bishop } from './figures/Bishop';
import { King } from './figures/King';
import { Knight } from './figures/Knight';
import { Pawn } from './figures/Pawn';
import { Queen } from './figures/Queen';
import { Rook } from './figures/Rook';

export class Board {
  cells: Cell[][] = [];

  public initCells() {
    for (let y = 0; y < 8; y++) {
      const row: Cell[] = [];
      for (let x = 0; x < 8; x++) {
        const isWhite = (x + y) % 2 !== 0;
        row.push(
          new Cell(this, x, y, isWhite ? Colors.WHITE : Colors.BLACK, null)
        );
      }
      this.cells.push(row);
    }
  }

  public getCell(x: number, y: number) {
    return this.cells[y][x];
  }

  public changeDirection() {
    const cells = this.cells;
    for (let y = 0; y < 4; y++) {
      const row = cells[y];
      const mirrorRow = cells[7 - y];
      for (let x = 0; x < 8; x++) {
        const currentCell = row[x];
        row[x] = mirrorRow[x];
        mirrorRow[x] = currentCell;
      }
      cells[7 - y] = mirrorRow;
    }
    const newBoard = new Board();
    newBoard.cells = this.cells;
    return newBoard;
  }

  private addPawns() {
    for (let i = 0; i < 8; i++) {
      new Pawn(Colors.WHITE, this.getCell(i, 1));
      new Pawn(Colors.BLACK, this.getCell(i, 6));
    }
  }

  private addKings() {
    new King(Colors.WHITE, this.getCell(4, 0));
    new King(Colors.BLACK, this.getCell(4, 7));
  }

  private addKnights() {
    new Knight(Colors.WHITE, this.getCell(1, 0));
    new Knight(Colors.WHITE, this.getCell(6, 0));
    new Knight(Colors.BLACK, this.getCell(1, 7));
    new Knight(Colors.BLACK, this.getCell(6, 7));
  }

  private addQueens() {
    new Queen(Colors.WHITE, this.getCell(3, 0));
    new Queen(Colors.BLACK, this.getCell(3, 7));
  }

  private addBishops() {
    new Bishop(Colors.WHITE, this.getCell(2, 0));
    new Bishop(Colors.WHITE, this.getCell(5, 0));
    new Bishop(Colors.BLACK, this.getCell(2, 7));
    new Bishop(Colors.BLACK, this.getCell(5, 7));
  }

  private addRooks() {
    new Rook(Colors.WHITE, this.getCell(0, 0));
    new Rook(Colors.WHITE, this.getCell(7, 0));
    new Rook(Colors.BLACK, this.getCell(0, 7));
    new Rook(Colors.BLACK, this.getCell(7, 7));
  }

  public getCopyBoard(): Board {
    const newBoard = new Board();
    newBoard.cells = this.cells;
    return newBoard;
  }

  public highlightCell(selectedCell: Cell | null) {
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];
      for (let j = 0; j < row.length; j++) {
        const target = row[j];
        target.available = !!selectedCell?.figure?.canMove(target);
      }
    }
  }

  public addFigures() {
    this.addPawns();
    this.addKings();
    this.addKnights();
    this.addQueens();
    this.addBishops();
    this.addRooks();
  }
}
