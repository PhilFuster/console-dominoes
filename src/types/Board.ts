export type Tile = {
  pip1: number;
  pip2: number;
};

export class Board {
  tiles: Tile[] = [];
  static fromNewBoard() {
    const board = new Board();
    return board;
  }
  validateMove(
    tile: Tile,
    side: BoardSide
  ): {error: boolean; message: string | undefined} {
    const returnArgs = {error: false, message: ''};
    // make sure the tile can be played on the board side selected
    // check for pip values
    return returnArgs;
  }
}

export enum BoardSide {
  Left = 'L',
  Right = 'R',
}
