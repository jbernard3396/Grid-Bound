import { describe, expect, test } from '@jest/globals';
import { CellStats } from '../src/cell/cellStats';

describe('CellStats', () => {
    describe('constructor', () => {
        test('should create a cellStats', () => {
            const cellStats = new CellStats();
            expect(cellStats).toBeDefined();
        });
        test('should default penalties to 0', () => {
            const cellStats = new CellStats();
            expect(cellStats.movementPenalty).toBe(0);
            expect(cellStats.visionPenalty).toBe(0);
            expect(cellStats.targetPenalty).toBe(0);
        });
        test('should create a cellStats with the given movementPenalty', () => {
            const cellStats = new CellStats(2);
            expect(cellStats.movementPenalty).toBe(2);
        });
        test('should create a cellStats with the given visionPenalty', () => {
            const cellStats = new CellStats(2, 3);
            expect(cellStats.visionPenalty).toBe(3);
        });
        test('should create a cellStats with the given targetPenalty', () => {
            const cellStats = new CellStats(2, 3, 4);
            expect(cellStats.targetPenalty).toBe(4);
        });
    });
});
