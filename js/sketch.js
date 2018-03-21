
var grid
  , cols
  , rows
  , w = 40; 

var totalBees = 10;

function setup() {
    createCanvas(401,401)
    cols = floor(width / w);
    rows = floor(height / w);
    grid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = new Cell(i, j, w)
        }
    }

    // on évite la duplication de mine au même endroit
    var options = [];
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            options.push([i, j])
        }
    }

    // génération des mines
    for (var n = 0; n < totalBees; n++) {
        let index = floor(random(options.length))
          , choice = options[index]
          , i = choice[0]
          , j = choice[1];
        options.splice(index, 1)
        grid[i][j].bee = true;
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].countBees()
        }
    }
}

function gameOver() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j].revealed = true
        }
    }
}

function mousePressed() {
    background(255)
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if (grid[i][j].contains(mouseX, mouseY)) {
                grid[i][j].reveal()

                if (grid[i][j].bee) {
                    gameOver()
                }
            }
        }
    }
}

function draw() {
    background(255)
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].show()
        }
    }
}
function make2DArray(cols, rows) {
    var arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows)
    }
    return arr
}
