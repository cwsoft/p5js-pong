// Class to draw and move paddle with the mouse.
class MousePaddle extends KeyboardPaddle {
  constructor(xPosition, height = 75, keyUp = null, keyDown = null) {
    super(xPosition, height, keyUp, keyDown);
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
