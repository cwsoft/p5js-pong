// Class to setup Pong playing field.
class Pong {
  constructor() {
    // Treated as private fields.
    this._leftPlayerScore = 0;
    this._rightPlayerScore = 0;

    // Public fields for now.
    this.isStarted = false;
    this.isPaused = false;

    this.wallThickness = 40;
    this.topWallYPos = 0 + this.wallThickness;
    this.bottomWallYPos = height - this.wallThickness;

    // Initial status message.
    this.statusMessage = "p5js-Pong – Press [SPACE] to start new round.";
  }

  // Get total score of left and right player.
  get totalScore() {
    return this._leftPlayerScore + this._rightPlayerScore;
  }

  // Increase given players score and refresh display.
  increaseScore(playerNbr) {
    if (playerNbr == 1) this._leftPlayerScore++;
    if (playerNbr == 2) this._rightPlayerScore++;
    this._refreshPlayerScores();
  }

  // Draw playing field.
  draw() {
    background(10, 50, 70);
    this._drawDashedCenterLine();
    this._drawWall(0 + this.wallThickness / 2);
    this._drawWall(height - this.wallThickness / 2);
    this._refreshPlayerScores();
    this._refreshStatusMessage();
    this._refreshUsageMessage();
  }

  // ---------------------------------------------------------------------------------------
  // Belows API should be treated as private API.
  // ---------------------------------------------------------------------------------------
  // Refresh players scores.
  _refreshPlayerScores() {
    fill(255);
    textSize(50);
    textStyle(BOLD);

    textAlign(RIGHT);
    text(this._leftPlayerScore, width / 2 - 30, this.topWallYPos + 50);
    textAlign(LEFT);
    text(this._rightPlayerScore, width / 2 + 30, this.topWallYPos + 50);

    textStyle(NORMAL);
  }

  // Refresh status message.
  _refreshStatusMessage() {
    fill(0);
    textSize(20);
    textAlign(CENTER);
    text(this.statusMessage, width / 2, this.topWallYPos - this.wallThickness / 2 + 5);
  }

  // Refresh usage message.
  _refreshUsageMessage() {
    // Work out if players are human or computer.
    let player1 = leftController == Controller.computer ? "Left 💻" : "Left 👤:";
    let player2 = rightController == Controller.computer ? "Right 💻" : "Right 👤:";

    // Work out controller settings used for left and right player.
    let controller1 = leftController == Controller.mouse ? "Mouse" : "[⬆], [⬇]";
    controller1 = leftController == Controller.computer ? "" : controller1;

    let controller2 =
      rightController == Controller.mouse
        ? "Mouse"
        : leftController == Controller.computer || leftController == Controller.mouse
        ? "[⬆], [⬇]"
        : "[q]:Up, [a]:Down";
    controller2 = rightController == Controller.computer ? "" : controller2;

    // Build usage message.
    let usageMessage = `${player1} ${controller1}, ${player2} ${controller2}, ▶ [SPACE], ⏯: [P], ⏭: [F5] – (c) 2021 http://cwsoft.de`;

    // Update usage message.
    fill(0);
    textSize(16);
    textAlign(CENTER);
    text(usageMessage, width / 2, this.bottomWallYPos + this.wallThickness / 2 + 2);
  }

  // Draw dashed center line.
  _drawDashedCenterLine(lineLength, gapLength) {
    drawingContext.setLineDash([25, 25]);
    stroke(255);
    strokeWeight(10);
    line(width / 2, this.topWallYPos, width / 2, this.bottomWallYPos);
    noStroke();
  }

  // Draw bouncing walls.
  _drawWall(yCenter) {
    fill(150, 150, 150);
    rect(width / 2, yCenter, width, this.wallThickness);
  }
}
