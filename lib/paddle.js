function Paddle(canvas, context, options) {
  this.canvas = canvas;
  this.context = context;
  this.h = options.h || 15;
  this.w = options.w || 200;
  this.x = (canvas.width - this.w)/2;
  this.y = canvas.height - this.h;
}

Paddle.prototype.draw = function() {
  this.context.fillStyle = 'blue';
  this.context.fillRect(this.x, this.y, this.w, this.h);
};

Paddle.prototype.move = function(right, left) {
  if (right === true && this.x < this.canvas.width - this.w) {
    this.x += 6;
  }
  if (left === true && this.x > 0) {
    this.x -= 6;
  }
};

module.exports = Paddle;
