"use strict";

class Paddle 
{
  //Constructor for assigning variables
  constructor(x, h, blankSpace) 
  {
    this.posX = x;
    this.posY = height/2;
    this.width = 25;
    this.height = h;
    this.speed = 8;
    this.gap = blankSpace;
  }
    
  draw()
  {
    //Draws paddle relative to parameters
    stroke(0);
    fill(0);
    rect(this.posX, this.posY - (this.height/2), this.width, this.height);
    
    //Controls for moving paddle
    if (keyIsDown(UP_ARROW)) 
    {
      this.posY -= this.speed;
    } 
    if (keyIsDown(DOWN_ARROW)) 
    {
      this.posY += this.speed;
    }
    
    //Sets up a limit for how far the paddles can go
    if(this.posY + this.height - (this.height/2) > height - this.gap) 
    {
      this.posY = height - this.height + (this.height/2) - this.gap;
    }
    else if(this.posY - (this.height/2) < 0 + this.gap) 
    {
      this.posY = 0 + (this.height/2) + this.gap;
    }
  }
}
