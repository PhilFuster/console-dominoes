import { Board } from './Board';
import { Player } from './Player';
declare type GameOptions = {
    maxPlayers: number;
    numPlayers: number;
    highestPip: number;
};
interface IGame {
    start(): void;
    createPlayers(numPlayers: number): void;
    displayIntroduction(): void;
}
export declare class Game implements IGame {
    players: Player[];
    options: GameOptions;
    board: Board;
    private stock;
    private tiles;
    constructor(players: Player[], options: GameOptions, board: Board);
    static fromNewGame(): Game;
    displayIntroduction(): void;
    start(): Promise<void>;
    play(): Promise<void>;
    getNextPlayer(nextPlayer: number): number;
    decideFirstPlayer(): number;
    dealHands(): void;
    createPlayers(numHumanPlayers: number): void;
    private validateNumPlayersInput;
    private validateNumHumansInput;
    getNumberOfPlayers(): Promise<number>;
    getNumberOfHumanPlayers(): Promise<number>;
}
export {};
