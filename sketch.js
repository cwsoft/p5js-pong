// Defining globals.
let canvasContainer = document.getElementById("canvas-container");
let game, ball, leftPlayer, rightPlayer, sounds, roundStartTime;
let playfieldOffset = 15;

// Preload sound effects.
function preload() {
  sounds = {
    hitWall: loadSound("./sounds/hit-wall.wav"),
    hitPaddle: loadSound("./sounds/hit-paddle.wav"),
    increaseScore: loadSound("./sounds/increase-score.wav"),
  };
}

// Setup p5 canvas.
function setup() {
  // Base setup.
  let canvas = createCanvas(canvasContainer.clientWidth, canvasContainer.clientHeight);
  canvas.parent("canvas-container");
  rectMode(CENTER);
  ellipseMode(CENTER);
  noStroke();

  // Create Pong game objects.
  game = new Pong();
}

// Update game state on every frame rate.
function draw() {
  // Draw playfield and player paddles.
  game.draw();

  // Only allow ball and paddle movement if game was started.
  if (game.running) {
    // Move ball and player paddles.
    ball.move();
    leftPlayer.move();
    rightPlayer.move();

    // Display ellapsed round time and actual ball speed.
    actualTime = new Date();
    let ellapsedRoundTime = Math.round((actualTime - roundStartTime) / 1000);
    game.statusMessage = "Ellapsed round time: " + ellapsedRoundTime + "s , Ball speed: " + ball.speed;
  } else {
    if (leftPlayer != undefined) leftPlayer.draw();
    if (rightPlayer != undefined) rightPlayer.draw();
  }
}

// Main entry point to start the game.
function keyPressed() {
  // Check if SPACE bar (keyCode=32) is pressed to start the game.
  if (!game.running && keyCode === 32) {
    // Reset to initial paddle and ball position.
    leftPlayer = new Player(playfieldOffset, "q", "a");
    rightPlayer = new Player(width - playfieldOffset, UP_ARROW, DOWN_ARROW);
    ball = new Ball();
    game.running = true;
    game.statusMessage = "";
    roundStartTime = new Date();
    return;
  }
}

// Update screen size.
function windowResized() {
  resizeCanvas(canvasContainer.clientWidth, canvasContainer.clientHeight);
}
