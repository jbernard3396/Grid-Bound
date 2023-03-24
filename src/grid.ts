import { Cell } from './cell';
import { Coordinate } from './coordinate';
class Grid {
    grid: Array<Array<Cell>>;
    public width: number;
    public height: number;
    constructor(width: number, height: number) {
        this.grid = new Array(width);
        this.width = width;
        this.height = height;
        for (let i = 0; i < width; i++) {
            this.grid[i] = new Array(height);
            for (let j = 0; j < height; j++) {
                this.grid[i][j] = new Cell();
            }
        }
    }
    get(coordinate: Coordinate) {
        if(coordinate.x < 0 || coordinate.x >= this.width || coordinate.y < 0 || coordinate.y >= this.height) {
            throw new Error("Out of bounds grid access: " + coordinate.x + ", " + coordinate.y);
        }
        return this.grid[coordinate.x][coordinate.y].value;
    }
    CircleRangeIndicator(coordinate: Coordinate, radius: number) {
        if (radius < 0) {
            throw new Error("Radius must be positive");
        }
        if (coordinate.x < 0 || coordinate.x >= this.width || coordinate.y < 0 || coordinate.y >= this.height) {
            throw new Error("Out of bounds grid access: " + coordinate.x + ", " + coordinate.y);
        } 
        let tilesInRange = [];
        for (let i = coordinate.x - radius; i <= coordinate.x + radius; i++) {
            for (let j = coordinate.y - radius; j <= coordinate.y + radius; j++) {
                if (i >= 0 && i < this.width && j >= 0 && j < this.height) {
                    let distance = Math.sqrt(Math.pow(i - coordinate.x, 2) + Math.pow(j - coordinate.y, 2));
                    if (distance <= radius) {
                        tilesInRange.push([i, j]);
                    }
                }
            }
        }
        return tilesInRange;
    }
    SquareRangeIndicator(coordinate: Coordinate, radius: number) {
        if (radius < 0) {
            throw new Error("Radius must be positive");
        }
        if (coordinate.x < 0 || coordinate.x >= this.width || coordinate.y < 0 || coordinate.y >= this.height) {
            throw new Error("Out of bounds grid access: " + coordinate.x + ", " + coordinate.y);
        } 
        let tilesInRange = [];
        for (let i = coordinate.x - radius; i <= coordinate.x + radius; i++) {
            for (let j = coordinate.y - radius; j <= coordinate.y + radius; j++) {
                if (i >= 0 && i < this.width && j >= 0 && j < this.height) {
                    tilesInRange.push([i, j]);
                }
            }
        }
        return tilesInRange;
    }
}


export {Grid};