// Class to draw and move paddle using a touch device.
class TouchpadPaddle extends KeyboardPaddle {
  constructor(xPosition, height = 75, keyUp = null, keyDown = null) {
    super(xPosition, height, keyUp, keyDown);
  }

  // Move player paddle based on vertical touch and paddle position.
  move() {
    // Derive mouse vertical direction.
    let touchYPosition = touches.length > 0 ? touches[touches.length - 1].y : this.position.y;
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
