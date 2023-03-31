import { describe, expect, test } from '@jest/globals';
import { CellStats } from '../src/cell/cellStats';

describe('CellStats', () => {
    describe('constructor', () => {
        test('should create a cellStats', () => {
            const cellStats = new CellStats();
            expect(cellStats).toBeDefined();
        });
        test('should create a cellStats with the given movementCost', () => {
            const cellStats = new CellStats(2);
            expect(cellStats.movementCost).toBe(2);
        });
        test('should create a cellStats with the given visionCost', () => {
            const cellStats = new CellStats(2, 3);
            expect(cellStats.visionCost).toBe(3);
        });
        test('should create a cellStats with the given targetCost', () => {
            const cellStats = new CellStats(2, 3, 4);
            expect(cellStats.targetCost).toBe(4);
        });
    });
});
