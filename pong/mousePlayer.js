// Class to draw and move player paddle on the playfield using the mouse.
class MousePlayer extends KeyboardPlayer {
  constructor(paddleXCenter, keyUp = null, keyDown = null, paddleHeight = 75) {
    super(paddleXCenter, keyUp, keyDown, paddleHeight);
  }

  // Move player paddle based on vertical mouse and paddle position.
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
