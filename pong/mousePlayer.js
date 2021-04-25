// Class to draw and move computer paddle on the playfield.
class MousePlayer extends Player {
  constructor(paddleXCenter, keyUp = null, keyDown = null, paddleHeight = 75) {
    super(paddleXCenter, keyUp, keyDown, paddleHeight);
  }

  // Move computer paddle based on balls y-position.
  move() {
    // Derive mouse vertical direction.
    let mouseYDirection = mouseY - this.position.y;
    if (Math.abs(mouseYDirection) <= this.height / 6) {
      this.setVelocity(createVector(0, 0));
    } else {
      this.setVelocity(createVector(0, mouseYDirection < 0 ? -1 : 1));
    }

    // Update computer paddle position and redraw at new position.
    this._update();
    this.draw();
  }
}