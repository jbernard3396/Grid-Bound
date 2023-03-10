//new 2d array called grid

function  instantiateGrid(width: number, height: number) {
    var grid = new Array(width);
    for (var i = 0; i < grid.length; i++) {
        grid[i] = new Array(height);
    }
    return grid;
}

module.exports = {instantiateGrid};