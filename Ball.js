"use strict";

class Ball
{
  //Constructor for assigning variables
  constructor(x, y, s)
  {
    this.posX = x;
    this.posY = y;
    this.size = s;
    this.travelX = 0;
    this.travelY = 0;
    this.drag;
    this.ballType;
  }
  
  draw() 
  {
    //Draws ball relative to parameters
    stroke(90);
    fill(60);
    ellipse(this.posX, this.posY, this.size, this.size);
    
    //Set up for ball movement
    this.posX += this.travelX;
    this.posY += this.travelY;
    
    //Size fluctuation relative to whiteNoise function
    var ballStatic = whiteNoise(0.1);
    this.size = 30 + (ballStatic * 200 * ballAmp);
    
    //Speedcap for ball
    if(ball.travelX > 18 || ball.travelX < -18) 
    {
      this.travelX -= this.travelX * 0.2;
    }
    if(ball.travelY > 10 || ball.travelY < -10) 
    {
      this.travelY -= this.travelY * 0.0001;
    }
    
    //Determines the amount of vertical drag the ball will take duriing movement
    if(this.ballType == 3) 
    {
      this.drag = 0.005;
    }
    else
    {
      this.drag = 0.001;
    }
    
    //Continuously applies vertical drag to ball similar to air hockey 
    if(this.travelY > 0) 
    {
      this.travelY += this.drag;
    }
    if(this.travelY < 0) 
    {
      this.travelY += -this.drag;
    }
  };
  
  initiate() 
  {
    //Starts initial movement of ball depending on what ball type is selected
    if(this.ballType == 1 || this.ballType == 3)
    {
      this.travelX -= 2;
      this.travelY += random(2, -2);
    }
    if(this.ballType == 2)
    {
      this.travelX -= 9;
      this.travelY += random(3, -3);
    }
  };
}