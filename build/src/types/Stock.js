"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stock = void 0;
class Stock {
    constructor() {
        this.tiles = [];
    }
    dealHand() {
        const hand = [];
        for (let i = 0; i < 7; ++i) {
            const t = this.dealTile();
            if (t) {
                hand.push(t);
            }
        }
        return hand;
    }
    dealTile() {
        return this.tiles.pop();
    }
    length() {
        return this.tiles.length;
    }
    get() {
        return this.tiles;
    }
    shuffle() {
        for (let i = this.tiles.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.tiles[i], this.tiles[j]] = [this.tiles[j], this.tiles[i]];
        }
    }
    initialize(highestPip) {
        let pip1Count = 0;
        let pip2Count = 0;
        if (!highestPip)
            highestPip = 6;
        for (pip1Count; pip1Count <= highestPip; pip1Count++) {
            pip2Count = pip1Count;
            for (pip2Count; pip2Count <= highestPip; pip2Count++) {
                const newTile = { pip1: pip1Count, pip2: pip2Count };
                this.tiles.push(newTile);
            }
        }
    }
}
exports.Stock = Stock;
//# sourceMappingURL=Stock.js.map