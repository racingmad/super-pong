//Taken inspiration and modified from audiovisual lessons

//Variables for paddle sound
var paddleHit = new maximJs.maxiOsc();
var paddleEnv = new maximEx.env();
var paddleEnv2 = new maximEx.env();

//Amplitude variable to toggle how loud the ball gets
var ballAmp = 0;

//Variables for game over sound
var outsideBorder = new maximJs.maxiOsc();
var outsideBorderPitch = new maximJs.maxiOsc();
var outsideBorderFM = 0;
var failEnv = new maximEx.env();
var borderAmp = 0.3;

function initiateAudio() 
{
  //Sets up audio system for game
  audio = new maximJs.maxiAudio();
  audio.play = audioLoop; //Defines the play loop
  audio.init();
}

//Sets up white noise by giving 44100 random samples a second
function whiteNoise(amp)
{
  //If statement used to prevent clipping
  if(amp > 1) amp = 1;
  return random(-amp, amp);
}

function audioLoop()
{
  //Resulting signal variables ready to be used
  var sig1 = (paddleHit.triangle(paddleEnv2.line(800, 25, 0.1)) * 0.5) * paddleEnv.ar(0.01, 0.5);
  var sig2 = whiteNoise(0.1) * ballAmp;
  outsideBorderFM = (outsideBorderPitch.sinewave(40) + 1)/2;
  borderFreq = 200 + (outsideBorderFM * 120);
  var sig3 = outsideBorder.saw(borderFreq) * failEnv.ar(0.1, 2.4) * borderAmp;
  
  //Signals mixed in and divided to prevent audio clipping
  this.output = (sig1 + sig2 + sig3) / 3;
}