import { Tile } from './Board';
interface IStock {
    dealHand(): Tile[];
    dealTile(): Tile | undefined;
    length(): number;
    get(): ReadonlyArray<Tile>;
    shuffle(): void;
}
export declare class Stock implements IStock {
    private tiles;
    constructor();
    dealHand(): Tile[];
    dealTile(): Tile | undefined;
    length(): number;
    get(): ReadonlyArray<Tile>;
    shuffle(): void;
    initialize(highestPip?: number): void;
}
export {};
