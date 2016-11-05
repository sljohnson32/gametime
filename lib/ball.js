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
  if (this.gameOn === true) {
    this.x += this.dirX;
    this.y += this.dirY;
  }
  return this;
};

Ball.prototype.bounce = function(){
  if(this.x + this.dirX + this.radius > this.canvas.width || this.x + this.dirX - this.radius < 0) {
    this.dirX = -this.dirX;
  }
  if(this.y + this.dirY < this.radius) {
    this.dirY = -this.dirY;
  }
  if (this.y + this.dirY > this.canvas.height - this.radius - this.paddle.h) {
    if (this.x > this.paddle.x && this.x < this.paddle.x + this.paddle.w) {
      this.dirY = -this.dirY;
    } else if (this.y + this.dirY > this.canvas.height) {
      // alert('Game Over!');
      document.location.reload();
      }
    }
    return this;
  };

module.exports = Ball;
