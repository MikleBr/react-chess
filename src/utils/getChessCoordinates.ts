const xCoordinateLetter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

export function getChessCoordinates(x: number, y: number) {
  return xCoordinateLetter[x] + (y + 1);
}
