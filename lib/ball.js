function Ball(canvas, context, paddle) {
  this.gameOn = false;
  this.canvas = canvas;
  this.context = context;
  this.paddle = paddle;
  this.radius = 15;
  this.x = canvas.width/2;
  this.y = canvas.height - this.paddle.h - this.radius;
  this.dirX = 6;
  this.dirY = -6;
}

Ball.prototype.draw = function() {
  this.context.fillStyle = 'magenta';
  this.context.beginPath();
  this.context.arc(this.x,this.y,this.radius,0,2*Math.PI);
  this.context.fill();
  return this;
};

Ball.prototype.move = function(){
  if (this.gameOn === false) {
    this.x = this.paddle.x + (this.paddle.w / 2);
  }

  if (this.gameOn === true) {
    this.x += this.dirX;
    this.y += this.dirY;
  }
  return this;
};

Ball.prototype.bounceTop = function () {
  if(this.y + this.dirY < this.radius) {
    this.dirY = -this.dirY;
  }
  return this;
};

Ball.prototype.bounceSide = function() {
  if(this.x + this.dirX + this.radius > this.canvas.width || this.x + this.dirX - this.radius < 0) {
    this.dirX = -this.dirX;
  }
  return this;
};

Ball.prototype.bounceBottom = function() {
  if (this.y + this.dirY > this.canvas.height - this.radius - this.paddle.h) {
    if (this.x > this.paddle.x && this.x < this.paddle.x + (this.paddle.w / 4)) {
      if (Math.sign(this.dirX) === 1) {
        this.dirY = -this.dirY;
        this.dirX = -this.dirX;
      } else {
        this.dirY = -this.dirY;
      }
    }
    if (this.x > this.paddle.x + (this.paddle.w / 4 * 3) && this.x < this.paddle.x + this.paddle.w) {
      if (Math.sign(this.dirX) === -1) {
        this.dirY = -this.dirY;
        this.dirX = -this.dirX;
      } else {
        this.dirY = -this.dirY;
      }
    }
    if (this.x > this.paddle.x + (this.paddle.w / 4) && this.x < this.paddle.x + (this.paddle.w / 4 * 3)) {
        this.dirY = -this.dirY;
  } else if (this.y + this.dirY > this.canvas.height) {
      // alert('Game Over!');
      document.location.reload();
      }
    }
  // console.log(this.dirY + ' ' + this.dirX);
  return this;
  };

module.exports = Ball;
