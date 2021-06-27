"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Stock_1 = require("../src/types/Stock");
const tilesTestData_1 = require("./tilesTestData");
describe('Stock', () => {
    describe.each([
        { highestPip: 6, expectedTiles: 28, tiles: tilesTestData_1.sixPipTiles },
        { highestPip: 7, expectedTiles: 36, tiles: tilesTestData_1.sevenPipTiles },
        { highestPip: 8, expectedTiles: 45, tiles: tilesTestData_1.eightPipTiles },
    ])('.initialize($highestPip)', ({ highestPip, expectedTiles, tiles }) => {
        test(`expected tiles ${expectedTiles}`, () => {
            const stock = new Stock_1.Stock();
            stock.initialize(highestPip);
            expect(stock.length()).toBe(expectedTiles);
        });
        test(`tiles created should match what is in ${highestPip}PipTiles variable`, () => {
            const stock = new Stock_1.Stock();
            stock.initialize(highestPip);
            expect(stock.get()).toEqual(expect.arrayContaining(tiles));
        });
        test('.shuffle() should shuffle tiles but still contain the same overall elements', () => {
            const stock = new Stock_1.Stock();
            stock.initialize(highestPip);
            stock.shuffle();
            expect(stock.get()).toEqual(expect.arrayContaining(tiles));
        });
    });
});
//# sourceMappingURL=Stock.test.js.map