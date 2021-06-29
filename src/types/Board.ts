import {Tile} from './Tile';
export class Board {
  private tiles: Tile[] = [];
  static fromNewBoard() {
    const board = new Board();
    return board;
  }
  /**
   * Validate a players move (tile and a side) against the current state of the
   * board
   * @param tile - tile to play
   * @param side - side to play the tile on
   * @returns object - error: Error flag, message: if error contains message to display to user.
   */
  validateMove(
    tile: Tile,
    side: BoardSide
  ): {error: boolean; message: string | undefined} {
    const returnArgs = {error: false, message: ''};
    // tiles pip1 or pip2 must match
    // the correct side selected.
    let invalidMove = false;
    if (side === BoardSide.Left) {
      // validate tile against left side...
      if (
        tile.pip1 !== this.getLeftSide() &&
        tile.pip2 !== this.getLeftSide()
      ) {
        invalidMove = true;
        returnArgs.error = true;
        returnArgs.message = `tile ${tile} cannot be placed on the left side of the board.`;
        return returnArgs;
      }
    } else {
      // not left gotta be right.
      if (
        tile.pip1 !== this.getRightSide() &&
        tile.pip2 !== this.getRightSide()
      ) {
        invalidMove = true;
        returnArgs.error = true;
        returnArgs.message = `title ${tile} cannot be placed on the right side of the board.`;
      }
    }
    return returnArgs;
  }
  /**
   * Get the current state of the board.
   * @returns Readonly array of Tiles on the board.
   */
  get(): Readonly<Tile[]> {
    return [...this.tiles];
  }
  private getRightSide() {
    // right side of board..
    return this.tiles[this.tiles.length - 1].pip2;
  }

  private getLeftSide() {
    // left side of board..
    return this.tiles[0].pip1;
  }
}

export enum BoardSide {
  Left = 'L',
  Right = 'R',
}
