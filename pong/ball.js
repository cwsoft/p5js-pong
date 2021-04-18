// Class to draw a moving ball on the canvas.
class Ball {
  constructor() {
    // Set defaults.
    this.width = 20;
    this.speed = random(6, 12);

    // Place ball in the canvas center.
    this.position = createVector(width / 2, height / 2);

    // Kick ball in players field direction.
    this.setVelocity(createVector(-1, random(-2, 2)), this.speed);
  }

  // Set ball velocity vector.
  setVelocity(direction, speed) {
    this.velocity = direction.normalize().mult(speed);
    this.speed = speed;
  }

  // Add velocity vector to balls position vector per frame rate.
  update() {
    // If ball hits computers goal, the game is won.
    if (
      this.position.x >= width - this.width - board.borderWidth * 2 &&
      this.position.y > height / 2 - board.goalLength / 2 &&
      this.position.y < height / 2 + board.goalLength / 2
    ) {
      game.won = true;
      return;
    }

    // If ball hits players paddle, re-bounce ball into opposite direction.
    if (
      this.position.x - this.width / 2 < board.borderWidth + paddle.position.x + paddle.paddleWidth &&
      this.position.y - this.width / 2 > paddle.position.y - paddle.paddleHeight / 2 &&
      this.position.y - this.width / 2 < paddle.position.y + paddle.paddleHeight / 2
    ) {
      this.setVelocity(createVector(-this.velocity.x, this.velocity.y), this.speed);
    }

    // If ball hits players field border, game is lost.
    if (this.position.x - this.width / 2 <= board.borderWidth) {
      game.lost = true;
      return;
    }

    // If ball hits field border other than players side, re-bounce ball into opposite direction.
    if (
      this.position.x - this.width / 2 <= board.borderWidth ||
      this.position.x + this.width / 2 >= width - board.borderWidth * 2
    ) {
      this.setVelocity(createVector(-this.velocity.x, this.velocity.y), this.speed);
    }

    if (
      this.position.y - this.width / 2 < board.borderWidth ||
      this.position.y + this.width / 2 > height - board.borderWidth
    ) {
      this.setVelocity(createVector(this.velocity.x, -this.velocity.y), this.speed);
    }

    // Update position and draw ball.
    this.position.add(this.velocity);
    this.draw();
  }

  // Draw actual ball position.
  draw() {
    fill(50, 100, 200);
    ellipse(this.position.x, this.position.y, this.width);
    rect(paddle.position.x + paddle.width * 2, paddle.position.y - paddle.height / 2 - 10, 1, 1);
  }
}
