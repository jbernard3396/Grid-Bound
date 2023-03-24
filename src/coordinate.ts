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

}