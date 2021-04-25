// Defining some globals.
let canvasContainer = document.getElementById("canvas-container");
let game, ball, leftPlayer, rightPlayer, sounds, roundStartTime;
let rightPlayerIsComputer, leftControlIsMouse, rightControlIsMouse;
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
  game = new Pong();
}

// Update game state on every frame rate.
function draw() {
  // Draw playfield and player paddles.
  game.draw();

  // Only allow ball and paddle movement if game was started.
  if (game.isStarted) {
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
  checkGamePauseState();

  // Check if SPACE bar (keyCode=32) is pressed to start the game.
  if (!game.isStarted && keyCode === 32) {
    // Initialize paddle of the left player.
    let paddleXPos = playfieldOffset;
    leftPlayer = leftControlIsMouse ? new MousePlayer(paddleXPos) : new Player(paddleXPos);

    // Initialize paddle of the right player.
    paddleXPos = width - playfieldOffset;
    if (rightPlayerIsComputer) {
      rightPlayer = new ComputerPlayer(paddleXPos);
    } else {
      if (rightControlIsMouse) {
        rightPlayer = new MousePlayer(paddleXPos);
      } else {
        // If left player uses mouse, use UP/DOWN arrow for right player, otherwise use "Q" and "A".
        rightPlayer = leftControlIsMouse ? new Player(paddleXPos) : new Player(paddleXPos, "q", "a");
      }
    }

    // Initialize ball.
    ball = new Ball();

    // Set game state and start round timer.
    game.isStarted = true;
    game.statusMessage = "";
    roundStartTime = new Date();
    return;
  }
}

// Get optional configuration settings via URL get parameter.
// Supported GET parameters: rightPlayer=computer, leftControl=keyboard|mouse, rightControl=keyboard|mouse.
function getOptionalSettingsFromUrl() {
  let urlParameter = getURLParams();
  rightPlayerIsComputer = urlParameter.rightPlayer != undefined && urlParameter.rightPlayer.toLowerCase() === "computer";
  leftControlIsMouse = urlParameter.leftControl != undefined && urlParameter.leftControl.toLowerCase() === "mouse";
  rightControlIsMouse = urlParameter.rightControl != undefined && urlParameter.rightControl.toLowerCase() === "mouse";

  // When in two player mode, only one player can use the mouse, while the other player must use the keyboard.
  if (rightPlayerIsComputer) rightControlIsMouse = false;
  if (leftControlIsMouse && rightControlIsMouse) rightControlIsMouse = false;
}

// Toggle pause game state when pressing "p" or "P".
function checkGamePauseState() {
  if (key === "p" || key === "P") game.isPaused = !game.isPaused;
  if (game.isPaused) {
    noLoop();
  } else {
    loop();
  }
}

// Update screen size.
function windowResized() {
  resizeCanvas(canvasContainer.clientWidth, canvasContainer.clientHeight);
}
