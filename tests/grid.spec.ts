import {describe, expect, test} from '@jest/globals';
import {Grid} from '../src/grid';
import { Coordinate } from '../src/coordinate';
import { ACTIONS } from '../src/enums/action';
import { Pillar } from '../src/terrain/pillar';
import { Swamp } from '../src/terrain/swamp';
import { RangeTypes } from '../src/enums/rangeTypes';

describe("Grid", () => {
    describe("constructor", () => {
        test("creates a grid of the appropriate size", () => {
            const grid = new Grid(3, 4);
            expect(grid.width).toBe(3);
            expect(grid.height).toBe(4);
        });
        test("fills the grid with nulls", () => {
            const grid = new Grid(3, 4);
            expect(grid.get(new Coordinate(1, 2)).value).toBe(null);
        });
    });
    describe('addCellObject', () => {
        test('throws an error when the coordinates are out of bounds', () => {
            const newTerrain = new Pillar();
            const grid = new Grid(3, 4);
            expect(() => grid.addCellObject(new Coordinate(3, 2), newTerrain)).toThrow();
            expect(() => grid.addCellObject(new Coordinate(1, 4), newTerrain)).toThrow();
            expect(() => grid.addCellObject(new Coordinate(-1, 2), newTerrain)).toThrow();
        });
        test('should add a cellObject to the cell', () => {
            const newTerrain = new Pillar();
            const grid = new Grid(3, 4);
            grid.addCellObject(new Coordinate(1, 2), newTerrain);
            expect(grid.get(new Coordinate(1, 2)).value).toContain(newTerrain);
        });
    });
    describe("get", () => {
        test("throws an error when the coordinates are out of bounds", () => {
            const grid = new Grid(3, 4);
            expect(() => grid.get(new Coordinate(3, 2))).toThrow();
            expect(() => grid.get(new Coordinate(1, 4))).toThrow();
            expect(() => grid.get(new Coordinate(-1, 2))).toThrow();
        });
    });
    describe("RangeIndicator", () => {
        test("should return an array of the coordinates that are in range when given Circle", () => {
            const grid = new Grid(3, 4);
            const expectedCoordinates = new Array<Coordinate>();
            expectedCoordinates.push(new Coordinate(0, 1));
            expectedCoordinates.push(new Coordinate(1, 1));
            expectedCoordinates.push(new Coordinate(2, 1));
            expectedCoordinates.push(new Coordinate(1, 0));
            expectedCoordinates.push(new Coordinate(1, 2));
            expect(grid.RangeIndicator(new Coordinate(1, 1), 1, RangeTypes.CIRCLE).sort()).toStrictEqual(expectedCoordinates.sort());
            
        });
        test("should leave out coordinates that are out of bounds", () => {
            const grid = new Grid(3, 4);
            const expectedCoordinates = Coordinate.CreateArray([0,0], [1,0], [0,1]);
            const expectedCoordinates2 = Coordinate.CreateArray([2,3], [1,3], [2,2]);
            const expectedCoordinates3 = Coordinate.CreateArray([0,0], [0,1], [0,2], [0,3], [1,0], [1,1], [1,2], [1,3],[2,0],[2,1],[2,2],[2,3]);
            expect(grid.RangeIndicator(new Coordinate(0, 0), 1,RangeTypes.CIRCLE).sort()).toStrictEqual(expectedCoordinates.sort());
            expect(grid.RangeIndicator(new Coordinate(2, 3), 1,RangeTypes.CIRCLE).sort()).toStrictEqual(expectedCoordinates2.sort());
            expect(grid.RangeIndicator(new Coordinate(1, 1), 100,RangeTypes.CIRCLE).sort()).toStrictEqual(expectedCoordinates3.sort());
        });
        test("should return the passed in coordinate when the range is 0", () => {
            const grid = new Grid(3, 4);
            expect(grid.RangeIndicator(new Coordinate(1, 1), 0, RangeTypes.CIRCLE).sort()).toStrictEqual([new Coordinate(1, 1)].sort());
            expect(grid.RangeIndicator(new Coordinate(1, 1), 0, RangeTypes.SQUARE).sort()).toStrictEqual([new Coordinate(1, 1)].sort());
        });
        test("should throw an error when the range is negative", () => {
            const grid = new Grid(3, 4);
            expect(() => grid.RangeIndicator(new Coordinate(1, 1), -1, RangeTypes.CIRCLE)).toThrow();
            expect(() => grid.RangeIndicator(new Coordinate(1, 1), -1, RangeTypes.SQUARE)).toThrow();
        });
        test("should throw an error when the coordinates are out of bounds", () => {
            const grid = new Grid(3, 4);
            expect(() => grid.RangeIndicator(new Coordinate(3, 2), 1, RangeTypes.CIRCLE)).toThrow("Out of bounds grid access: 3, 2");
            expect(() => grid.RangeIndicator(new Coordinate(1, 4), 1, RangeTypes.CIRCLE)).toThrow("Out of bounds grid access: 1, 4");
            expect(() => grid.RangeIndicator(new Coordinate(-1, 2), 1, RangeTypes.CIRCLE)).toThrow("Out of bounds grid access: -1, 2");
        });
        test("Should not include terrain that does not allow desired action", () => {
            const grid = new Grid(3, 4);
            const pillar = new Pillar();
            grid.addCellObject(new Coordinate(1, 0), pillar);
            expect(grid.RangeIndicator(new Coordinate(0, 0), 1, RangeTypes.CIRCLE, [ACTIONS.STAND]).sort()).toStrictEqual(Coordinate.CreateArray([0, 0], [0, 1]).sort());
            expect(true).toBe(true);
        });
        test("Should pathfind around terrain that does not allow desired action when given Circle", () => {
            const grid = new Grid(3, 4);
            const pillar = new Pillar();
            grid.addCellObject(new Coordinate(1, 0), pillar);
            expect(grid.RangeIndicator(new Coordinate(0, 0), 2, RangeTypes.CIRCLE,[ACTIONS.MOVE, ACTIONS.STAND]).sort()).toStrictEqual(Coordinate.CreateArray([0, 0], [0, 1], [1, 1], [0, 2]).sort());
            expect(grid.RangeIndicator(new Coordinate(0, 0), 3, RangeTypes.CIRCLE,[ACTIONS.MOVE, ACTIONS.STAND]).sort()).toStrictEqual(Coordinate.CreateArray([0, 0], [0, 1], [1, 1], [0, 2], [0,3], [2, 1], [1, 2]).sort());    
            expect(grid.RangeIndicator(new Coordinate(0, 0), 4, RangeTypes.CIRCLE,[ACTIONS.MOVE, ACTIONS.STAND]).sort()).toStrictEqual(Coordinate.CreateArray([0, 0], [0, 1], [1, 1], [0, 2], [0,3], [2, 1], [1, 2], [2,0], [2,2], [1, 3]).sort());
        });
        test("should return an array of the coordinates that are in range when given Square", () => {
            const grid = new Grid(3, 4);
            expect(grid.RangeIndicator(new Coordinate(1, 1), 1,RangeTypes.SQUARE).sort()).toStrictEqual(Coordinate.CreateArray([0,0],[0, 1],[0,2],[1,0], [1, 1], [1, 2],[2,0],[2,1],[2,2]).sort());
        });
        test("Should pathfind around terrain that does not allow desired action when given Square", () => {
            const grid = new Grid(3, 4);
            const pillar = new Pillar();
            grid.addCellObject(new Coordinate(1, 0), pillar);
            expect(grid.RangeIndicator(new Coordinate(0, 0), 2, RangeTypes.SQUARE,[ACTIONS.MOVE, ACTIONS.STAND]).sort()).toStrictEqual(Coordinate.CreateArray([0, 0], [0, 1], [1, 1], [0, 2], [1, 2], [2,2], [2, 1], [2,0]).sort());
            expect(grid.RangeIndicator(new Coordinate(0, 0), 3, RangeTypes.SQUARE,[ACTIONS.MOVE, ACTIONS.STAND]).sort()).toStrictEqual(Coordinate.CreateArray([0, 0], [0, 1], [1, 1], [0, 2], [1, 2], [2,2], [2, 1], [2,0], [0,3], [1,3], [2,3]).sort());
        });
        test("Should spend more movement points when pathfinding through terrain with a movementCost", () => {
            const grid = new Grid(3, 4);
            const swamp = new Swamp();
            grid.addCellObject(new Coordinate(1, 0), swamp);
            expect(grid.RangeIndicator(new Coordinate(0, 0), 1, RangeTypes.CIRCLE,[ACTIONS.MOVE, ACTIONS.STAND]).sort()).toStrictEqual(Coordinate.CreateArray([0, 0], [0,1]).sort());
            expect(grid.RangeIndicator(new Coordinate(0, 0), 2, RangeTypes.CIRCLE,[ACTIONS.MOVE, ACTIONS.STAND]).sort()).toStrictEqual(Coordinate.CreateArray([0, 0], [0, 1], [0, 2], [1, 0], [1, 1], ).sort());
            expect(grid.RangeIndicator(new Coordinate(0, 0), 3, RangeTypes.CIRCLE,[ACTIONS.MOVE, ACTIONS.STAND]).sort()).toStrictEqual(Coordinate.CreateArray([0, 0], [0, 1], [0, 2], [0,3], [1, 0], [1, 1], [1, 2], [2,0], [2, 1]).sort());    
            expect(grid.RangeIndicator(new Coordinate(0, 0), 3, RangeTypes.CIRCLE,[ACTIONS.MOVE, ACTIONS.STAND]).sort()).toStrictEqual(Coordinate.CreateArray([0, 0], [0, 1], [0, 2], [0,3], [1, 0], [1, 1], [1, 2], [1,3], [2,0], [2, 1],[2,2]).sort());    
        });
    });
});

