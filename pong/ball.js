// Class to draw and move the ball on the playfield and to detect collisions.
class Ball {
  constructor() {
    // Set defaults.
    this.width = 20;
    this.speed = 10;
    this.speedIncrement = 0.5;
    this.maxSpeed = 20;
    this.maxAngleField = 60;

    // Place ball in canvas center.
    this.position = createVector(width / 2, height / 2);

    // Get random direction vector within angle field between -maxAngle..+maxAngle.
    // Note: Limit angle field to avoid infinite bouncing between top/bottom walls (-90°, +90°.)
    let vDirection = p5.Vector.fromAngle(radians(random(-this.maxAngleField, this.maxAngleField)));

    // Randomly pick direction from set [-1, 1].
    let xDirection = Math.floor(Math.random() * 2) == 0 ? -1 : 1;

    // Kick ball in random x direction within given angle field betwen -maxAngle..+maxAngle.
    this.setVelocity(vDirection.mult(xDirection), this.speed);
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
    } else if (this._checkLeftPlayerCollision()) {
      // Reflect ball with artificial angle mapped to paddle y hit position.
      let pannelHitFraction = (this.position.y - leftPlayer.position.y) / leftPlayer.height;
      let deflectionAngle = map(pannelHitFraction, -0.5, 0.5, -30, 30);
      let deflectionVector = p5.Vector.fromAngle(radians(deflectionAngle));
      this.setVelocity(deflectionVector, this.speed + this.speedIncrement);
      sounds.hitPaddle.play();
    } else if (this._checkRightPlayerCollision()) {
      // Reflect ball with artificial angle mapped to paddle y hit position.
      let pannelHitFraction = (this.position.y - rightPlayer.position.y) / rightPlayer.height;
      let deflectionAngle = map(pannelHitFraction, 0.5, -0.5, -30, 30);
      let deflectionVector = p5.Vector.fromAngle(radians(deflectionAngle));
      this.setVelocity(deflectionVector.mult(-1), this.speed + this.speedIncrement);
      sounds.hitPaddle.play();
    } else if (this.position.x + this.width / 2 >= width) {
      // Ball hits right players side, increase left players score.
      pong.increaseScore(1);
      pong.isStarted = false;
      sounds.increaseScore.play();
      return;
    } else if (this.position.x - this.width / 2 <= 0) {
      // Ball hits left players side, increase right players score.
      pong.increaseScore(2);
      pong.isStarted = false;
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
    return this.position.y - this.width / 2 <= pong.topWallYPos || this.position.y + this.width / 2 >= pong.bottomWallYPos;
  }

  // Check collision with left players paddle.
  _checkLeftPlayerCollision() {
    return (
      this.position.x - this.width / 2 <= leftPlayer.position.x + leftPlayer.width / 2 &&
      this.position.y >= leftPlayer.position.y - leftPlayer.height / 2 &&
      this.position.y <= leftPlayer.position.y + leftPlayer.height / 2
    );
  }

  // Check collision with right players paddle.
  _checkRightPlayerCollision() {
    return (
      this.position.x + this.width / 2 >= rightPlayer.position.x - rightPlayer.width / 2 &&
      this.position.y >= rightPlayer.position.y - rightPlayer.height / 2 &&
      this.position.y <= rightPlayer.position.y + rightPlayer.height / 2
    );
  }
}
