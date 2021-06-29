import {Tile} from './Tile';
interface IStock {
  dealHand(): Tile[];
  dealTile(): Tile | undefined;
  shuffle(): void;
}

export class Stock implements IStock {
  private _tiles: Tile[] = [];
  public constructor() {}
  public get tiles(): ReadonlyArray<Tile> {
    return this.tiles;
  }
  public get length(): number {
    return this._tiles.length;
  }
  public dealHand(): Tile[] {
    const hand: Tile[] = [];
    for (let i = 0; i < 7; ++i) {
      const t = this.dealTile();
      if (t) {
        hand.push(t);
      }
    }
    return hand;
  }
  public dealTile(): Tile | undefined {
    return this._tiles.pop();
  }
  public shuffle(): void {
    for (let i = this._tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this._tiles[i], this._tiles[j]] = [this._tiles[j], this._tiles[i]];
    }
  }
  public initialize(highestPip?: number): void {
    let pip1Count = 0;
    let pip2Count = 0;
    if (!highestPip) highestPip = 6;
    for (pip1Count; pip1Count <= highestPip; pip1Count++) {
      pip2Count = pip1Count;
      for (pip2Count; pip2Count <= highestPip; pip2Count++) {
        const newTile = new Tile(pip1Count, pip2Count);
        this._tiles.push(newTile);
      }
    }
  }
}
