// Class to setup Pong playing field.
class Pong {
  constructor() {
    // Treate as private fields.
    this._player1Score = 0;
    this._player2Score = 0;

    // Public fields for now.
    this.running = false;

    this.wallThickness = 40;
    this.topWallYPos = 0 + this.wallThickness;
    this.bottomWallYPos = height - this.wallThickness;

    this.statusMessage = "Pong – Hit [SPACE] to start a new round.";
    this.usageMessage = "Left 👤 [q]:Up, [a]:Down  |  Right 👤 [⬆], [⬇]  |  New Round:[SPACE]  |  Restart: [F5]";
  }

  get totalScore() {
    return this._player1Score + this._player2Score;
  }

  // Increase given players score and refresh display.
  increaseScore(playerNbr) {
    if (playerNbr == 1) this._player1Score++;
    if (playerNbr == 2) this._player2Score++;
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

  // Refresh players scores.
  _refreshPlayerScores() {
    fill(255);
    textSize(50);
    textStyle(BOLD);

    textAlign(RIGHT);
    text(this._player1Score, width / 2 - 30, this.topWallYPos + 50);
    textAlign(LEFT);
    text(this._player2Score, width / 2 + 30, this.topWallYPos + 50);

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
    fill(0);
    textSize(16);
    textAlign(CENTER);
    text(this.usageMessage, width / 2, this.bottomWallYPos + this.wallThickness / 2 + 2);
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
