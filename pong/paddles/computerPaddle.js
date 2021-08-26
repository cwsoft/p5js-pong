// Class to draw and move computer paddle on the playfield.
class ComputerPaddle extends KeyboardPaddle {
  constructor(xPosition, height = 75, keyUp = null, keyDown = null) {
    super(xPosition, height, keyUp, keyDown);
    this.movingThreshold = 0.4;
  }

  // Move computer paddle based on balls y-position.
  move() {
    // Check if computer paddle is placed on left or right playfield side.
    let paddleIsOnLeftSide = this.xPosition <= width / 2;
    let paddleIsOnRightSide = !paddleIsOnLeftSide;

    // Fraction of screen width ball needs to pass before computer paddle is allowed to move.
    let widthFraction = paddleIsOnLeftSide ? this.movingThreshold : 1 - this.movingThreshold;

    if (
      // Don´t move computer paddle if ball is in opponent playfield or ball moves away from computers paddle, or
      // balls y-distance from paddle center is <= 50% of the paddles height to avoid screen flickering and to give the
      // opponent (human or computer) the chance to win the game - at least for high ball speeds and/or high shoot angles.
      (paddleIsOnLeftSide && (ball.position.x >= widthFraction * width || ball.velocity.x > 0)) ||
      (paddleIsOnRightSide && (ball.position.x < widthFraction * width || ball.velocity.x < 0)) ||
      Math.abs(this.position.y - ball.position.y) <= this.height / 2
    ) {
      // Stop vertical movement of computers paddle.
      this.setVelocity(createVector(0, 0));
    } else {
      // Set computer paddle velocity in the balls y-direction.
      this.setVelocity(createVector(0, this.position.y > ball.position.y ? -1 : 1));
    }

    // Update computer paddle position and redraw at new position.
    this._update();
    this.draw();
  }
}
