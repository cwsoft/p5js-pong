// Public enum with possible controller options.
const ControllerOptions = {
  computer: 1,
  keyboard: 2,
  mouse: 3,
  touchpad: 4,
};

// Class to retrieve and store the paddle controller settings.
class PaddleController {
  constructor() {
    this.getSettingsFromUrlOrDefaults();
  }

  // Set controller states from optional URL get parameter or defaults.
  getSettingsFromUrlOrDefaults(left = ControllerOptions.keyboard, right = ControllerOptions.computer) {
    let url = getURLParams();
    // Left paddle controller [computer|keyboard|mouse|touchpad] (default: keyboard).
    this.left = ControllerOptions[url?.leftController?.toLowerCase()] || left;

    // Right paddle controller [computer|keyboard|mouse|touchpad] (default: computer).
    this.right = ControllerOptions[url?.rightController?.toLowerCase()] || right;

    // Ensure only one human player is bound to a mouse controller.
    if (this.left == ControllerOptions.mouse && this.right == ControllerOptions.mouse) {
      this.right = ControllerOptions.computer;
    }

    // Ensure only one human player is bound to a touchpad controller (may be reworked later).
    if (this.left == ControllerOptions.touchpad && this.right == ControllerOptions.touchpad) {
      this.right = ControllerOptions.computer;
    }
  }

  // Create left player depending on controller settings.
  createLeftPaddle(xPosition = pong.paddlePlayfieldXOffset, height = 75) {
    return this._paddleFactory(this.left, xPosition, height);
  }

  // Create right player object depending on controller settings.
  createRightPaddle(xPosition = width - pong.paddlePlayfieldXOffset, height = 75) {
    // If both paddles use the keyboard, we move right paddle UP/DONW via "q" and "a" keys.
    return this.right == ControllerOptions.keyboard && this.left == ControllerOptions.keyboard
      ? this._paddleFactory(controller.right, xPosition, height, "q", "a")
      : this._paddleFactory(controller.right, xPosition, height);
  }

  // ---------------------------------------------------------------------------------------
  // Belows API should be treated as private API.
  // ---------------------------------------------------------------------------------------
  // Create paddle objects reflecting given controller settings.
  _paddleFactory(controller, xPosition, height, keyUp = UP_ARROW, keyDown = DOWN_ARROW) {
    let player;

    switch (controller) {
      case ControllerOptions.keyboard:
        player = new KeyboardPaddle(xPosition, height, keyUp, keyDown);
        break;

      case ControllerOptions.mouse:
        player = new MousePaddle(xPosition, height, null, null);
        break;

      case ControllerOptions.touchpad:
        player = new TouchpadPaddle(xPosition, height, null, null);
        break;

      default:
        player = new ComputerPaddle(xPosition, height, null, null);
        break;
    }

    return player;
  }
}
