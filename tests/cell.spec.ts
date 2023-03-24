import { describe, expect, test } from '@jest/globals';
import { Cell } from '../src/cell';
describe('Cell', () => {
    describe('constructor', () => {
        test('should create a cell with the given value', () => {
            const cell = new Cell(2);
            expect(cell.value).toBe(2);
        });
        test('should create a cell when given null', () => {
            const cell = new Cell();
            expect(cell.value).toBe(null);
        });
    });
});