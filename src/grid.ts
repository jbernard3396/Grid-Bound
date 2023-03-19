import { Tile } from '../src/tile';
class Grid {
    grid: Array<Array<Tile>>;
    public width: number;
    public height: number;
    constructor(width: number, height: number) {
        this.grid = new Array(width);
        this.width = width;
        this.height = height;
        for (let i = 0; i < width; i++) {
            this.grid[i] = new Array(height);
            for (let j = 0; j < height; j++) {
                this.grid[i][j] = new Tile();
            }
        }
    }
    get(x: number, y: number) {
        if(x < 0 || x >= this.width || y < 0 || y >= this.height) {
            throw new Error("Out of bounds grid access: " + x + ", " + y);
        }
        return this.grid[x][y].value;
    }
    CircleRangeIndicator(x: number, y: number, radius: number) {
        if (radius < 0) {
            throw new Error("Radius must be positive");
        }
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            throw new Error("Out of bounds grid access: " + x + ", " + y);
        } 
        let tilesInRange = [];
        for (let i = x - radius; i <= x + radius; i++) {
            for (let j = y - radius; j <= y + radius; j++) {
                if (i >= 0 && i < this.width && j >= 0 && j < this.height) {
                    if (Math.sqrt(Math.pow(i - x, 2) + Math.pow(j - y, 2)) <= radius) {
                        tilesInRange.push([i, j]);
                    }
                }
            }
        }
        return tilesInRange;
    }
    SquareRangeIndicator(x: number, y: number, radius: number) {
        if (radius < 0) {
            throw new Error("Radius must be positive");
        }
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            throw new Error("Out of bounds grid access: " + x + ", " + y);
        } 
        let tilesInRange = [];
        for (let i = x - radius; i <= x + radius; i++) {
            for (let j = y - radius; j <= y + radius; j++) {
                if (i >= 0 && i < this.width && j >= 0 && j < this.height) {
                    tilesInRange.push([i, j]);
                }
            }
        }
        return tilesInRange;
    }
}


export {Grid};