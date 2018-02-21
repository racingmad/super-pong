// Variables for Game State
var ballStart = false;
var failEnvTriggered = false;
var extraCount = 0;
var overallScore = 0;
var ballDirection = 0;

//Variables for main menu
var ballSelect = 1;
var canvasHeight = 550;
var titlePosY = canvasHeight;
var textOffset = 32;
var count = 0;

//Sets up initial state
var state = mainMenu;

function setup() 
{
  //Canvas is created with dynamic height variable to determine starting position of Main Title text
  createCanvas(815, canvasHeight);
  
  //Function activates audio to allow for sound system
  initiateAudio();
  
  //Each object is generated for game
  paddle1 = new Paddle(10, 100, 10);
  paddle2 = new Paddle(width - 35, 100, 10);
  ball = new Ball(width/2, height/2, 30);
  scoreUnit1 = new Score((width/2) + 40, 30, 70, 70, 70);
  scoreUnit2 = new Score((width/2 - 55) - 40, 30, 70, 70, 70);
  
  //Transparency Enabled
  colorMode(RGB, 255, 255, 255, 1);
}

function mainMenu()
{
  background(0, 130, 130);
  strokeWeight(1); //Used to keep menu font thickness consistent
  
  //Functions that operate during Main Menu State
  titleAnim();
  menuButtons();
}

function titleAnim()
{
  //Used to make title big, clear and distinctive
  textSize(40);
  //Variables set up to determine how intense the animation slowdown is over time
  var slowIntensity = 0;
  var numCap = 0;
  
  //Loop to check the overall value cap to determine what values are added to the slowIntensity variable
  for(x = 8; x > 0; x--)
  {
    //Different conditions are used for each cap
    if(titlePosY <= (height/2 - 70)) 
    {
      numCap = 8;
    }
    else if(count >= 80) 
    {
      numCap = 7;
    }
    else if(count >= 70) 
    {
      numCap = 6;
    }
    else if(count >= 60) 
    {
      numCap = 5;
    }
    else if(count >= 40) 
    {
      numCap = 4;
    }
    else if(count >= 20) 
    {
      numCap = 3;
    }
    else if(count >= 10) 
    {
      numCap = 2;
    }
    else if(count >= 5) 
    {
      numCap = 1;
    }
    
    //Value is added to total if it is below or equal to the cap
    if(x <= numCap) 
    {
      slowIntensity += x;
    }
  }
  //count increments through each frame of main menu
  count++;
  
  //Text displayed with animation
  text("SUPER PONG", (width/2) - 140, titlePosY);
  titlePosY -= ((36 - slowIntensity)/7);
}

function menuButtons() 
{
  //Buttons only appear when title animations done 
  if(titlePosY <= (height/2 - 70)) 
  {
    textSize(16);
    stroke(0);
    noFill();
    
    //Button is highlighted red depending on which is clicked and in turn, which ballSelect value is displayed
    //Corresponding buttons have no fill
    if(ballSelect == 1)
    {
      fill(200, 0, 0);
      rect((width/4) - textOffset - 10, (height/2) + 20, 70, 30);
      noFill();
    }
    else
    {
      rect((width/4) - textOffset - 10, (height/2) + 20, 70, 30);
    }
    
    if(ballSelect == 2)
    {
      fill(200, 0, 0);
      rect((width/2) - textOffset - 10, (height/2) + 20, 82, 30);
      noFill();
    }
    else
    {
      rect((width/2) - textOffset - 10, (height/2) + 20, 82, 30);
    }
    if(ballSelect == 3)
    {
      fill(200, 0, 0);
      rect((width/2) + (width/4) - textOffset - 10, (height/2) + 20, 85, 30);
      noFill();
    }
    else
    {
      rect((width/2) + (width/4) - textOffset - 10, (height/2) + 20, 85, 30);
    }
    
    //Start Button is filled Yellow
    fill(150, 150, 0);
    rect((width/2) - 30, (height/2) + 110, 55, 30);
    
    //Text is displayed to overlap Buttons
    fill(0);
    text("Normal", (width/4) - textOffset, (height/2) + 40);
    text("Fast Ball", (width/2) - textOffset, (height/2) + 40);
    text("Curveball", (width/2) + (width/4) - textOffset, (height/2) + 40);
    text("Start", (width/2) - 20, (height/2) + 130);
  }
}

function gameState()
{
  background(185);
  //The ballSelect variable is transferred to the ballType variable of the ball object to influence it's behaviour overall 
  ball.ballType = ballSelect;
  //Determines overall score plus the extra count if the score is over 99 to prevent score from stopping
  overallScore = (scoreUnit2.score * 10) + scoreUnit1.score + extraCount;
  
  //Draws Background
  boardBackground();
  boardSplit();

  //Draws custom score system
  drawScore();
  
  //Appears When ball is not moving
  if(ballStart == false)
  {
    //Text to teach player controls before starting
    stroke(0);
    fill(0);
    strokeWeight(1);
    textSize(24);
    text("Press Space  to Start!", width/2 - 140, height/2 + 40);
    text("Use Arrow Keys to move", width/2 - 145, height/2 + 80);
  }
  
  //Functions to operate game
  directionCheck();
  ballCollision();
  ballStatic();
  gameBorder();
  paddle1.draw();
  paddle2.draw();
  
  //Checks if ball is out of bounds
  endGameCheck();
}

function gameBorder() 
{
  //Draws Top and Bottom borders
  noFill()
  stroke(0);
  strokeWeight(5);
  line(0, 0, width - 2, 0);
  line(0, height - 2, width - 2, height - 2);
}

function boardBackground() {
  //Makes the background barely visible as to not detract from the game
  stroke(0, 0, 0, 0.0375);
  strokeWeight(2);
  //Size of grid is adjusted with gridSize variable
  var gridSize = 30;
  //Nested loop fills screen with barely visible grid for texture
  for(x = gridSize; x < width + gridSize; x+= gridSize)
  {
    line(x, 0, x, height);
    for(y = gridSize; y < height; y+= gridSize)
    {
      line(x-gridSize, y, x, y);
    }
  }
}

function boardSplit() 
{
  //Creates a dashed line in centre of screen to determine half way point
  strokeWeight(5);
  stroke(0);
  
  for(i = 8; i < height; i+= 70) {
    line(width/2, i, width/2, i+40)
  }
}

function drawScore() 
{
  //If statement used to increment score properly
  if(scoreUnit1.score > 9)
  {
    if(scoreUnit2.score == 9) 
    {
      //Keeps displayed score as 99 as that's the max score on screen and increments excess score
      scoreUnit1.score = scoreUnit2.score = 9;
      extraCount++;
    }
    else 
    {
      //Resets unit 1 to 0 and increments unit 2
      scoreUnit1.score = 0;
      scoreUnit2.score += 1;
    }
  }
  //Draws score units on screen
  scoreUnit1.draw();
  scoreUnit2.draw();
}

function directionCheck() {
  
  influenceIntensity = 1.5; //Influence is relative to vertical travel speed
  
  //Transfers current travel in the y-axis relative to the influence Intensity
  speedTransfer = ball.travelY * influenceIntensity;
  
  //Each paddle has a mapped directional influence depending on the direction the ball is travelling on the y-axis 
  //and what position of the paddle the ball hits
  if(ball.posX <= (width/2) && ball.travelY >= 0) {
    ballDirection = map(ball.posY, paddle1.posY + (paddle1.height/2), paddle1.posY - (paddle1.height/2), 
                        1.0 * speedTransfer, -1.0 * speedTransfer);
  }
  else if(ball.posX <= (width/2) && ball.travelY < 0) {
    ballDirection = map(ball.posY, paddle1.posY + (paddle1.height/2), paddle1.posY - (paddle1.height/2), 
                        -1.0 * speedTransfer, 1.0 * speedTransfer);
  }
  else if(ball.posX > (width/2) && ball.travelY >= 0) {
    ballDirection = map(ball.posY, paddle2.posY + (paddle2.height/2), paddle2.posY - (paddle2.height/2), 
                        1.0 * speedTransfer, -1.0 * speedTransfer);
  }
  else if(ball.posX > (width/2) && ball.travelY < 0) {
    ballDirection = map(ball.posY, paddle2.posY + (paddle2.height/2), paddle2.posY - (paddle2.height/2), 
                        -1.0 * speedTransfer, 1.0 * speedTransfer);
  }
}

function ballStatic()
{
  //Static relative to white noise; I had to set back on direct influence as sound works differently to visual
  if(ball.posX < width || ball.posX > 0)
  {
    ball.draw();
    //Static gets more intence as ball approches either paddle
    if(ball.posX <= (width/2)) {
      ballAmp = map(ball.posX, (width/2), paddle1.posX, 0.2, 1);
    }
    if(ball.posX > (width/2)) {
      ballAmp = map(ball.posX, ((width/2)+1), paddle2.posX, 0.2, 1);
    }
  }
}

function ballCollision() 
{
  //Ball gets faster upon each hit
  if(ball.posX < 0 || ball.posX > width) 
  {
    ball.travelX *= 1.1;
  }
  
  //Collision with paddle 1
  if(ball.posX <= paddle1.posX + paddle1.width
  && ball.posX >= paddle1.posX
  && ball.posY <= paddle1.posY + (paddle1.height/2)
  && ball.posY >= paddle1.posY - (paddle1.height/2)) 
  {
    //Sound related to paddle is triggered
    paddleEnv.trigger();
    paddleEnv2.trigger();
    
    //Resets ball momentum
    ball.posX = paddle1.posX + paddle1.width;
    
    //Sets new overall travel speed for ball
    ball.travelX *= -1.1;
    ball.travelY += ballDirection;
    
    //Increments Score
    scoreUnit1.score += 1;
    
  }
  
  //Collision with paddle 2
  if(ball.posX >= paddle2.posX
  && ball.posX <= paddle2.posX + paddle2.width
  && ball.posY <= paddle2.posY + (paddle2.height/2)
  && ball.posY >= paddle2.posY - paddle1.height/2) 
  {
    //Sound related to paddle is triggered
    paddleEnv.trigger();
    paddleEnv2.trigger();
    
    //Reset's ball momentum
    ball.posX = paddle2.posX;
    
    //Sets new overall travel speed for ball
    ball.travelX *= -1.1;
    ball.travelY += ballDirection;
    
    //Increments Score
    scoreUnit1.score += 1;
  }
  
  //Boundary System for top and bottom barriers
  if(ball.posY - (ball.size/2) <= 0) 
  {
    ball.posY = ball.size/2;
    ball.travelY *= -1;
  }
  if(ball.posY + (ball.size/2) >= height) 
  {
    ball.posY = height - (ball.size/2);
    ball.travelY *= -1;
  }
}

function endGameCheck()
{
  //Checks if ball is outside screen to activate game over condition
  if(ball.posX > width || ball.posX < 0)
  {
    if(failEnvTriggered == false) {
      failEnvTriggered = true;
      failEnv.trigger();
    }
    ballAmp = 0;
    gameOver();
  }
}

function gameOver() 
{
  //Pop up for Game over information
  strokeWeight(1);
  stroke(200, 0, 0);
  fill(200, 0, 0);
  text("Game   Over", width/2 - 76, height/2 - 40);
  text("You scored:  " + overallScore, width/2 - 87, height/2 + 5);
  text("Press Enter  to try again", width/2 - 132, height/2 + 40);
  text("Press Esc to return to Main Menu", width/2 - 180, height/2 + 80)
  //Resets game when Enter is pressed
  if(keyIsDown(ENTER)) 
  {
    resetGame();
  }
}

function resetGame()
{
  //Resets variable values so game can start by default
  ball.posX = width/2;
  ball.posY = height/2;
  ball.travelX = 0;
  ball.travelY = 0;
  ballStart = false;
  
  failEnvTriggered = false;
  
  scoreUnit1.score = 0;
  scoreUnit2.score = 0;
  extraCount = 0;
  
  paddle1.posY = height/2;
  paddle2.posY = height/2;
}

function keyPressed() 
{
  //Key press function only works on main menu
  if(state == mainMenu)
  {
    //Starts game upon pressing enter
    if(keyCode == ENTER)
    {
      state = gameState;
    }
  }
  
  //Key press function only works on game state
  if(state == gameState) 
  {
    //Game starts when pressing the space bar
    if(keyCode == 32 && ballStart === false) 
    {
      ball.initiate();
      ballStart = true;
    }
    
    //Returns to main menu when pressing the escape button
    if(keyCode == ESCAPE)
    {
      state = mainMenu;
      //Resets Game to allow for non-disruptive navigation
      ballAmp = 0;
      resetGame();
    }
  }
  
}

function mouseClicked() 
{
  //Boundaries for each button are made for smooth selection and GUI when clicking on them
  if(state == mainMenu) 
  {
    //Toggles which mode is activated depending on what is clicked
    if(mouseX > (width/4) - textOffset - 10
    && mouseX < ((width/4) - textOffset - 10) + 70
    && mouseY > (height/2) + 20
    && mouseY < (height/2) + 50)
    {
      ballSelect = 1;
    }
    if(mouseX > (width/2) - textOffset - 10
    && mouseX < ((width/2) - textOffset - 10) + 82
    && mouseY > (height/2) + 20
    && mouseY < (height/2) + 50)
    {
      ballSelect = 2;
    }
    if(mouseX > (width/2) + (width/4) - textOffset - 10
    && mouseX < ((width/2) + (width/4) - textOffset - 10) + 85
    && mouseY > (height/2) + 20
    && mouseY < (height/2) + 50)
    {
      ballSelect = 3;
    }
    
    //Goes to main game when clicked
    if(mouseX > (width/2) - 30
    && mouseX < (width/2) - 30 + 55
    && mouseY > (height/2) + 110
    && mouseY < (height/2) + 140)
    {
      state = gameState;
    }
  }
}

function draw() 
{
  //Displays current state
  state();
}