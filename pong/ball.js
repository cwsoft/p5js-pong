// Class to draw a moving ball on the canvas.
class Ball {
  constructor() {
    // Set defaults.
    this.width = 20;
    this.speed = random(5, 10);

    // Place ball in the canvas center.
    this.position = createVector(width / 2, height / 2);

    // Kick ball in random direction.
    this.setVelocity(p5.Vector.fromAngle(radians(random(-60, 60))).mult(random(-10, 10)), this.speed);
  }

  // Set ball velocity vector.
  setVelocity(direction, speed) {
    this.velocity = direction.normalize().mult(speed);
    this.speed = speed;
  }

  // Add velocity vector to balls position vector per frame rate.
  update() {
    if (this._bounceFromTopOrBottomFieldBorder()) {
      // Re-bounce ball if it hits the top or bottom field border.
      let normalVector = createVector(0, -1);
      this.setVelocity(this.velocity.reflect(normalVector), this.speed);
    } else if (this._bounceFromPlayer1()) {
      // Re-bounce ball from player 1 paddle with artificial deflection angle based on ball y hit position.
      let pannelHitFraction = (this.position.y - player1.position.y) / player1.height;
      let deflectionAngle = map(pannelHitFraction, -0.5, 0.5, -30, 30);
      let deflectionVector = p5.Vector.fromAngle(radians(deflectionAngle));
      this.setVelocity(deflectionVector, this.speed);
    } else if (this._bounceFromPlayer2()) {
      // Re-bounce ball from player 2 paddle with artificial deflection angle based on ball y hit position.
      let pannelHitFraction = (this.position.y - player2.position.y) / player2.height;
      let deflectionAngle = map(pannelHitFraction, 0.5, -0.5, -30, 30);
      let deflectionVector = p5.Vector.fromAngle(radians(deflectionAngle));
      this.setVelocity(deflectionVector.mult(-1), this.speed);
    } else if (this.position.x + this.width / 2 >= width - board.borderWidth * 2) {
      // Check if player 1 won the game.
      game.winner = 1;
      return;
    } else if (this.position.x - this.width / 2 <= board.borderWidth) {
      // Check if player 2 won the game.
      game.winner = 2;
      return;
    }

    // Update position and draw ball.
    this.position.add(this.velocity);
    this.draw();
  }

  // Draw actual ball position.
  draw() {
    fill(50, 100, 200);
    ellipse(this.position.x, this.position.y, this.width);
  }

  _bounceFromTopOrBottomFieldBorder() {
    return (
      this.position.y - this.width / 2 <= board.borderWidth ||
      this.position.y + this.width / 2 >= height - board.borderWidth * 2
    );
  }

  _bounceFromPlayer1() {
    return (
      this.position.x - this.width / 2 <= board.borderWidth + player1.position.x + player1.width &&
      this.position.y >= player1.position.y - player1.height / 2 &&
      this.position.y <= player1.position.y + player1.height / 2
    );
  }

  _bounceFromPlayer2() {
    return (
      this.position.x + this.width / 2 >= width - board.borderWidth * 2 &&
      this.position.y >= player2.position.y - player2.height / 2 &&
      this.position.y <= player2.position.y + player2.height / 2
    );
  }
}
