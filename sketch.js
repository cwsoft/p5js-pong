//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Some global variables.
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Global play objects.
const canvasContainer = document.getElementById("canvas-container");
let pong, sounds, ball, controller, leftPlayer, rightPlayer;

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// P5 global event handlers.
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Preload sound effects.
function preload() {
  sounds = {
    hitWall: loadSound("./sounds/hit-wall.wav"),
    hitPaddle: loadSound("./sounds/hit-paddle.wav"),
    increaseScore: loadSound("./sounds/increase-score.wav"),
  };
}

// Setup p5 canvas and reset p5js defaults.
function setup() {
  let canvas = createCanvas(canvasContainer.clientWidth, canvasContainer.clientHeight);
  canvas.parent("canvas-container");

  rectMode(CENTER);
  ellipseMode(CENTER);
  noStroke();

  // Create the global game objects.
  pong = new Pong();
  controller = new PaddleController();
  leftPlayer = controller.createLeftPlayer();
  rightPlayer = controller.createRightPlayer();
}

// Update game state on every frame rate.
function draw() {
  // (Re)draw Pong playfield.
  pong.draw();

  if (pong.isStarted) {
    // Only move ball and paddles if game round was started.
    ball.move();
    leftPlayer.move();
    rightPlayer.move();
    pong.updateRoundTimeAndBallSpeed();
  } else {
    // Prevent paddles from disappering once a player won/lost the actual round.
    leftPlayer.draw();
    rightPlayer.draw();
  }
}

// Evaluate key events to start new round or pause actual round.
function keyPressed() {
  if (key === "p" || key === "P") pong.pauseOrRestart();
  if (key === " " && !pong.isStarted) pong.setupNewRound();
}

// Evaluate touch events to start new round.
function touchStarted() {
  if (!pong.isStarted) {
    // Simulate pressing SPACE key so we can start the game via a touch geasture.
    key = " ";
    keyPressed();
  }
}

// Adjust canvas when user resizes browser window.
function windowResized() {
  resizeCanvas(canvasContainer.clientWidth, canvasContainer.clientHeight);
}
