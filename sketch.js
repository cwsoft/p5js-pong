//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Some global variables.
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Global objects and states.
const canvasContainer = document.getElementById("canvas-container");
const paddlePlayfieldOffset = 15;
let pong, sounds, ball, leftPlayer, leftController, rightPlayer, rightController;

// Supported paddle controller states.
const Controller = {
  computer: 1,
  keyboard: 2,
  mouse: 3,
  touchpad: 4,
};

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

// Setup the p5 canvas.
function setup() {
  // Initialize canvas and reset some defaults.
  let canvas = createCanvas(canvasContainer.clientWidth, canvasContainer.clientHeight);
  canvas.parent("canvas-container");
  rectMode(CENTER);
  ellipseMode(CENTER);
  noStroke();

  // Set paddle controller states based on optional URL parameter or defaults.
  setControllerStatesFromUrlOrDefaults();

  // Create Pong game objects.
  pong = new Pong();
}

// Update game state on every frame rate.
function draw() {
  // Redraw Pong playfield.
  pong.draw();

  if (pong.isStarted) {
    // Only move ball and paddles if game round was started.
    ball.move();
    leftPlayer.move();
    rightPlayer.move();

    // Display ellapsed round time and actual ball speed.
    actualTime = new Date();
    let ellapsedRoundTime = Math.round((actualTime - pong.roundStartTime) / 1000);
    pong.statusMessage = "Ellapsed round time: " + ellapsedRoundTime + "s , Ball speed: " + ball.speed;
  } else {
    // Redraw paddles on last position if actual round was lost by any player.
    // Otherwise the paddles would disappear once a player won a round.
    if (leftPlayer != undefined) leftPlayer.draw();
    if (rightPlayer != undefined) rightPlayer.draw();
  }
}

// Evaluate key events to start new round or pause actual round.
function keyPressed() {
  if (key === "p" || key === "P") pong.pauseOrRestart();
  if (key === " " && !pong.isStarted) initializeNewRound();
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

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Pong specific helper methods.
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Create player objects reflecting given controller settings.
function createPlayer(paddleXPos, controller, keyUp = UP_ARROW, keyDown = DOWN_ARROW) {
  let player;

  switch (controller) {
    case Controller.keyboard:
      player = new Player(paddleXPos, keyUp, keyDown);
      break;

    case Controller.mouse:
      player = new MousePlayer(paddleXPos, null, null);
      break;

    case Controller.touchpad:
      player = new TouchpadPlayer(paddleXPos, null, null);
      break;

    default:
      player = new ComputerPlayer(paddleXPos, null, null);
      break;
  }

  return player;
}

// Initialize new pong round.
function initializeNewRound() {
  // Create left and right player paddles based on actual controller settings.
  // Note: If both paddles use the keyboard, we move right paddle UP/DONW via "q" and "a" keys.
  leftPlayer = createPlayer(paddlePlayfieldOffset, leftController);
  rightPlayer =
    rightController == Controller.keyboard && leftController == Controller.keyboard
      ? createPlayer(width - paddlePlayfieldOffset, rightController, "q", "a")
      : createPlayer(width - paddlePlayfieldOffset, rightController);

  // Create new ball object.
  ball = new Ball();

  // Set game state and start round timer.
  pong.isStarted = true;
  pong.statusMessage = "";
  pong.roundStartTime = new Date();
}

// Set controller states from optional URL get parameter or defaults.
function setControllerStatesFromUrlOrDefaults() {
  let url = getURLParams();
  // Left paddle controller [computer|keyboard|mouse|touchpad] (default: keyboard).
  leftController = Controller[url?.leftController?.toLowerCase()] || Controller.keyboard;

  // Right paddle controller [computer|keyboard|mouse|touchpad] (default: computer).
  rightController = Controller[url?.rightController?.toLowerCase()] || Controller.computer;

  // Ensure only one human player is bound to a mouse controller.
  if (leftController == Controller.mouse && rightController == Controller.mouse) {
    rightController = Controller.computer;
  }

  // Ensure only one human player is bound to a touchpad controller (may be reworked later).
  if (leftController == Controller.touchpad && rightController == Controller.touchpad) {
    rightController = Controller.computer;
  }
}
