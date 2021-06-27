import { Tile, Board } from './Board';
import { Game } from './Game';
export declare enum PlayerType {
    Human = "H",
    Computer = "C"
}
export declare abstract class Player {
    readonly name: string;
    abstract readonly playerType: PlayerType;
    hand: Tile[];
    constructor(name: string);
    abstract play(board: Board, game: Game): Promise<boolean> | boolean;
}
declare enum MenuChoiceType {
    Menu = "m",
    Tile = "t"
}
export declare class Human extends Player {
    readonly playerType = PlayerType.Human;
    play(board: Board, game: Game): Promise<boolean>;
    validateMenuChoice(input: string, options: {
        highestPip: number;
        menuChoiceType: MenuChoiceType | undefined;
        hand: Tile[];
    }): boolean;
    displayHand(): void;
}
export declare class Computer extends Player {
    readonly playerType = PlayerType.Computer;
    play(board: Board): boolean;
}
export {};
