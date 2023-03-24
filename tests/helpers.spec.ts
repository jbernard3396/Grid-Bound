import {describe, expect, test} from '@jest/globals';
import {Helpers} from '../src/helpers';

describe("Helpers", () => {
    describe('dedup array', () => {
        test('should return an array with no duplicates', () => {
            expect(Helpers.dedupArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        });
        test('should return an empty array when passed an empty array', () => {
            expect(Helpers.dedupArray([])).toStrictEqual([]);
        });
    });
    describe('arrayEuality', () => {
        test('should return true when the arrays are equal', () => {
            expect(Helpers.arrayEquality([1, 2, 3], [1, 2, 3])).toBe(true);
        });
        test('should return false when the arrays are not equal', () => {
            expect(Helpers.arrayEquality([1, 2, 3], [1, 2, 4])).toBe(false);
        });
        test('should return false when the arrays are not the same length', () => {
            expect(Helpers.arrayEquality([1, 2, 3], [1, 2, 3, 4])).toBe(false);
        });
    });
});

