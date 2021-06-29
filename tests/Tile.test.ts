import {Tile} from './../src/types/Tile';

describe('Tile', () => {
  test('.reverse()', () => {
    const tile = new Tile(1, 2);
    tile.reverse();
    const tile2 = new Tile(2, 1);
    expect(tile).toEqual(tile2);
  });
});
