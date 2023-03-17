import { describe, expect, test } from '@jest/globals';
import { Tile } from '../src/tile';
describe('Tile', () => {
    describe('constructor', () => {
        test('should create a tile with the given value', () => {
            const tile = new Tile(2);
            expect(tile.value).toBe(2);
        });
        test('should create a tile when given null', () => {
            const tile = new Tile();
            expect(tile.value).toBe(null);
        });
    });
});