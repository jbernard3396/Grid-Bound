import { Cell } from './cell/cell';
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
    RangeIndicator(coordinate: Coordinate, radius: number, RangeType: RangeTypes, actions: Array<ACTIONS> = []): Array<Coordinate> {
        if (radius < 0) {
            throw new Error("Radius must be positive");
        }
        if (coordinate.x < 0 || coordinate.x >= this.width || coordinate.y < 0 || coordinate.y >= this.height) {
            throw new Error("Out of bounds grid access: " + coordinate.x + ", " + coordinate.y);
        } 
        return this.floodFill(coordinate, radius, actions, RangeType);
        
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
            let disabledActions = cell.getDisabledActions()
            for (let i = 0; i < actions.length; i++) {
                if (disabledActions.indexOf(actions[i]) !== -1) {
                    return false;
                }
            }
            return true;
        });
    }

    private floodFill(coordinate: Coordinate, radius:number, actions: Array<ACTIONS> = [], RangeType: RangeTypes = RangeTypes.SQUARE): Array<Coordinate> {
        let tiles = new Array<Coordinate>();
        let queue = new Array<Coordinate>();
        let visited = new Array(this.width);
        for (let i = 0; i < this.width; i++) {
            visited[i] = new Array(this.height);
            for (let j = 0; j < this.height; j++) {
                visited[i][j] = 0;
            }
        }
        queue.push(coordinate);
        for( var i = 0; i <= radius; i++) {
            let queueLength = queue.length;
            for (var j = 0; j < queueLength; j++) {
                let currentCoordinate = queue.shift()!;
                visited[currentCoordinate.x][currentCoordinate.y] += 1;
                // console.log(visited[currentCoordinate.x][currentCoordinate.y])
                // console.log(this.get(currentCoordinate).getCellStats().movementPenalty)
                if(visited[currentCoordinate.x][currentCoordinate.y] == this.get(currentCoordinate).getCellStats().movementPenalty +1) {
                    tiles.push(currentCoordinate);
                }
                let adjacentTiles = this.getAdjacentTiles(currentCoordinate, RangeType);
                adjacentTiles = this.removeTilesNotMatchingActions(adjacentTiles, actions);
                adjacentTiles.forEach((tile) => {
                    if (visited[tile.x][tile.y] === this.get(tile).getCellStats().movementPenalty) {
                        queue.push(tile);
                    } else if (visited[tile.x][tile.y] < this.get(tile).getCellStats().movementPenalty) {
                        queue.unshift(currentCoordinate);
                        visited[tile.x][tile.y] += 1;
                    }
                });
            }
        }
        return tiles;
    }
}