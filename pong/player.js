// Class to draw and move players paddle on the playfield.
class Player {
  constructor(playerNbr, keyCodeUp, keyCodeDown, paddleHeight = 75) {
    // Store key codes to move paddle of each player.
    this.playerNbr = playerNbr;
    this.keyCodeUp = keyCodeUp;
    this.keyCodeDown = keyCodeDown;

    // Paddle object position, size and speed.
    this.distanceFromEdges = 10;
    this.height = paddleHeight;
    this.width = 10;
    this.speed = 10;

    this._createPaddle(playerNbr);
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

  // Update paddle position.
  _update() {
    this.position.add(this.velocity);

    // Revert last movement if paddle hits top or bottom playfield walls.
    if (this.position.y - this.height / 2 <= game.topWallYPos || this.position.y + this.height / 2 >= game.bottomWallYPos) {
      this.position.sub(this.velocity);
    }

    this.draw();
  }

  // Create paddle and place it in the middle of the players border.
  _createPaddle() {
    let initialXPos = this.playerNbr === 1 ? this.distanceFromEdges : width - this.distanceFromEdges;
    this.position = createVector(initialXPos, height / 2);
    this.setVelocity(createVector(0, 0), this.speed);
  }
}
