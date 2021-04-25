// Defining some globals.
let canvasContainer = document.getElementById("canvas-container");
let pong, ball, leftPlayer, rightPlayer, sounds, roundStartTime;
let leftPlayerIsComputer, rightPlayerIsComputer, leftControlIsMouse, rightControlIsMouse;
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

  // Get optional configuration settings via URL get parameter.
  getOptionalSettingsFromUrl();

  // Create Pong game objects.
  pong = new Pong();
}

// Update game state on every frame rate.
function draw() {
  // Draw Pong playfield.
  pong.draw();

  // Only allow ball and paddle movement if Pong was started.
  if (pong.isStarted) {
    // Move ball and player paddles.
    ball.move();
    leftPlayer.move();
    rightPlayer.move();

    // Display ellapsed round time and actual ball speed.
    actualTime = new Date();
    let ellapsedRoundTime = Math.round((actualTime - roundStartTime) / 1000);
    pong.statusMessage = "Ellapsed round time: " + ellapsedRoundTime + "s , Ball speed: " + ball.speed;
  } else {
    if (leftPlayer != undefined) leftPlayer.draw();
    if (rightPlayer != undefined) rightPlayer.draw();
  }
}

// Main entry point to start the game.
function keyPressed() {
  checkGamePauseState();

  // Check if SPACE bar is pressed to start the game.
  if (!pong.isStarted && key === " ") {
    // Initialize left player paddle and controls.
    let paddleXPos = playfieldOffset;
    if (leftPlayerIsComputer) {
      leftPlayer = new ComputerPlayer(paddleXPos);
    } else {
      // If left player uses keyboard, always assign UP/DOWN keys.
      leftPlayer = leftControlIsMouse ? new MousePlayer(paddleXPos) : new Player(paddleXPos);
    }

    // Initialize right player paddle and controls.
    paddleXPos = width - playfieldOffset;
    if (rightPlayerIsComputer) {
      rightPlayer = new ComputerPlayer(paddleXPos);
    } else {
      if (rightControlIsMouse) {
        rightPlayer = new MousePlayer(paddleXPos);
      } else {
        // Assign right player UP/DOWN keys if left player does not use keyboard, otherwise use "Q" and "A" keys.
        rightPlayer = leftPlayerIsComputer || leftControlIsMouse ? new Player(paddleXPos) : new Player(paddleXPos, "q", "a");
      }
    }

    // Initialize ball.
    ball = new Ball();

    // Set game state and start round timer.
    pong.isStarted = true;
    pong.statusMessage = "";
    roundStartTime = new Date();
    return;
  }
}

// Get optional configuration settings via URL get parameter.
// Supported GET parameters: left|rightPlayer=computer, left|rightControl=mouse.
function getOptionalSettingsFromUrl() {
  let urlParameter = getURLParams();
  // Work out if left and/or right player was set to computer.
  leftPlayerIsComputer = urlParameter.leftPlayer != undefined && urlParameter.leftPlayer.toLowerCase() === "computer";
  rightPlayerIsComputer = urlParameter.rightPlayer != undefined && urlParameter.rightPlayer.toLowerCase() === "computer";

  // Work out controls used for left and right player.
  leftControlIsMouse = urlParameter.leftControl != undefined && urlParameter.leftControl.toLowerCase() === "mouse";
  if (leftPlayerIsComputer) leftControlIsMouse = false;
  rightControlIsMouse = urlParameter.rightControl != undefined && urlParameter.rightControl.toLowerCase() === "mouse";
  if (rightPlayerIsComputer) rightControlIsMouse = false;

  // Ensure only one player is bound to mouse controls when game is in two human player mode.
  if (!leftPlayerIsComputer && !rightPlayerIsComputer && leftControlIsMouse && rightControlIsMouse)
    rightControlIsMouse = false;
}

// Toggle pause game state when pressing "p" or "P".
function checkGamePauseState() {
  if (key === "p" || key === "P") pong.isPaused = !pong.isPaused;
  if (pong.isPaused) {
    noLoop();
  } else {
    loop();
  }
}

// Update screen size.
function windowResized() {
  resizeCanvas(canvasContainer.clientWidth, canvasContainer.clientHeight);
}
