class Snake {
  
  constructor() {
  	this.body = [];
    this.body[0] = createVector(floor(w/2), floor(h/2));
    this.xdir = 0;
    this.ydir = 0;
    this.len = 0;
    this.color = color("#0e0eba");
    this.hunger = 0;
  }
  
  setDir(x, y) {
  	this.xdir = x;
    this.ydir = y;
  }
  
  update() {    
  	let head = this.body[this.body.length-1].copy();
    this.body.shift();
    head.x += this.xdir;
    head.y += this.ydir;
    this.body.push(head);
    
    // Periodic Boundary Conditions
    if (head.x>=w)
    {
      head.x-=w
    }
    if (head.y>=h)
    {
      head.y-=h
    }
     if (head.x<=-2)
    {
      head.x+=w
    }
    if (head.y<=-2) 
    {
      head.y+=h
    }
  }
  
  grow() {
  	let head = this.body[this.body.length-1].copy();
    this.len++;
    this.body.push(head);
  }
  
endGame(enem) {
  	let x = this.body[this.body.length-1].x;
    let y = this.body[this.body.length-1].y;

    let enemyxpos = enem.x;
    let enemyypos = enem.y;

    if ( (enemyxpos - 10 < x && x < enemyxpos + 20) && (enemyypos - 10 < y && y < enemyypos+20) ) {
       return true;
    }
    for(let i = 0; i < this.body.length-1; i++) {
    	let part = this.body[i];
      if(part.x == x && part.y == y) {
      	return true;
      }
    }
    return false;
  }
  
  eat(pos) {
  	let x = this.body[this.body.length-1].x;
    let y = this.body[this.body.length-1].y;
    
    if((pos.x <= x && x < pos.x + foodxsize) && (pos.y <= y && y < pos.y + foodysize)) {
      this.grow();
      this.hunger = 0;
      return true;
    }
    // Snake gets hungrier everytime it tries to eat and fails
    this.hunger++;
    return false;
  }
  
  show() {
    noStroke();
    fill(this.color);
    // Make text shake with merlin noise with amplitude directly related
    //  to the snake's hunger
    text("snake", this.body[0].x  + 18, this.body[0].y + 20, 50, 50);
    text(this.hunger, this.body[0].x + 18, this.body[0].y - 20, 50, 50);
  	for(let i = 0; i < this.body.length; i++) {
      rect(this.body[i].x, this.body[i].y, 10, 10);
    }
  }

}
