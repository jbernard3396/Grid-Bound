import { describe, expect, test } from '@jest/globals';
import { Coordinate } from '../src/coordinate';

describe('Coordinate', () => {
    describe('constructor', () => {
        test('should create a coordinate with the given x and y values', () => {
            const coordinate = new Coordinate(2, 3);
            expect(coordinate.x).toBe(2);
            expect(coordinate.y).toBe(3);
        });
    });
    describe('add', () => {
        test('should add the given coordinate to the current coordinate', () => {
            const coordinate = new Coordinate(2, 3);
            const coordinate2 = new Coordinate(1, 1);
            const result = coordinate.add(coordinate2);
            expect(result.x).toBe(3);
            expect(result.y).toBe(4);
        });
    });
    describe('multiply', () => {
        test('should multiply the given coordinate to the current coordinate', () => {
            const coordinate = new Coordinate(2, 3);
            const coordinate2 = new Coordinate(2, 2);
            const result = coordinate.multiply(coordinate2);
            expect(result.x).toBe(4);
            expect(result.y).toBe(6);
        });
    });
});