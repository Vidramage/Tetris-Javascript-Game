//grabs the canvas element
const canvas = document.getElementById('tetris');
//sets rendering method to 2d
const context = canvas.getContext('2d');

//scales the canvas up by this many units (x- horizontal direction, y- vertical direction)
context.scale(20, 20);

function arenaSweep() {
  let rowCount = 1;
  outer: for (let y = arena.length - 1; y > 0; --y) {
    for (let x = 0; x < arena[y].length; ++x) {
      if (arena[y][x] === 0) {
        continue outer;
      }
    }
    const row = arena.splice(y, 1)[0].fill(0);
    arena.unshift(row);
    ++y;
    player.score += rowCount * 10;
    rowCount *= 2;
  }
}

function collide(arena, player) {
  const [m, o] = [player.matrix, player.pos];
  for (let y = 0; y < m.length; ++y) {
    for (let x = 0; x < m.length; ++x) {
      if (m[y][x] !== 0 &&
        (arena[y + o.y] &&
          arena[y + o.y][x + o.x]) !== 0) {
            return true;
          }
        }
      }
      return false;
    }

function createMatrix(w, h) { //create a map of array values that can be easily accessed, updated, checked, etc... This matrix function when called and is passed a width and a height in parameters (w,h) will create multiple arrays where the amount of total arrays created will equal the value at the index of the specified y value, and the amount of the individual numbers in each of the array's will equal the value of the specified width. This not only provides a 'checker-board' like array map for us to run and draw/update our game pieces on, but it also provides us with very easily accessible data, easy conditional checks, and flexible methods for massaging the data.
// creating and executing functions that may utilize smaller modular methods, functions, and passed data to create an end-user gameplay experience that will be similar to the gameplay of the original 'Tetris'. User input is captured in the form of predefined game controls, which are set to execute specific functionality based on which button is being pressed, and at what specific time in a millisecond loop, as when the key is pressed during an updating loop will determine how much longer, in milliseconds, the user must wait before the game will accept additional commands. The control keys, when pressed trigger functionality specific to the control and the user/player.
//We will create and strategically execute functions in to duplicate a working 'tetris' game built with ES6. This game will have a set of rules that will prevent unwanted authorization or execution. This kind of programming structure allows us to very easily access all of our data without a lot of manipulation and do what we want with it. This created matrix will provide us with a great data structure, along with robust and elegant methods to access, check, and update data while our game is playing in real time. We will easily be able to store objects and data in memory, and access them easily in other functions and modules to create desired results.
  const matrix = []; // set matrix equal to an empty array to push array 0 values. Matrix array to push new data for as long as height doesn't exist or is not 0.
  //while height(h) is not 0 push
  while (h--) {
    matrix.push(new Array(w).fill(0)); //a new array full of only 0 number values. The amount of all 0 numbers in each individual array is equal to the number you use to specify the width in the parameters when calling the function createMatrix(w, h);
  }
  return matrix; // return the matrix which is the array of values containing any and all data pushed while height doesn't equal 0.
}


function createPiece(type) {
  if (type === 'T') {
    return [
      //represent the matrix in an environment that can be utilized in 2d atmosphere
      [0, 0, 0],
      [1, 1, 1],
      [0, 1, 0],
    ];
  } else if (type === 'O') {
    return [
      [2, 2],
      [2, 2],
    ];
  } else if (type === 'L') {
    return [
      [0, 3, 0],
      [0, 3, 0],
      [0, 3, 0],
    ];
  } else if (type === 'J') {
    return [
      [0, 4, 0],
      [0, 4, 0],
      [0, 4, 0],
    ];
  } else if (type === 'I') {
    return [
      [0, 5, 0, 0],
      [0, 5, 0, 0],
      [0, 5, 0, 0],
    ];
  } else if (type === 'S') {
    return [
      [0, 6, 6],
      [6, 6, 0],
      [0, 0, 0],
    ];
  } else if (type === 'Z') {
    return [
      [7, 7, 0],
      [0, 7, 7],
      [0, 0, 0],
    ];
  }
}

//executes the filling of each space of the matrix, where the value is 1 and starting at the position defined by the coordinate options 'player.pos'
function draw() {
  //property on the Canvas 2d API which specifies the color to use inside shapes. Default is #000 (black).
  context.fillStyle = '#000';
  //property on the Canvas 2d API which specifies to fill the rectangle the size of the width and height in pixels of the canvas element at coordinates (x-0,y-0)
  context.fillRect(0, 0, canvas.width, canvas.height);
  drawMatrix(arena, {x: 0, y: 0});
  drawMatrix(player.matrix, player.pos);
}

//wrap the rendering of this specific matrix in a drawMatrix function. drawMatrix loops over the array matrix, gets the row, and y index values, and passes them as parameters for the next function that runs. The next function that is executed loops over each row, and returns us a value and x  rows array and , giving us the value and x index. At this point whatever the value is at that index is available to use. We check if the value is anything but 0, and then if it is render the rectangle. This kind of schema allows us to put our code into smaller modules in a more cohesive data structure. Makes entire game easier to understand reading it from a coding standpoint along with understanding the flow of execution scope as it relates to the game in it's obvious lexically environment and execution based, object oriented programming pattern scope. Add support for offseting by passing it as a parameter. This will allow us to set offset values that will allow us to move the piece later.
function drawMatrix(matrix, offset) {
  //loops over matrix array data
  matrix.forEach((row, y) => { //loops over each array in the set of arrays in matrix array and returns us the row as each array, and the value of y which is initialized at 0
    row.forEach((value, x) => {
      if (value !== 0) {
        context.fillStyle = colors[value];
        // below is the support for offsets which allow us to move the piece later. fillRect is a method on the Canvas 2D API which will draw us a filled rectangle with the starting point of coordinates (x, y) as represented as the first two parameters... and the size of the rectangle specified by a width and height values as the last two parameters. Esentially fills a rectangle starting at the location of the first two coordinates (x,y).The size of the rectangle is determined by the width (3rd parameter as a number) and height (4th parameter as a number) in pixels.
        // The values being passed act as the following when being executed: First parameter passed to fillRect takes in a number which is the amount of pixels over from the left are skipped before starting to render and/or fill the rectangle at initial location. The second parameter passed to fillRect takes in a number which is the amount of pixels from the top of the current location(x) that are skipped before starting to fill our rectangle. The starting point is determined by the coordinates, and where it ends is determined by the size of it (which is set by width and height pixels passed as the last two parameters).
        context.fillRect(x + offset.x,
                         y + offset.y,
                         1, 1);
      }
    })
  })
}

//copies all values of the player into the arena at the correct position.
function merge(arena, player) { //values passed to this function are the arena and player objects
  player.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        arena[y + player.pos.y][x + player.pos.x] = value;
      }
    })
  })
}

function playerDrop() {
  player.pos.y++; // move the player down on the y-axis one space
  if (collide(arena, player)) { // if collision returns true we know we have hit existing values... or if we drop and collide it means we are touching the ground or another piece then proceed to...
    player.pos.y--; // subtract 1 from the player position y coordinate, which moves the player back up one position up on the y-axis and then we merge
    merge(arena, player);
    playerReset(); // the arena and player are passed to the merge function which will produce updated values in the matrix. Correct each and every individual arena value and pass to the arena as a 'screenshot' so-to-speak of the values that should be rendered on collision(meaning when to have pieces stick and not disappear on collision).
    arenaSweep();
    updateScore();
  }
  dropCounter = 0; // reset the current counting milliseconds
}

function playerMove(dir) { //bind dir parameter which evaluates to 1 or -1 based on key pressed
  player.pos.x += dir; // adds or subtracts the value of x (position of player) on the arena and set the updated value. Depending on if the right or left key was pressed it will pass in a 1 or -1 and set that equal to the updated position. The direction variable that effects the outcome of this value is based on if the right or left key was pressed and set dynamically. Moving right or hitting the right arrow key will add the value of the direction which is 1, to the current horizontal coordinate of the player. Opposite way for the other arrow and direction.
  if (collide(arena, player)) { //if the player collides with arena or existing value (other pieces).
    player.pos.x -= dir; // if we collide then set the position of the player (on the x-axis) minus one at the exact point of collision. This prevents the position from advancing any further than where we collide (on the arena or with other pieces); restricts further left and right movement after collision between player and arena.
  }
}

function playerReset() {
  const pieces = 'ILJOTSZ';
  player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
  player.pos.y = 0;
  player.pos.x = (arena[0].length / 2 | 0) -
                 (player.matrix[0].length / 2 | 0);
  if (collide(arena, player)) {
    arena.forEach(row => {row.fill(0)});
    player.score = 0;
    updateScore();
  }
}

function playerRotate(dir) {
  const pos = player.pos.x;
  let offset = 1;
  rotate(player.matrix, dir);
  while (collide(arena, player)) {
    player.pos.x += offset;
    offset = -(offset + (offset > 0 ? 1 : -1));
    if (offset > player.matrix[0].length) {
      rotate(player.matrix, -dir);
      player.pos.x = pos;
      return;
    }
  }
}


function rotate(matrix, dir) {
  for (let y = 0; y < matrix.length; ++y) {
    for (let x = 0; x < y; ++x) {
      [
        matrix[x][y],
        matrix[y][x],
      ] = [
        matrix[y][x],
        matrix[x][y],
      ];
    }
  }

  if (dir > 0) {
    matrix.forEach(row => row.reverse());
  } else {
    matrix.reverse();
  }

}

let dropCounter = 0;
let dropInterval = 1000;

let lastTime = 0;
//Draw the game continuously with update function to allow unit to drop. Get time from requestAnimationFrame and set default to 0.
function update(time = 0) {
  const deltaTime = time - lastTime;
  lastTime = time;
  dropCounter += deltaTime;
  if (dropCounter > dropInterval) {
    playerDrop();
  }
  draw();
  requestAnimationFrame(update); //calls this function and supplies update to itself
}

function updateScore() {
  document.getElementById('score').innerText = player.score;
}

const colors = [
  null,
  '#FF0D72',
  '#0DC2FF',
  '#0DFF72',
  '#F538FF',
  '#FF8E0D',
  '#FFE138',
  '#3877FF',
];

const arena = createMatrix(12,20); //initializes the width and height parameters of our arena and sets in memory to const arena to be passed around.


const player = {
  //create player object with values of ps or position value set to value of coordinates x = 5, and y = 5 on the grid and the
  pos: {x: 0, y: 0},
  matrix: null,
  score: 0,
}

document.addEventListener('keydown', event => {
  if (event.keyCode === 37) {
    playerMove(-1);
  } else if (event.keyCode === 39) {
    playerMove(1);
  } else if (event.keyCode === 40) {
      playerDrop();
  } else if (event.keyCode === 81) {
    playerRotate(-1);
  } else if (event.keyCode === 87) {
    playerRotate(1);
  }
})

//Initialize the game with update function
playerReset();
updateScore();
update();
