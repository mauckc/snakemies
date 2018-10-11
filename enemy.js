// TO DO: 20181009

// Use 180 degree rotation matrix to choose where to spawn new enemies when the snake eats
//  this may requre adding parameters tto the enemy class

class Enemy {
  
  constructor(index) {
    this.x = floor(random(w));
    this.y = floor(random(h));
    this.speed = floor(random(1 ,10));
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
      if(this.direction == 1) {this.direction = 2; this.move();}
      else{this.direction = 1; this.move();}
    }
    // Check if Enemy has hit the y boundary of the unit
    if (this.y > h || this.y < 0) {    
      if(this.direction == 3) {this.direction = 4; this.move();}
      else{this.direction = 3; this.move();}
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
    text("enemy "+ this.index, this.x + 18, this.y + 20, 50, 50);
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