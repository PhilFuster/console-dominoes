"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardView = void 0;
class BoardView {
    static toConsole(board) {
        let row1 = '';
        let row2 = '';
        let row3 = '';
        board.forEach(tile => {
            if (tile.pip1 === tile.pip2) {
                row1 += `${tile.pip1} `;
                row2 += '| ';
                row3 += `${tile.pip2} `;
            }
            else {
                row1 += '      ';
                row2 += `${tile.pip1} - ${tile.pip2} `;
                row3 += '      ';
            }
        });
        console.log(row1);
        console.log(row2);
        console.log(row3);
    }
}
exports.BoardView = BoardView;
//# sourceMappingURL=BoardView.js.map