let board, player1, player2, ball;
let game = {
  started: false,
  winner: 0,
};

function setup() {
  let canvasContainer = document.getElementById("canvas-container");
  let canvas = createCanvas(canvasContainer.clientWidth, canvasContainer.clientHeight);
  canvas.parent("canvas-container");
  board = new Board();
  player1 = new Paddle(1, UP_ARROW, DOWN_ARROW);
  player2 = new Paddle(2, 81, 65); // UP: Q, DOWN: A
  ball = new Ball();
}

function draw() {
  // Draw initial board, ball and paddle position.
  board.draw();
  player1.draw();
  player2.draw();
  ball.draw();

  // Check if game was one by a player.
  if (game.winner > 0) {
    fill(0, 255, 0, 200);
    textSize(30);
    let xPosition = game.winner == 1 ? width / 2 - 50 : width / 2 + 50;
    let message = game.winner == 1 ? "Spieler 1 hat gewonnen." : "Spieler 2 hat gewonnen!";
    textAlign(game.winner == 1 ? RIGHT : LEFT);
    text(message + "\nDrücke [ENTER] für ein neues Spiel.", xPosition, 75);
    game.started = false;
    return;
  }

  // Only move ball and paddle if game was started.
  if (game.started) {
    ball.update();
    player1.move_OnKeyDown();
    player2.move_OnKeyDown();
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
    player1 = new Paddle(1, UP_ARROW, DOWN_ARROW);
    player2 = new Paddle(2, 81, 65); // UP: Q, DOWN: A
    game.started = true;
    game.winner = 0;
    return;
  }
}

// Update screen size.
function windowResized() {
  resizeCanvas(canvasDiv.clientWidth, canvasDiv.clientHeight);
  board.draw();
}
