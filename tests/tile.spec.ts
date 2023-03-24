import { describe, expect, test } from '@jest/globals';
import { Cell } from '../src/cell';
describe('Tile', () => {
    describe('constructor', () => {
        test('should create a tile with the given value', () => {
            const tile = new Cell(2);
            expect(tile.value).toBe(2);
        });
        test('should create a tile when given null', () => {
            const tile = new Cell();
            expect(tile.value).toBe(null);
        });
    });
});