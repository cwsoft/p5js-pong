// Class to draw and move the player paddle on the canvas.
class Paddle {
  constructor() {
    this.paddleHeight = 75;
    this.paddleWidth = 10;
    this.speed = 8;

    // Place paddle in center of the user playground border.
    this.position = createVector(board.borderWidth, height / 2);
    this.setVelocity(createVector(0, 0), this.speed);
  }

  // Set new paddle velocity vector.
  setVelocity(direction) {
    this.velocity = direction.normalize().mult(this.speed);
  }

  moveOnKeyDown() {
    if (keyIsDown(UP_ARROW) || keyIsDown(DOWN_ARROW)) {
      this.setVelocity(createVector(0, keyIsDown(UP_ARROW) ? -1 : 1));
      this.update();
    }
  }

  // Apply velocity vector on each frame.
  update() {
    this.position.add(this.velocity);
    this.draw();

    // Stop paddle when hitting top or bottom playground borders.
    if (
      this.position.y - this.paddleHeight / 2 <= board.borderWidth * 2 ||
      this.position.y + this.paddleHeight / 2 + board.borderWidth * 2 > height
    ) {
      this.setVelocity(createVector(0, 0));
    }
  }

  draw() {
    // Draw players paddle.
    fill(245, 175, 46);
    noStroke();
    rect(this.position.x, this.position.y - this.paddleHeight / 2, this.paddleWidth, this.paddleHeight);
  }
}
