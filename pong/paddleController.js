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
  createLeftPlayer(paddleXPosition = pong.paddlePlayfieldXOffset) {
    return this._playerFactory(paddleXPosition, this.left);
  }

  // Create right player object depending on controller settings.
  createRightPlayer(paddleXPosition = width - pong.paddlePlayfieldXOffset) {
    // If both paddles use the keyboard, we move right paddle UP/DONW via "q" and "a" keys.
    return this.right == ControllerOptions.keyboard && this.left == ControllerOptions.keyboard
      ? this._playerFactory(paddleXPosition, controller.right, "q", "a")
      : this._playerFactory(paddleXPosition, controller.right);
  }

  // ---------------------------------------------------------------------------------------
  // Belows API should be treated as private API.
  // ---------------------------------------------------------------------------------------
  // Create player objects reflecting given controller settings.
  _playerFactory(paddleXPos, controller, keyUp = UP_ARROW, keyDown = DOWN_ARROW) {
    let player;

    switch (controller) {
      case ControllerOptions.keyboard:
        player = new Player(paddleXPos, keyUp, keyDown);
        break;

      case ControllerOptions.mouse:
        player = new MousePlayer(paddleXPos, null, null);
        break;

      case ControllerOptions.touchpad:
        player = new TouchpadPlayer(paddleXPos, null, null);
        break;

      default:
        player = new ComputerPlayer(paddleXPos, null, null);
        break;
    }

    return player;
  }
}
