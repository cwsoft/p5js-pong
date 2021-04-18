// Class to setup the Pong playground.
class Board {
  constructor() {
    this.borderWidth = 6;
    this.borderColor = "green";
    this.circleSize = 100;
    this.goalWidth = 10;
    this.goalLength = 150;
    this.goalColor = "orange";
  }

  draw() {
    // Draw playground borders.
    background(this.borderColor);
    strokeWeight(0);
    fill(0);
    rect(this.borderWidth, this.borderWidth, width - this.borderWidth * 2, height - this.borderWidth * 2);

    // Draw middle line.
    noFill();
    stroke(this.borderColor);
    strokeWeight(this.borderWidth / 2);
    line(width / 2, 0, width / 2, height - this.borderWidth);

    // Draw middle circle.
    ellipse(width / 2, height / 2, this.circleSize);

    // Draw goal player has to hit with the ball to win the game.
    fill(this.goalColor);
    noStroke();
    rect(
      width - this.borderWidth * 2 - this.goalWidth / 2,
      height / 2 - this.goalLength / 2,
      this.borderWidth * 2,
      this.goalLength
    );
  }
}
