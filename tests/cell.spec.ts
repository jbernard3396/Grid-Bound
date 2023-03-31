import { describe, expect, test } from '@jest/globals';
import { Cell } from '../src/cell/cell';
import { ICellObject } from '../src/interfaces/ICellObject';
import { Terrain } from '../src/terrain/terrain';
import { ACTIONS } from '../src/enums/action';

describe('Cell', () => {
    describe('constructor', () => {
        test('should create a cell with the given cellObject', () => {
            const newTerrain = new Terrain();
            const cell = new Cell(new Array<ICellObject>(newTerrain));
            expect(cell.value).toContain(newTerrain);
        });
        test('should create a cell when given null', () => {
            const cell = new Cell();
            expect(cell.value).toBe(null);
        });
    });
    describe('addCellObject', () => {
        test('should add a cellObject to the cell', () => {
            const newTerrain = new Terrain();
            const newTerrain2 = new Terrain();
            const cell = new Cell();
            cell.addCellObject(newTerrain);
            expect(cell.value).toContain(newTerrain);
            cell.addCellObject(newTerrain2);
            expect(cell.value).toContain(newTerrain2);
        });
    });
    describe('removeCellObject', () => {
        test('should remove a cellObject from the cell', () => {
            const newTerrain = new Terrain();
            const newTerrain2 = new Terrain();
            const cell = new Cell();
            cell.addCellObject(newTerrain);
            cell.addCellObject(newTerrain2);
            cell.removeCellObject(newTerrain);
            expect(cell.value).not.toContain(newTerrain);
            expect(cell.value).toContain(newTerrain2);
        });
        test('should throw an error when the cellObject is not in the cell', () => {
            const newTerrain = new Terrain();
            const newTerrain2 = new Terrain();
            const cell = new Cell();
            cell.addCellObject(newTerrain);
            expect(() => cell.removeCellObject(newTerrain2)).toThrow();
        });
    });
    describe('getDisabledActions', () => {
        test('should return an empty array when the cell is empty', () => {
            const cell = new Cell();
            expect(cell.getDisabledActions()).toEqual([]);
        });
        test('should return the disabled actions of the cell', () => {
            const newTerrain = new Terrain([ACTIONS.MOVE]);
            const newTerrain2 = new Terrain([ACTIONS.TARGET]);
            const cell = new Cell();
            cell.addCellObject(newTerrain);
            cell.addCellObject(newTerrain2);
            expect(cell.getDisabledActions()).toContain(ACTIONS.MOVE);
            expect(cell.getDisabledActions()).toContain(ACTIONS.TARGET);
        });
    });
    describe('getCellStats', () => {
        test('should return an empty array when the cell is empty', () => {
            const cell = new Cell();
            expect(cell.getCellStats()).toEqual({ movementPenalty: 0, visionPenalty: 0, targetPenalty: 0 });
        });
        test('should combine the stats of the cell', () => {
            const newTerrain = new Terrain();
            const newTerrain2 = new Terrain();
            newTerrain.stats = { movementPenalty: 0, visionPenalty: 0, targetPenalty: 1 };
            newTerrain2.stats = { movementPenalty: 1, visionPenalty: 0, targetPenalty: 1 };
            const cell = new Cell();
            cell.addCellObject(newTerrain);
            cell.addCellObject(newTerrain2);
            expect(cell.getCellStats()).toEqual({ movementPenalty: 1, visionPenalty: 0, targetPenalty: 2});
        });
    });
});