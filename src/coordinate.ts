export class Coordinate {
    x : number;
    y : number;
    constructor(x : number, y : number) {
        this.x = x;
        this.y = y;
    }

    add(coordinate : Coordinate) : Coordinate {
        return new Coordinate(this.x + coordinate.x, this.y + coordinate.y);
    }

    multiply(coordinate : Coordinate) : Coordinate {
        return new Coordinate(this.x * coordinate.x, this.y * coordinate.y);
    }

    toString() : string {
        return `${this.x},${this.y}`;
    }

    equals(coordinate : Coordinate) : boolean {
        return this.x === coordinate.x && this.y === coordinate.y;
    }

    static CreateArray(...coordinates : number[][]) : Coordinate[] {
        return coordinates.map((coordinate) => new Coordinate(coordinate[0], coordinate[1]));
    }

    static DedupArray(coordinates : Coordinate[]) : Coordinate[] {
        const dedupedCoordinates : Coordinate[] = [];
        coordinates.forEach((coordinate) => {
            if (!dedupedCoordinates.some((dedupedCoordinate) => dedupedCoordinate.equals(coordinate))) {
                dedupedCoordinates.push(coordinate);
            }
        });
        return dedupedCoordinates;
    }
}