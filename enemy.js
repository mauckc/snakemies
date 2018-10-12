// TO DO: 20181009

// Use 180 degree rotation matrix to choose where to spawn new enemies when the snake eats
//  this may requre adding parameters tto the enemy class

class Enemy {

  constructor(index) {
    this.x = floor(random(w));
    this.y = floor(random(h));
    
    this.spawnXDiff = this.x - snake.body[0].x;
    this.spawnYDiff = this.y - snake.body[0].y;

    this.forbiddenRange = 200;
    //check if the enemy is too close to the snake
    if (abs(this.spawnXDiff) < this.forbiddenRange && abs(this.spawnYDiff) < this.forbiddenRange) {
      if (abs(this.spawnXDiff) > abs(this.spawnYDiff)) {
        this.xIsPreferredAxis = true;
      } else this.xIsPreferredAxis = false;
      if (this.xIsPreferredAxis) {
        if (this.spawnXDiff > 0) {
          //wants to move to the right
          if (this.x + this.forbiddenRange < w) {
            //moving to the right
            this.x += this.forbiddenRange;
          } 
          else if (this.spawnYDiff > 0) {
            //tried moving to the right, but ooB. Upwards is preferred.
            if (this.y + this.forbiddenRange < h) {
              //moving up
							this.y += this.forbiddenRange;
            }
            else {
              //tried moving up, but out of bounds, moving downwards.
              this.y -= this.forbiddenRange;
            }
          }
          else {
            //tried moving to the right, but ooB. Downwards is preferred.
            if (this.y - this.forbiddenRange > 0) {
              //moving up
							this.y -= this.forbiddenRange;
            }
            else {
              //tried moving down, but out of bounds, moving upwards.
              this.y += this.forbiddenRange;
            }
          }
        }
        else {
          //wants to move to the left
          if (this.x - this.forbiddenRange > 0) {
            //moving to the left
            this.x -= this.forbiddenRange;
          } 
          else if (this.spawnYDiff > 0) {
            //tried moving to the left, but ooB. Upwards is preferred.
            if (this.y + this.forbiddenRange < h) {
              //moving up
							this.y += this.forbiddenRange;
            }
            else {
              //tried moving up, but out of bounds, moving downwards.
              this.y -= this.forbiddenRange;
            }
          }
          else {
            //tried moving to the left, but ooB. Downwards is preferred.
            if (this.y - this.forbiddenRange > 0) {
              //moving up
							this.y -= this.forbiddenRange;
            }
            else {
              //tried moving down, but out of bounds, moving upwards.
              this.y += this.forbiddenRange;
            }
          }
        }
      }
      else{
        if (this.spawnYDiff > 0) {
          //wants to move up
          if (this.y + this.forbiddenRange < h) {
            //moving up
            this.y += this.forbiddenRange;
          } 
          else if (this.spawnXDiff > 0) {
            //tried moving up, but ooB. right is preferred.
            if (this.x + this.forbiddenRange < w) {
              //moving right
							this.x += this.forbiddenRange;
            }
            else {
              //tried moving right, but out of bounds, moving left.
              this.x -= this.forbiddenRange;
            }
          }
          else {
            //tried moving up, but ooB. left is preferred.
            if (this.x - this.forbiddenRange > 0) {
              //moving left
							this.x -= this.forbiddenRange;
            }
            else {
              //tried moving left, but out of bounds, moving right.
              this.x += this.forbiddenRange;
            }
          }
        }
        else {
          //wants to move down
          if (this.y - this.forbiddenRange > 0) {
            //moving down
            this.y -= this.forbiddenRange;
          } 
          else if (this.spawnXDiff > 0) {
            //tried moving down, but ooB. right is preferred.
            if (this.x + this.forbiddenRange < w) {
              //moving right
							this.x += this.forbiddenRange;
            }
            else {
              //tried moving right, but out of bounds, moving left.
              this.x -= this.forbiddenRange;
            }
          }
          else {
            //tried moving to the down, but ooB. left is preferred.
            if (this.x - this.forbiddenRange > 0) {
              //moving up
							this.x -= this.forbiddenRange;
            }
            else {
              //tried moving left, but out of bounds, moving right.
              this.x += this.forbiddenRange;
            }
          }
        }
      }
    }
    this.speed = floor(random(1, 10));
    this.color = color(186, 14, 14);
    this.direction = 0;
    this.chaseTimer = 0;
    this.index = index;
  }

  // Runs every frame
  update() {
    // Boundary Conditions
    // Check if snake has hit edge of unit boundaries
    if (this.x > w || this.x < 0) {
      if (this.direction == 1) {
        this.direction = 2;
        this.move();
      } else {
        this.direction = 1;
        this.move();
      }
    }
    // Check if Enemy has hit the y boundary of the unit
    if (this.y > h || this.y < 0) {
      if (this.direction == 3) {
        this.direction = 4;
        this.move();
      } else {
        this.direction = 3;
        this.move();
      }
    }
    // Update the x direction
    //this.x = this.x + this.xDir;
    //this.y = this.y + this.yDir;
    if (this.chaseTimer > 60) {
      // Reset chase timer to T-minus 30-90 frames
      this.chaseTimer = floor(random(-30, 30));

      // Calculate distance between enemy and snake head
      this.xDiff = this.x - snake.body[0].x;
      this.yDiff = this.y - snake.body[0].y;
      // Update the enemy direction based on the sign of Diff for x or y
      if (abs(this.xDiff) > abs(this.yDiff)) {
        if (this.xDiff >= 0) {
          this.direction = 1;
        } else {
          this.direction = 2;
        }
      } else {
        if (this.yDiff >= 0) {
          this.direction = 3;
        } else {
          this.direction = 4;
        }
      }
    } else {
      // Iterate chase timer
      this.chaseTimer++;
    }
  }

  // Custom method for showing the Enemy
  show() {
    fill(this.color);
    noStroke();
    // Enemy text  
    text("enemy " + this.index, this.x + 18, this.y + 20, 50, 50);
    // Enemy body rect(x, y, sizex, sizey)
    rect(this.x, this.y, 20, 20);
  }

  // Move relative to speed
  move() {
    // Check which way enemy is headed and update the speed
    if (this.direction == 1) {
      this.x = this.x - this.speed;
    } else if (this.direction == 2) {
      this.x = this.x + this.speed;
    } else if (this.direction == 3) {
      this.y = this.y - this.speed;
    } else {
      this.y = this.y + this.speed;
    }
  }
}