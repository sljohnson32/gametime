var gameTime = require('./gametime');
var score = require('./scoreboard');

function Ball(canvas, context, paddle, score) {
  this.cvs = canvas;
  this.ctx = context;
  this.pad = paddle;
  this.radius = 15;
  this.x = this.cvs.width/2;
  this.y = this.cvs.height - this.pad.h - this.radius;
  this.dirX = 6;
  this.dirY = -6;
}

Ball.prototype.draw = function() {
  this.ctx.fillStyle = 'black';
  this.ctx.beginPath();
  this.ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
  this.ctx.fill();
  return this;
};

Ball.prototype.action = function(gameMode) {
  if (gameMode === 2 || gameMode === 0 || gameMode === 3) {
    this.x = this.pad.x + (this.pad.w / 2);
    this.y = this.cvs.height - this.pad.h - this.radius;
  }

  if (gameMode === 1) {
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
  if(this.x + this.dirX + this.radius > this.cvs.width || this.x + this.dirX - this.radius < 0) {
    this.dirX = -this.dirX;
  }
  return this;
};

Ball.prototype.paddleBounce = function() {
  if (this.y + this.dirY > this.cvs.height - this.radius - this.pad.h) {
    if (this.x > this.pad.x && this.x < this.pad.x + (this.pad.w / 4)) {
      if (Math.sign(this.dirX) === 1) {
        this.dirY = -this.dirY;
        this.dirX = -this.dirX;
      } else {
        this.dirY = -this.dirY;
      }
    }

    if (this.x > this.pad.x + (this.pad.w / 4 * 3) && this.x < this.pad.x + this.pad.w) {
      if (Math.sign(this.dirX) === -1) {
        this.dirY = -this.dirY;
        this.dirX = -this.dirX;
      } else {
        this.dirY = -this.dirY;
      }
    }

    if (this.x > this.pad.x + (this.pad.w / 4) && this.x < this.pad.x + (this.pad.w / 4 * 3)) {
        this.dirY = -this.dirY;
      }
  return this;
  }
};

Ball.prototype.bottomCollision = function(cvsHeight, lives) {
  if (this.y + this.dirY > cvsHeight && lives === 1) {
    return true;
  }
  if (this.y + this.dirY > cvsHeight) {
    return false;
  }
};

Ball.prototype.move = function(gameMode) {
  this.action(gameMode);
  this.draw();
  this.bounceTop();
  this.bounceSide();
  this.paddleBounce();
  return this;
};

module.exports = Ball;
