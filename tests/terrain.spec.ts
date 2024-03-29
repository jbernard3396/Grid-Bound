import { describe, expect, test } from '@jest/globals';
import { Terrain } from '../src/terrain/terrain';
import { ACTIONS } from '../src/enums/action';
import { CellStats } from '../src/cell/cellStats';

describe('Terrain', () => {
    describe('constructor', () => {
        test('should create a terrain', () => {
            const terrain = new Terrain();
            expect(terrain).toBeDefined();
        });
        test('should create a terrain with the given disabledActions', () => {
            const terrain = new Terrain([ACTIONS.MOVE]);
            expect(terrain.disabledActions).toContain(ACTIONS.MOVE);
        });
        test('should create a terrain with the given CellStats', () => {
            const terrain = new Terrain([ACTIONS.MOVE], new CellStats());
            expect(terrain.stats).toBeDefined();
        });
    });
});