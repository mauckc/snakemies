// TO DO: 20181010

// TO DO: 20181009

// Debug task: Why are the enemies outputing 'unnamed' below 'enemy' in text?
// 		What should that be?
//

// Use 180 degree rotation matrix to choose where to spawn new enemies when the snake eats
//  this may requre adding parameters tto the enemy class

// Loading Menu Screen
// Implement Game Over etc
//score file
//grabbing nums from various game entities
//output score etc to top left 
//output # of enemies on top right
//i have a really bad headache so let's make it easier to look at.

// Hi Scores?

let snake;
let rez = 1;
let food;
let w;
let h;
let spawntimer = 0;
let fps = 30;
let foodxsize = 20;
let foodysize = 20;
let isFoodSpecial = false;
let derandomizer = 0;

let unit;
var count;
var enemies = [];
var index = 0;
let inputDelay = 0;
let end = false;

// an HTML range slider
var slider;

function setup() {
  createCanvas(800, 800);
  resetSketch();
  var button = createButton('reset');
  button.mousePressed(resetSketch);
  // Set up slider with range between 0 and 255 with starting value of 127
  slider = createSlider(0, 255, 127);
}

function resetSketch() {
  end = false;
  enemies = [];
  w = floor(width / rez);
  h = floor(height / rez);
  unit = floor(width / 2.0);
  frameRate(fps);
  snake = new Snake();
  spawnFood();

  // Create Array of Enemies
  noStroke();
  // var wideCount = width / unit;
  // var highCount = height / unit;
  // count = wideCount * highCount;
  // index for each enemy
  
  for (var mu = 0; mu < 2; mu++) {
    enemies[index++] = new Enemy(index);
  }
}

function spawnFood() {
  if(random(derandomizer, 20) > 17){
    isFoodSpecial = true;
    derandomizer = 0;
  } else{
    isFoodSpecial = false;
    derandomizer++;
  }
	foodLocation();
}

function foodLocation() {
  let x = (10/rez)*floor(random(1, w/(10/rez)));
  let y = (10/rez)*floor(random(1, h/(10/rez)));
  food = createVector(x, y);
}

function keyPressed() {
  if (inputDelay == 0) {
    inputDelay = 1;
    if (keyCode === LEFT_ARROW && snake.xdir != 10) {
      snake.setDir(-10, 0);
    } else if (keyCode === RIGHT_ARROW && snake.xdir != -10) {
      snake.setDir(10, 0);
    } else if (keyCode === DOWN_ARROW && snake.ydir != -10) {
      snake.setDir(0, 10);
    } else if (keyCode === UP_ARROW && snake.ydir != 10) {
      snake.setDir(0, -10);
    } else if (key == ' ') {
      snake.grow();
    }
  }
}

function draw() {
  if (end){
    background(slider.value());
    textAlign(floor(width/2))
    text("GGEZ",200,200);

  }
  
  //regular draw
  else{
    scale(rez);
    background(slider.value());

    // Snake
    if (snake.eat(food)) {
      spawnFood();
      index++;
      enemies.push(new Enemy(index));
    }
    snake.update();
    snake.show();

    // Enemies
    enemies.forEach(enemy => {
      enemy.show();
      enemy.move();
      enemy.update();
      if (snake.endGame(enemy)){
            end = true;
          }

    })

    // Food
    noStroke();
    if(isFoodSpecial){
      fill("#0ebaba");
    } else {
    fill("#0eba0e");
    }
    rect(food.x, food.y, foodxsize, foodysize);
    text("food", food.x + 18, food.y + 20, 50, 50);

    // update the input pause until next frame
    inputDelay = 0;
  }
}

