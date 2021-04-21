// Class to draw and move the ball on the playfield and to detect collisions.
class Ball {
  constructor() {
    // Set defaults.
    this.width = 20;
    this.speed = 10;
    this.speedIncrement = 0.5;
    this.maxSpeed = 20;

    // Place ball in canvas center.
    this.position = createVector(width / 2, height / 2);

    // Kick ball in random direction within given angle segment.
    this.setVelocity(p5.Vector.fromAngle(radians(random(-60, 60))).mult(random(-10, 10)), this.speed);
  }

  // Set ball velocity vector.
  setVelocity(direction, speed) {
    this.velocity = direction.normalize().mult(speed);
    this.speed = speed >= this.maxSpeed ? this.maxSpeed : speed;
  }

  // Add velocity vector to balls position vector per frame rate.
  move() {
    // Check ball collision with playfield wall, player paddles or side outs.
    if (this._checkWallCollision()) {
      // Reflect ball from playfield walls.
      let normalVector = createVector(0, -1);
      this.setVelocity(this.velocity.reflect(normalVector), this.speed);
      sounds.hitWall.play();
    } else if (this._checkPlayer1Collision()) {
      // Reflect ball with artificial angle mapped to paddle y hit position.
      let pannelHitFraction = (this.position.y - player1.position.y) / player1.height;
      let deflectionAngle = map(pannelHitFraction, -0.5, 0.5, -30, 30);
      let deflectionVector = p5.Vector.fromAngle(radians(deflectionAngle));
      this.setVelocity(deflectionVector, this.speed + this.speedIncrement);
      sounds.hitPaddle.play();
    } else if (this._checkPlayer2Collision()) {
      // Reflect ball with artificial angle mapped to paddle y hit position.
      let pannelHitFraction = (this.position.y - player2.position.y) / player2.height;
      let deflectionAngle = map(pannelHitFraction, 0.5, -0.5, -30, 30);
      let deflectionVector = p5.Vector.fromAngle(radians(deflectionAngle));
      this.setVelocity(deflectionVector.mult(-1), this.speed + this.speedIncrement);
      sounds.hitPaddle.play();
    } else if (this.position.x + this.width / 2 >= width) {
      // Ball hits player2 side, increase player1 score.
      game.increaseScore(1);
      game.running = false;
      sounds.increaseScore.play();
      return;
    } else if (this.position.x - this.width / 2 <= 0) {
      // Ball hits player1 side, increase player2 score.
      game.increaseScore(2);
      game.running = false;
      sounds.increaseScore.play();
      return;
    }

    // Update ball position and redraw.
    this.position.add(this.velocity);

    // Draw ball at upated position.
    fill(50, 100, 200);
    ellipse(this.position.x, this.position.y, this.width);
  }

  // Check collision with playfield walls.
  _checkWallCollision() {
    return this.position.y - this.width / 2 <= game.topWallYPos || this.position.y + this.width / 2 >= game.bottomWallYPos;
  }

  // Check collision with player1 paddle.
  _checkPlayer1Collision() {
    return (
      this.position.x - this.width / 2 <= player1.position.x + player1.width / 2 &&
      this.position.y >= player1.position.y - player1.height / 2 &&
      this.position.y <= player1.position.y + player1.height / 2
    );
  }

  // Check collision with player2 paddle.
  _checkPlayer2Collision() {
    return (
      this.position.x + this.width / 2 >= player2.position.x - player2.width / 2 &&
      this.position.y >= player2.position.y - player2.height / 2 &&
      this.position.y <= player2.position.y + player2.height / 2
    );
  }
}
