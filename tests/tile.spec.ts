const {describe, expect, test} = require('@jest/globals');
//todo:J this should obviously not be named tile 2.  something about the import is not working
const Tile2 = require('../src/tile').Tile;

describe('Tile', () => {
    describe('constructor', () => {
        test('should create a tile with the given value', () => {
            const tile = new Tile2(2);
            expect(tile.value).toBe(2);
        });
        test('should create a tile when given null', () => {
            const tile = new Tile2();
            expect(tile.value).toBe(null);
        });
    });
});