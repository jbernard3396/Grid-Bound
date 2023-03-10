// import {describe, expect, test} from '@jest/globals';
const {describe, expect, test} = require('@jest/globals');
const Grid = require('../src/grid').Grid;
describe("Grid", () => {
    describe("constructor", () => {
        test("creates a grid of the appropriate size", () => {
            const grid = new Grid(3, 4);
            expect(grid.width).toBe(3);
            expect(grid.height).toBe(4);
        });
        test("fills the grid with nulls", () => {
            const grid = new Grid(3, 4);
            expect(grid.get(1, 2)).toBe(null);
        });
    });
    describe("get", () => {
        test("throws an error when the coordinates are out of bounds", () => {
            const grid = new Grid(3, 4);
            expect(() => grid.get(3, 2)).toThrow();
            expect(() => grid.get(1, 4)).toThrow();
            expect(() => grid.get(-1, 2)).toThrow();
        });
    });
});

