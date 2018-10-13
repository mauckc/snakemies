//colors
let red = "#990000";
let ocean = "#009999"
let cyan = "#0ebaba";
let lime = "#0eba0e";
//end colors

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
var survival = 0;
// an HTML range slider
var slider;
var sliderDifficulty;

var startingEnemyCount = 2;
var canvas;
var button;

function setup() {
  canvas = createCanvas(window.innerWidth, window.innerHeight);
  //createCanvas(width, height);
  resetSketch();
  button = createButton('reset');
  button.mousePressed(resetSketch);
  // Set up slider with range between 0 and 255 with starting value of 127
  slider = createSlider(0, 255, 200);
  slider.position(25, 25);
  button.position(25, height - 25);
  setInterval(function(){survival++;}, 1000);
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
  index = 0;
  // button.position(25, height - 25);
  // Create Array of Enemies
  noStroke();
  // var wideCount = width / unit;
  // var highCount = height / unit;
  // count = wideCount * highCount;
  // index for each enemy
  
  for (var mu = 0; mu < startingEnemyCount; mu++) {
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
    //} else if (key == ' ') {
      //resetSketch();
    }
    
  }
}

function draw() {
  textSize(20);
  if (end){
    button.show();
    button.size(width/10, height/20);
    button.position(width/2,height/2);
    background(slider.value());
    textAlign(floor(width/2));
    textSize(150);
    text("Game Over",10,400);
    textSize(100)
    if (index-2 == 0){
      fill(red);
      //textAlign(CENTER);
      text("Final Score: "+0,10,550);
    }
    else{
      fill(red);
      text("Final Score: "+(index-2),10,550);
    }
    if (key == ' ') {
      end = false;
      resetSketch();
      // reset button position
      button.position(25, height - 25);
      button.hide();
    }
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
      fill(cyan);
    } else {
    fill("#0eba0e");
    }
    rect(food.x, food.y, foodxsize, foodysize);
    text("food", food.x + 18, food.y + 20, 50, 50);

    // update the input pause until next frame
    inputDelay = 0;
    fill(0);
    textSize(40);
    //20181011 daniel 
    //score thing in top left  
    if (index-2 == 0){
    
    text("Score: "+0,width-155,40);
}
    else{
    text("Score: "+(index-2), width-155,40)
    }
  }
}

window.onresize = function() {
  var w = window.innerWidth;
  var h = window.innerHeight;  
  canvas.size(w,h);
  width = w;
  height = h;
};


// Added Mouse Functionality
function mousePressed()
{
  // Check if in upper right HALF of screen
  if (mouseY - (height/2) > -(mouseX - (width/2))){
    // Check if in the top triangle
    if (mouseY - (height/2) > (mouseX - (width/2))){
    snake.setDir(0,10) // DOWN
    // Else must be in the right triangle
    }else
    {
    snake.setDir(10, 0) // RIGHT
    }
  }else
  { // Else it must be in the bottom left HALF of screen
    if (mouseY - (height/2) < (mouseX - (width/2)))
    {
    snake.setDir(0,-10) // UP
    }else
    {
    snake.setDir(-10, 0) // LEFT
    }
  }
  button.position(25, height - 25);
  button.hide();
}
