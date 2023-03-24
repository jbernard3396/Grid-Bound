import { Cell } from './cell';
import { Coordinate } from './coordinate';
import { ACTIONS } from './enums/action';
import { RangeTypes } from './enums/rangeTypes';

export class Grid {
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
    get(coordinate: Coordinate) : Cell {
        if(coordinate.x < 0 || coordinate.x >= this.width || coordinate.y < 0 || coordinate.y >= this.height) {
            throw new Error("Out of bounds grid access: " + coordinate.x + ", " + coordinate.y);
        }
        return this.grid[coordinate.x][coordinate.y];
    }
    addCellObject(coordinate: Coordinate, cellObject: any) {
        if(coordinate.x < 0 || coordinate.x >= this.width || coordinate.y < 0 || coordinate.y >= this.height) {
            throw new Error("Out of bounds grid access: " + coordinate.x + ", " + coordinate.y);
        }
        this.grid[coordinate.x][coordinate.y].addCellObject(cellObject);
    }
    CircleRangeIndicator(coordinate: Coordinate, radius: number, actions: Array<ACTIONS> = []) {
        if (radius < 0) {
            throw new Error("Radius must be positive");
        }        
        if (coordinate.x < 0 || coordinate.x >= this.width || coordinate.y < 0 || coordinate.y >= this.height) {
            throw new Error("Out of bounds grid access: " + coordinate.x + ", " + coordinate.y);
        } 
        let tilesInRange = [];
        tilesInRange.push(new Coordinate(coordinate.x, coordinate.y));
        for (let i = 0; i < radius; i++) {
            let newTilesInRange = new Array<Coordinate>();
            for (let j = 0; j < tilesInRange.length; j++) {
                newTilesInRange = newTilesInRange.concat(this.getAdjacentTiles(tilesInRange[j], RangeTypes.CIRCLE));
            }
            tilesInRange = tilesInRange.concat(newTilesInRange);
            tilesInRange = Coordinate.DedupArray(tilesInRange);
            tilesInRange = this.removeTilesNotMatchingActions(tilesInRange, actions);
        }

        return tilesInRange;
    }
    SquareRangeIndicator(coordinate: Coordinate, radius: number): Array<Coordinate> {
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
                    tilesInRange.push(new Coordinate(i, j));
                }
            }
        }
        return tilesInRange;
    }

    private getAdjacentTiles(coordinate: Coordinate, rangeType: RangeTypes): Array<Coordinate> {
        let adjacentTiles = [];
        let x = coordinate.x;
        let y = coordinate.y;
        if (rangeType === RangeTypes.CIRCLE) {
            adjacentTiles.push(new Coordinate(x - 1, y));
            adjacentTiles.push(new Coordinate(x + 1, y));
            adjacentTiles.push(new Coordinate(x, y - 1));
            adjacentTiles.push(new Coordinate(x, y + 1));
        } else if (rangeType === RangeTypes.SQUARE) {
            adjacentTiles.push(new Coordinate(x - 1, y - 1));
            adjacentTiles.push(new Coordinate(x - 1, y));
            adjacentTiles.push(new Coordinate(x - 1, y + 1));
            adjacentTiles.push(new Coordinate(x, y - 1));
            adjacentTiles.push(new Coordinate(x, y + 1));
            adjacentTiles.push(new Coordinate(x + 1, y - 1));
            adjacentTiles.push(new Coordinate(x + 1, y));
            adjacentTiles.push(new Coordinate(x + 1, y + 1));
        }
        adjacentTiles = adjacentTiles.filter((value) => {
            return value.x >= 0 && value.x < this.width && value.y >= 0 && value.y < this.height;
        });
        return adjacentTiles;
    }

    public removeTilesNotMatchingActions(tiles: Array<Coordinate>, actions: Array<ACTIONS>): Array<Coordinate> {
        //filter out tiles if an action in getDisabledActions is in actions
        return tiles.filter((tile) => {
            let cell = this.get(tile);
            if(cell === null) {
                return false;
            }
            let disabledActions = cell.getDisabledActions()
            for (let i = 0; i < actions.length; i++) {
                if (disabledActions.indexOf(actions[i]) !== -1) {
                    return false;
                }
            }
            return true;
        });
    }
}