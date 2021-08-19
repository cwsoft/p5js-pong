// Class to draw and move player paddle on the playfield using a touch device.
class TouchpadPlayer extends Player {
  constructor(paddleXCenter, keyUp = null, keyDown = null, paddleHeight = 75) {
    super(paddleXCenter, keyUp, keyDown, paddleHeight);
  }

  // Move player paddle based on vertical touch and paddle position.
  move() {
    // Derive mouse vertical direction.
    let touchYPosition = touches.length > 0 ? touches[touches.length - 1].y : height / 2;
    let touchYDirection = touchYPosition - this.position.y;

    if (Math.abs(touchYDirection) <= this.height / 6) {
      this.setVelocity(createVector(0, 0));
    } else {
      this.setVelocity(createVector(0, touchYDirection < 0 ? -1 : 1));
    }

    // Update computer paddle position and redraw at new position.
    this._update();
    this.draw();
  }
}
