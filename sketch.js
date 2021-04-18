let canvasDiv = document.getElementById("canvas-container");
let board, paddle, ball;
let game = {
  started: false,
  won: false,
  lost: false,
};

function setup() {
  let canvas = createCanvas(canvasDiv.clientWidth, canvasDiv.clientHeight);
  canvas.parent("canvas-container");
  board = new Board();
  paddle = new Paddle();
  ball = new Ball();
}

function draw() {
  // Draw initial board, ball and paddle position.
  board.draw();
  paddle.draw();
  ball.draw();

  // Check if actual game was lost.
  if (game.lost || game.won) {
    fill(0, 255, 0, 200);
    textSize(30);
    let message = game.lost ? "Spiel verloren!" : "Spiel gewonnen!";
    text(message + " [ENTER] started ein neues Spiel.", 50, 75);
    game.started = false;
    return;
  }

  // Only move ball and paddle if game was started.
  if (game.started) {
    ball.update();
    paddle.moveOnKeyDown();
  } else {
    fill(0, 255, 0, 200);
    textSize(30);
    text("Drücke [ENTER] um das Spiel zu starten!", 50, 75);
  }
}

// Main entry point to start the game.
function keyPressed() {
  if (!game.started && keyCode === RETURN) {
    ball = new Ball();
    paddle = new Paddle();
    game.started = true;
    game.lost = false;
    game.won = false;
    return;
  }
}

// Update screen size.
function windowResized() {
  resizeCanvas(canvasDiv.clientWidth, canvasDiv.clientHeight);
  board.draw();
}
