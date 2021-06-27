import {Stock} from '../src/types/Stock';
import {Tile} from '../src/types/Board';
import {sixPipTiles, sevenPipTiles, eightPipTiles} from './tilesTestData';

describe('Stock', () => {
  describe.each([
    {highestPip: 6, expectedTiles: 28, tiles: sixPipTiles},
    {highestPip: 7, expectedTiles: 36, tiles: sevenPipTiles},
    {highestPip: 8, expectedTiles: 45, tiles: eightPipTiles},
  ])('.initialize($highestPip)', ({highestPip, expectedTiles, tiles}) => {
    test(`expected tiles ${expectedTiles}`, () => {
      const stock = new Stock();
      stock.initialize(highestPip);
      expect(stock.length()).toBe(expectedTiles);
    });

    test(`tiles created should match what is in ${highestPip}PipTiles variable`, () => {
      const stock = new Stock();
      stock.initialize(highestPip);
      expect(stock.get()).toEqual(expect.arrayContaining(tiles));
    });
    test('.shuffle() should shuffle tiles but still contain the same overall elements', () => {
      const stock = new Stock();
      stock.initialize(highestPip);
      stock.shuffle();
      expect(stock.get()).toEqual(expect.arrayContaining(tiles));
    });
  });
});
