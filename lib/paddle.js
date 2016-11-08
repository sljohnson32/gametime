function Paddle(canvas, context) {
  this.canvas = canvas;
  this.context = context;
  this.h = 15;
  this.w = 200;
  this.x = (canvas.width - this.w)/2;
  this.y = canvas.height - this.h;
  this.dirX = 10;
}

Paddle.prototype.draw = function() {
  this.context.fillStyle = 'black';
  this.context.fillRect(this.x, this.y, this.w, this.h);
};

Paddle.prototype.move = function(right, left) {
  if (right === true && this.x < this.canvas.width - this.w) {
    this.x += this.dirX;
  }
  if (left === true && this.x > 0) {
    this.x -= this.dirX;
  }
};

module.exports = Paddle;
