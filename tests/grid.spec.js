// import {describe, expect, test} from '@jest/globals';
const {describe, expect, test} = require('@jest/globals');
const instantiateGrid = require('../src/grid').instantiateGrid;

describe("instantiateGrid", () => {
    test("creates a grid of the appropriate size", () => {
        const grid = instantiateGrid(3, 4);
        expect(grid.length).toBe(3);
        expect(grid[0].length).toBe(4);
    });
});