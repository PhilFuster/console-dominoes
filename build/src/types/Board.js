"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardSide = exports.Board = void 0;
class Board {
    constructor() {
        this.tiles = [];
    }
    static fromNewBoard() {
        const board = new Board();
        return board;
    }
    validateMove(tile, side) {
        const returnArgs = { error: false, message: '' };
        // make sure the tile can be played on the board side selected
        // check for pip values
        return returnArgs;
    }
}
exports.Board = Board;
var BoardSide;
(function (BoardSide) {
    BoardSide["Left"] = "L";
    BoardSide["Right"] = "R";
})(BoardSide = exports.BoardSide || (exports.BoardSide = {}));
//# sourceMappingURL=Board.js.map