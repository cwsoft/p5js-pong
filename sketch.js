//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Global configs and game objects.
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const paddleHeight = 75;
const canvasContainer = document.getElementById("canvas-container");
let pong, sound, ball, paddleFactory, leftPaddle, rightPaddle;

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Global p5js event handler callbacks.
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Preload sound effects.
function preload() {
  sound = {
    hitWall: loadSound("./sounds/hit-wall.wav"),
    hitPaddle: loadSound("./sounds/hit-paddle.wav"),
    increasePlayerScore: loadSound("./sounds/increase-score.wav"),
  };
}

// Setup p5js canvas, reset defaults and initialize global game objects.
function setup() {
  let canvas = createCanvas(canvasContainer.clientWidth, canvasContainer.clientHeight);
  canvas.parent("canvas-container");

  rectMode(CENTER);
  ellipseMode(CENTER);
  noStroke();

  // Initialize global game objects.
  pong = new Pong();
  ball = new Ball();
  paddleFactory = new PaddleFactory();
  leftPaddle = paddleFactory.createLeftPaddle(paddleHeight);
  rightPaddle = paddleFactory.createRightPaddle(paddleHeight);
}

// Update game state every frame.
function draw() {
  pong.draw();

  if (pong.isStarted) {
    ball.move();
    leftPaddle.move();
    rightPaddle.move();
  } else {
    // Show paddles at startup and redraw paddles once a player won/lost actual round.
    leftPaddle.draw();
    rightPaddle.draw();
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
    // Simulate SPACE key to start new round on touch only devices.
    key = " ";
    keyPressed();
  }
}

// Evaluate mouse press events to start new round.
function mouseClicked() {
  if (!pong.isStarted) {
    // Simulate SPACE key to start new round when mouse is clicked.
    key = " ";
    keyPressed();
  }
}

// Adjust canvas when user resizes browser window.
function windowResized() {
  resizeCanvas(canvasContainer.clientWidth, canvasContainer.clientHeight);
}
