export class Tile {
  constructor(private _pip1: number, private _pip2: number) {}
  public get pip1() {
    return this._pip1;
  }
  public get pip2() {
    return this._pip2;
  }
  isDouble() {
    return this.pip1 === this.pip2;
  }
  toString() {
    return `${this.pip1} - ${this.pip2}`;
  }
  // essentially the tile is the same..
  // just the orientation is different.
  // this is for display purposes and when
  // working state of the board.
  reverse() {
    [this._pip1, this._pip2] = [this._pip2, this._pip1];
  }
}
