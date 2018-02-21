var ballStart = false;
var failEnvTriggered = false;
var extraCount = 0;
var overallScore = 0;
var ballDirection = 0;

function gameState()
{
  background(185);
  overallScore = (scoreUnit2.score * 10) + scoreUnit1.score + extraCount;
  boardBackground();
  boardSplit();

  
  drawScore();
  
  if(ballStart == false)
  {
    stroke(0);
    fill(0);
    strokeWeight(1);
    textSize(24);
    text("Press Space  to Start!", width/2 - 140, height/2 + 40);
  }
  directionCheck();
  ballCollision();
  ballStatic();
  gameBorder();
  paddle1.draw();
  paddle2.draw();
  
  endGameCheck();
}

function gameBorder() 
{
  noFill()
  stroke(0);
  strokeWeight(5);
  line(0, 0, width - 2, 0);
  line(0, height - 2, width - 2, height - 2);
}

function boardBackground() {
  stroke(0, 0, 0, 0.0375);
  strokeWeight(2);
  var gridSize = 30;
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
  strokeWeight(5);
  stroke(0);
  
  for(i = 8; i < height; i+= 70) {
    line(width/2, i, width/2, i+40)
  }
}

function drawScore() 
{
  if(scoreUnit1.score > 9)
  {
    if(scoreUnit2.score == 9) 
    {
      scoreUnit1.score = scoreUnit2.score = 9;
      extraCount++;
    }
    else 
    {
      scoreUnit1.score = 0;
      scoreUnit2.score += 1;
    }
  }
  scoreUnit1.draw();
  scoreUnit2.draw();
}

function directionCheck() {
  
  influenceIntensity = 1.5; //Influence is relative to vertical travel speed
  
  speedTransfer = ball.travelY * influenceIntensity;
  
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
  if(ball.posX < width || ball.posX > 0)
  {
    ball.draw();
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
  if(ball.posX < 0 || ball.posX > width) 
  {
    ball.travelX *= 1.1;
  }
  
  
  if(ball.posX <= paddle1.posX + paddle1.width
  && ball.posX >= paddle1.posX
  && ball.posY <= paddle1.posY + (paddle1.height/2)
  && ball.posY >= paddle1.posY - (paddle1.height/2)) 
  {
    paddleEnv.trigger();
    paddleEnv2.trigger();
    ball.posX = paddle1.posX + paddle1.width;
    ball.travelX *= -1.1;
    ball.travelY += ballDirection;
    scoreUnit1.score += 1;
    
  }
  if(ball.posX >= paddle2.posX
  && ball.posX <= paddle2.posX + paddle2.width
  && ball.posY <= paddle2.posY + (paddle2.height/2)
  && ball.posY >= paddle2.posY - paddle1.height/2) 
  {
    paddleEnv.trigger();
    paddleEnv2.trigger();
    ball.posX = paddle2.posX;
    ball.travelX *= -1.1;
    ball.travelY += ballDirection;
    scoreUnit1.score += 1;
  }
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
  strokeWeight(1);
  stroke(200, 0, 0);
  fill(200, 0, 0);
  text("Game   Over", width/2 - 76, height/2 - 40);
  text("You scored:  " + overallScore, width/2 - 87, height/2 + 5);
  text("Press Enter  to try again", width/2 - 132, height/2 + 40);
  if(keyIsDown(ENTER)) 
  {
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
}