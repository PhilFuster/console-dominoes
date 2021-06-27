export declare type Tile = {
    pip1: number;
    pip2: number;
};
export declare class Board {
    tiles: Tile[];
    static fromNewBoard(): Board;
    validateMove(tile: Tile, side: BoardSide): {
        error: boolean;
        message: string | undefined;
    };
}
export declare enum BoardSide {
    Left = "L",
    Right = "R"
}
