// Public enum with possible paddle types.
const PaddleType = {
  computer: 1,
  keyboard: 2,
  mouse: 3,
  touchpad: 4,
};

// Class to get paddle settings and to create paddle objects.
class PaddleFactory {
  // Set left and right paddle type from Url GET parameter or defaults.
  constructor() {
    this._setLeftAndRightPaddleType();
  }

  // Create paddle on left playfield edge based on user settings.
  createLeftPaddle(height = 75) {
    let xPosition = pong.paddlePlayfieldXOffset;
    return this._createPaddle(this.leftType, xPosition, height);
  }

  // Create paddle on right playfield edge based on user settings.
  createRightPaddle(height = 75) {
    let xPosition = width - pong.paddlePlayfieldXOffset;
    // If both paddles use the keyboard, we move right paddle UP/DONW via "q" and "a" keys.
    return this.rightType == PaddleType.keyboard && this.leftType == PaddleType.keyboard
      ? this._createPaddle(this.rightType, xPosition, height, "q", "a")
      : this._createPaddle(this.rightType, xPosition, height);
  }

  // ---------------------------------------------------------------------------------------
  // Belows API should be treated as private API.
  // ---------------------------------------------------------------------------------------
  // Set left/right paddle types from URL parameter (leftPaddle|rightPaddle) or defaults.
  _setLeftAndRightPaddleType() {
    let url = getURLParams();
    // Left paddle [computer|keyboard|mouse|touchpad] (default: keyboard).
    this.leftType = PaddleType[url?.leftPaddle?.toLowerCase()] || PaddleType.keyboard;

    // Right paddle [computer|keyboard|mouse|touchpad] (default: computer).
    this.rightType = PaddleType[url?.rightPaddle?.toLowerCase()] || PaddleType.computer;

    // Ensure only one human player is bound to a mouse.
    if (this.leftType == PaddleType.mouse && this.rightType == PaddleType.mouse) {
      this.rightType = PaddleType.computer;
    }

    // Ensure only one human player is bound to a touchpad (may be reworked later).
    if (this.leftType == PaddleType.touchpad && this.rightType == PaddleType.touchpad) {
      this.rightType = PaddleType.computer;
    }
  }

  // Create left or right paddle object for specified paddle type.
  _createPaddle(paddleType, xPosition, height, keyUp = UP_ARROW, keyDown = DOWN_ARROW) {
    switch (paddleType) {
      case PaddleType.keyboard:
        return new KeyboardPaddle(xPosition, height, keyUp, keyDown);

      case PaddleType.mouse:
        return new MousePaddle(xPosition, height, null, null);

      case PaddleType.touchpad:
        return new TouchpadPaddle(xPosition, height, null, null);

      default:
        return new ComputerPaddle(xPosition, height, null, null);
    }
  }
}
