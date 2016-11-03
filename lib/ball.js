function Ball() {
  this.radius = 15;
  this.x = canvas.width/2;
  this.y = 465;
  this.dirX = 6;
  this.dirY = -6;
}

Ball.prototype.move = function(){
  if (gameOn === true) {
    this.x += this.dirX;
    this.y += this.dirY;
  }
  if(this.x + this.dirX + this.radius > canvas.width || this.x + this.dirX - this.radius < 0) {
    this.dirX = -this.dirX;
  }
  if(this.y + this.dirY < this.radius) {
    this.dirY = -this.dirY;
  }
  if (this.y + this.dirY > canvas.height - this.radius - paddle.h) {
    if (this.x > paddle.x && this.x < paddle.x + paddle.w) {
      this.dirY = -this.dirY;
    } else if (this.y + this.dirY > canvas.height) {
      // alert('Game Over!');
      document.location.reload();
      }
    }
  };

Ball.prototype.draw = function() {
  context.fillStyle = 'magenta';
  context.beginPath();
  context.arc(this.x,this.y,this.radius,0,2*Math.PI);
  context.fill();
};

module.exports = Ball;
