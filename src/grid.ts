const TileClass = require("./tile").Tile;

class Grid {
    grid: Tile[][]
    public width: number;
    public height: number;
    constructor(width: number, height: number) {
        this.grid = new Array(width);
        this.width = width;
        this.height = height;
        for (let i = 0; i < width; i++) {
            this.grid[i] = new Array(height);
            // this.grid[i].fill(0);
            for (let j = 0; j < height; j++) {
                this.grid[i][j] = new TileClass();
            }
        }
    }
    get(x: number, y: number) {
        if(x < 0 || x >= this.width || y < 0 || y >= this.height) {
            throw new Error("Out of bounds grid access: " + x + ", " + y);
        }
        return this.grid[x][y].value;
    }
}


module.exports = {Grid};