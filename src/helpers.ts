export class Helpers {
    public static dedupArray<T>(array: T[]): T[] {
        const dedupedArray: T[] = [];
        for (let i = 0; i < array.length; i++) {
            if (!dedupedArray.includes(array[i])) {
                dedupedArray.push(array[i]);
            }
        }
        return dedupedArray;
    }

    public static arrayEquality<T>(array1: T[], array2: T[]): boolean {
        if (array1.length != array2.length) {
            return false;
        }
        for (let i = 0; i < array1.length; i++) {
            if (array1[i] != array2[i]) {
                return false;
            }
        }
        return true;
    }
}