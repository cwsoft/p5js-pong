// Public enum with possible controller options.
const PaddleOptions = {
  computer: 1,
  keyboard: 2,
  mouse: 3,
  touchpad: 4,
};

// Class to retrieve and store the paddle controller settings.
class PaddleController {
  constructor() {
    this.getPaddleSettings();
  }

  // Set controller states from optional URL get parameter (leftPaddle, rightPaddle) or defaults.
  getPaddleSettings(left = PaddleOptions.keyboard, right = PaddleOptions.computer) {
    let url = getURLParams();
    // Left paddle controller [computer|keyboard|mouse|touchpad] (default: keyboard).
    this.left = PaddleOptions[url?.leftPaddle?.toLowerCase()] || left;

    // Right paddle controller [computer|keyboard|mouse|touchpad] (default: computer).
    this.right = PaddleOptions[url?.rightPaddle?.toLowerCase()] || right;

    // Ensure only one human player is bound to a mouse controller.
    if (this.left == PaddleOptions.mouse && this.right == PaddleOptions.mouse) {
      this.right = PaddleOptions.computer;
    }

    // Ensure only one human player is bound to a touchpad controller (may be reworked later).
    if (this.left == PaddleOptions.touchpad && this.right == PaddleOptions.touchpad) {
      this.right = PaddleOptions.computer;
    }
  }

  // Create left paddle depending on controller settings.
  createLeftPaddle(xPosition = pong.paddlePlayfieldXOffset, height = 75) {
    return this._paddleFactory(this.left, xPosition, height);
  }

  // Create right paddle object depending on controller settings.
  createRightPaddle(xPosition = width - pong.paddlePlayfieldXOffset, height = 75) {
    // If both paddles use the keyboard, we move right paddle UP/DONW via "q" and "a" keys.
    return this.right == PaddleOptions.keyboard && this.left == PaddleOptions.keyboard
      ? this._paddleFactory(controller.right, xPosition, height, "q", "a")
      : this._paddleFactory(controller.right, xPosition, height);
  }

  // ---------------------------------------------------------------------------------------
  // Belows API should be treated as private API.
  // ---------------------------------------------------------------------------------------
  // Create paddle objects reflecting given controller settings.
  _paddleFactory(controller, xPosition, height, keyUp = UP_ARROW, keyDown = DOWN_ARROW) {
    let paddle;

    switch (controller) {
      case PaddleOptions.keyboard:
        paddle = new KeyboardPaddle(xPosition, height, keyUp, keyDown);
        break;

      case PaddleOptions.mouse:
        paddle = new MousePaddle(xPosition, height, null, null);
        break;

      case PaddleOptions.touchpad:
        paddle = new TouchpadPaddle(xPosition, height, null, null);
        break;

      default:
        paddle = new ComputerPaddle(xPosition, height, null, null);
        break;
    }

    return paddle;
  }
}
