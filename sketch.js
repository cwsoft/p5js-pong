//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Global play objects.
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const canvasContainer = document.getElementById("canvas-container");
let pong, sounds, ball, controller, leftPlayer, rightPlayer;

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Global p5js event handler callbacks.
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Preload sound effects.
function preload() {
  sounds = {
    hitWall: loadSound("./sounds/hit-wall.wav"),
    hitPaddle: loadSound("./sounds/hit-paddle.wav"),
    increaseScore: loadSound("./sounds/increase-score.wav"),
  };
}

// Setup p5js canvas, reset defaults and initialize global game objects.
function setup() {
  let canvas = createCanvas(canvasContainer.clientWidth, canvasContainer.clientHeight);
  canvas.parent("canvas-container");

  rectMode(CENTER);
  ellipseMode(CENTER);
  noStroke();

  // Initialize the global game objects.
  pong = new Pong();
  ball = new Ball();
  controller = new PaddleController();
  leftPlayer = controller.createLeftPlayer();
  rightPlayer = controller.createRightPlayer();
}

// Update game state every frame.
function draw() {
  // Refresh pong playfield.
  pong.draw();

  if (pong.isStarted) {
    // Only update game objects if game round was started.
    ball.move();
    leftPlayer.move();
    rightPlayer.move();
  } else {
    // Prevent paddles from disappering once a player won/lost the actual round.
    leftPlayer.draw();
    rightPlayer.draw();
  }
}

// Evaluate key events to start new round or pause actual round.
function keyPressed() {
  if (key === "p" || key === "P") pong.pauseRound();
  if (key === " " && !pong.isStarted) pong.newRound();
}

// Evaluate touch events to start new round.
function touchStarted() {
  if (!pong.isStarted) {
    // Simulate SPACE key to start the game on touch only devices.
    key = " ";
    keyPressed();
  }
}

// Adjust canvas when user resizes browser window.
function windowResized() {
  resizeCanvas(canvasContainer.clientWidth, canvasContainer.clientHeight);
}
