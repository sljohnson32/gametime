var gameTime = require('./gametime');

function Ball(canvas, context, paddle) {
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
  this.context.fillStyle = 'black';
  this.context.beginPath();
  this.context.arc(this.x,this.y,this.radius,0,2*Math.PI);
  this.context.fill();
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


module.exports = Ball;
