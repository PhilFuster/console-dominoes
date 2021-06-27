import {Tile} from './Board';
interface IStock {
  dealHand(): Tile[];
  dealTile(): Tile | undefined;
  length(): number;
  get(): ReadonlyArray<Tile>;
  shuffle(): void;
}

export class Stock implements IStock {
  private tiles: Tile[] = [];
  public constructor() {}
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
    return this.tiles.pop();
  }
  public length(): number {
    return this.tiles.length;
  }
  public get(): ReadonlyArray<Tile> {
    return this.tiles;
  }
  public shuffle(): void {
    for (let i = this.tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.tiles[i], this.tiles[j]] = [this.tiles[j], this.tiles[i]];
    }
  }
  public initialize(highestPip?: number): void {
    let pip1Count = 0;
    let pip2Count = 0;
    if (!highestPip) highestPip = 6;
    for (pip1Count; pip1Count <= highestPip; pip1Count++) {
      pip2Count = pip1Count;
      for (pip2Count; pip2Count <= highestPip; pip2Count++) {
        const newTile = {pip1: pip1Count, pip2: pip2Count};
        this.tiles.push(newTile);
      }
    }
  }
}
