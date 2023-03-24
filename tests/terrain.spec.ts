import { describe, expect, test } from '@jest/globals';
import { Terrain } from '../src/terrain';

describe('Terrain', () => {
    describe('constructor', () => {
        test('should create a terrain', () => {
            const terrain = new Terrain();
            expect(terrain).toBeDefined();
        });
        test('should create a terrain with the given disabledActions', () => {
            const terrain = new Terrain(['move']);
            expect(terrain.disabledActions).toContain('move');
        });
    });
});