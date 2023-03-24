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
    describe('toString', () => {
        test('should return a string representation of the coordinate', () => {
            const coordinate = new Coordinate(2, 3);
            expect(coordinate.toString()).toBe('2,3');
        });
        describe('sorting an array of coordinates', () => {
            test('should put Coordinates with low x values first', () => {
                const coordinate = new Coordinate(2, 3);
                const coordinate2 = new Coordinate(1, 1);
                const coordinate3 = new Coordinate(0, 0);
                const coordinateArray = [coordinate, coordinate2, coordinate3];
                coordinateArray.sort();
                expect(coordinateArray[0]).toBe(coordinate3);
                expect(coordinateArray[1]).toBe(coordinate2);
                expect(coordinateArray[2]).toBe(coordinate);
            });
            test('should put Coordinates with low y values first if x values are equal', () => {
                const coordinate = new Coordinate(2, 3);
                const coordinate2 = new Coordinate(2, 1);
                const coordinate3 = new Coordinate(2, 0);
                const coordinateArray = [coordinate, coordinate2, coordinate3];
                coordinateArray.sort();
                expect(coordinateArray[0]).toBe(coordinate3);
                expect(coordinateArray[1]).toBe(coordinate2);
                expect(coordinateArray[2]).toBe(coordinate);
            });
        });
    });
    describe('createArray', () => {
        test('should return an array of coordinates', () => {
            const coordinateArray = Coordinate.CreateArray([1, 2], [0, 1], [1, 0]);
            expect(coordinateArray).toHaveLength(3);
            expect(coordinateArray).toContainEqual(new Coordinate(1, 2));
            expect(coordinateArray).toContainEqual(new Coordinate(0, 1));
            expect(coordinateArray).toContainEqual(new Coordinate(1, 0));
        });
    });
    describe('equals', () => {
        test('should return true if the coordinates are equal', () => {
            const coordinate = new Coordinate(2, 3);
            const coordinate2 = new Coordinate(2, 3);
            expect(coordinate.equals(coordinate2)).toBe(true);
        });
        test('should return false if the coordinates are not equal', () => {
            const coordinate = new Coordinate(2, 3);
            const coordinate2 = new Coordinate(1, 1);
            expect(coordinate.equals(coordinate2)).toBe(false);
        });
    });
    describe('dedupArray', () => {
        test('should return an array with no duplicates', () => {
            expect(Coordinate.DedupArray(Coordinate.CreateArray([1, 2], [0, 1], [1, 0], [1, 2], [0, 1], [1, 0]))).toStrictEqual(Coordinate.CreateArray([1, 2], [0, 1], [1, 0]));
        });
    });
});