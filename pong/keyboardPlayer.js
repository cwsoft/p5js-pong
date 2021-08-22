// Class to draw and move players paddle on the playfield.
class KeyboardPlayer {
  constructor(paddleXCenter, keyUp = UP_ARROW, keyDown = DOWN_ARROW, paddleHeight = 75) {
    // Store key codes to move paddle of each player.
    if (typeof keyUp === "string") keyUp = keyUp.toUpperCase().charCodeAt(0);
    this.keyCodeUp = keyUp;
    if (typeof keyDown === "string") keyDown = keyDown.toUpperCase().charCodeAt(0);
    this.keyCodeDown = keyDown;

    // Paddle object position, size and speed (could be configured via options object).
    this.paddleXCenter = paddleXCenter;
    this.height = paddleHeight;
    this.width = 10;
    this.speed = 10;

    // Place paddle on playfield.
    this._createPaddle();
    this.draw();
  }

  // Draw paddle at actual position.
  draw() {
    fill(245, 175, 46);
    rect(this.position.x, this.position.y, this.width, this.height);
  }

  // Set paddle velocity vector.
  setVelocity(direction) {
    this.velocity = direction.normalize().mult(this.speed);
  }

  // Move paddle on key down event.
  move() {
    if (keyIsDown(this.keyCodeUp) || keyIsDown(this.keyCodeDown)) {
      this.setVelocity(createVector(0, keyIsDown(this.keyCodeUp) ? -1 : 1));
      this._update();
    }
    this.draw();
  }

  // ---------------------------------------------------------------------------------------
  // Belows API should be treated as private API.
  // ---------------------------------------------------------------------------------------
  // Update paddle position.
  _update() {
    this.position.add(this.velocity);

    // Revert last movement if paddle hits top or bottom playfield walls.
    if (this.position.y - this.height / 2 <= pong.topWallYPos || this.position.y + this.height / 2 >= pong.bottomWallYPos) {
      this.position.sub(this.velocity);
    }

    this.draw();
  }

  // Create paddle and place it in the middle of the players border.
  _createPaddle() {
    this.position = createVector(this.paddleXCenter, height / 2);
    this.setVelocity(createVector(0, 0), this.speed);
  }
}
