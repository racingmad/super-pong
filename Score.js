"use strict";

class Score 
{
  //Constructor for assigning variables
  constructor(x, y, r, g, b)
  {
    this.posX = x;
    this.posY = y;
    this.colour = [r, g, b]; //Array to set up color variable
    this.score = 0;
    //2D Array set up determin what number it is and what lines should be activated relative to that
    //Order is set up as: Top, Top Left, Top Right, Middle, Bottom Left, Bottom Right, Bottom.
    this.units = [[1, 1, 1, 0, 1, 1, 1],
                  [0, 0, 1, 0, 0, 1, 0],
                  [1, 0, 1, 1, 1, 0, 1],
                  [1, 0, 1, 1, 0, 1, 1],
                  [0, 1, 1, 1, 0, 1, 0],
                  [1, 1, 0, 1, 0, 1, 1],
                  [1, 1, 0, 1, 1, 1, 1],
                  [1, 0, 1, 0, 0, 1, 0],
                  [1, 1, 1, 1, 1, 1, 1],
                  [1, 1, 1, 1, 0, 1, 1]];
  }
  
  draw() {
    //Sets colour relative to parameters
    stroke(this.colour[0], this.colour[1], this.colour[2]);
    fill(this.colour[0], this.colour[1], this.colour[2]);
    strokeWeight(5);
    
    //Draws appropriate lines relative to the value of this.score ranging from 0 to 9
    for(var i = 0; i < this.units[this.score].length; i++)
    {
      if(this.units[this.score][i] == 1) {
        if(i == 0)
        {
          line(5 + this.posX, 0 + this.posY, 50 + this.posX, 0 + this.posY);
        }
        else if(i == 1)
        {
          line(0 + this.posX, 5 + this.posY, 0 + this.posX, 50 + this.posY);
        }
        else if(i == 2)
        {
          line(55 + this.posX, 5 + this.posY, 55 + this.posX, 50 + this.posY);
        }
        else if(i == 3)
        {
          line(5 + this.posX, 55 + this.posY, 50 + this.posX, 55 + this.posY);
        }
        else if(i == 4)
        {
          line(0 + this.posX, 60 + this.posY, 0 + this.posX, 105 + this.posY);
        }
        else if(i == 5)
        {
          line(55 + this.posX, 60 + this.posY, 55 + this.posX, 105 + this.posY);
        }
        else if(i == 6)
        {
          line(5 + this.posX, 110 + this.posY, 50 + this.posX, 110 + this.posY);
        }
      }
    }
  }
}