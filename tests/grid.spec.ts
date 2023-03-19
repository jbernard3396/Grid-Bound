import {describe, expect, test} from '@jest/globals';
import {Grid} from '../src/grid';

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
    describe("CircleRangeIndicator", () => {
        test("should return an array of the coordinates that are in range", () => {
            const grid = new Grid(3, 4);
            expect(grid.CircleRangeIndicator(1, 1, 1).sort()).toStrictEqual([[0, 1], [1, 1], [2, 1], [1, 0], [1, 2]].sort());
        });
        test("should leave out coordinates that are out of bounds", () => {
            const grid = new Grid(3, 4);
            expect(grid.CircleRangeIndicator(0, 0, 1).sort()).toStrictEqual([[0, 0], [1, 0], [0, 1]].sort());
            expect(grid.CircleRangeIndicator(2, 3, 1).sort()).toStrictEqual([[2, 3], [1, 3], [2, 2]].sort());
            expect(grid.CircleRangeIndicator(1, 1, 100).sort()).toStrictEqual([[0,0],[0,1],[0,2],[0,3], [1,0],[1,1],[1,2],[1,3],[2,0],[2,1],[2,2],[2,3]].sort());

        });
        test("should return the passed in coordinate when the range is 0", () => {
            const grid = new Grid(3, 4);
            expect(grid.CircleRangeIndicator(1, 1, 0).sort()).toStrictEqual([[1, 1]].sort());
        });
        test("should throw an error when the range is negative", () => {
            const grid = new Grid(3, 4);
            expect(() => grid.CircleRangeIndicator(1, 1, -1)).toThrow();
        });
        test("should throw an error when the coordinates are out of bounds", () => {
            const grid = new Grid(3, 4);
            expect(() => grid.CircleRangeIndicator(3, 2, 1)).toThrow("Out of bounds grid access: 3, 2");
            expect(() => grid.CircleRangeIndicator(1, 4, 1)).toThrow("Out of bounds grid access: 1, 4");
            expect(() => grid.CircleRangeIndicator(-1, 2, 1)).toThrow("Out of bounds grid access: -1, 2");
        });
    });
    describe("SquareRangeIndicator", () => {
        test("should return an array of the coordinates that are in range", () => {
            const grid = new Grid(3, 4);
            expect(grid.SquareRangeIndicator(1, 1, 1).sort()).toStrictEqual([[0,0],[0, 1],[0,2],[1,0], [1, 1], [1, 2],[2,0],[2,1],[2,2]].sort());
        });
        test("should leave out coordinates that are out of bounds", () => {
            const grid = new Grid(3, 4);
            expect(grid.SquareRangeIndicator(0, 0, 1).sort()).toStrictEqual([[0, 0], [0, 1], [1, 0], [1, 1]].sort());
            expect(grid.SquareRangeIndicator(2, 3, 1).sort()).toStrictEqual([[1, 2], [1, 3], [2, 2], [2, 3]].sort());
            expect(grid.SquareRangeIndicator(1, 1, 100).sort()).toStrictEqual([[0,0],[0,1],[0,2],[0,3], [1,0],[1,1],[1,2],[1,3],[2,0],[2,1],[2,2],[2,3]].sort());
        });
        test("should return the passed in coordinate when the range is 0", () => {
            const grid = new Grid(3, 4);
            expect(grid.SquareRangeIndicator(1, 1, 0).sort()).toStrictEqual([[1, 1]].sort());
        });
        test("should throw an error when the range is negative", () => {
            const grid = new Grid(3, 4);
            expect(() => grid.SquareRangeIndicator(1, 1, -1)).toThrow();
        });
        test("should throw an error when the coordinates are out of bounds", () => {
            const grid = new Grid(3, 4);
            expect(() => grid.SquareRangeIndicator(3, 2, 1)).toThrow("Out of bounds grid access: 3, 2");
            expect(() => grid.SquareRangeIndicator(1, 4, 1)).toThrow("Out of bounds grid access: 1, 4");
            expect(() => grid.SquareRangeIndicator(-1, 2, 1)).toThrow("Out of bounds grid access: -1, 2");
        });
    });
});

