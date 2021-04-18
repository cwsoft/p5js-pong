// Class to setup the Pong playground.
class Board {
  constructor() {
    this.borderWidth = 6;
    this.borderColor = "green";
    this.circleSize = 100;
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
  }
}
