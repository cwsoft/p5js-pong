// Class to draw and move paddles on the game board.
class Paddle {
  constructor(player, keyCodeUp, keyCodeDown) {
    this.player = player;
    this.keyCodeUp = keyCodeUp;
    this.keyCodeDown = keyCodeDown;
    this.height = 75;
    this.width = 10;
    this.speed = 8;

    // Place paddle in the middle of the users field border.
    let initialXPos = player === 1 ? board.borderWidth : width - board.borderWidth * 2;
    this.position = createVector(initialXPos, height / 2);
    this.setVelocity(createVector(0, 0), this.speed);
  }

  // Set new paddle velocity vector.
  setVelocity(direction) {
    this.velocity = direction.normalize().mult(this.speed);
  }

  // Move paddle on key down event.
  move_OnKeyDown() {
    if (keyIsDown(this.keyCodeUp) || keyIsDown(this.keyCodeDown)) {
      this.setVelocity(createVector(0, keyIsDown(this.keyCodeUp) ? -1 : 1));
      this.update();
    }
  }

  // Update paddle position.
  update() {
    this.position.add(this.velocity);
    this.draw();

    // Stop paddle when hitting top or bottom playground borders.
    if (
      this.position.y - this.height / 2 <= board.borderWidth * 2 ||
      this.position.y + this.height / 2 + board.borderWidth * 2 > height
    ) {
      this.setVelocity(createVector(0, 0));
    }
  }

  // Draw updated paddle.
  draw() {
    fill(245, 175, 46);
    noStroke();
    rect(this.position.x, this.position.y - this.height / 2, this.width, this.height);
  }
}
