// function draw(){

  var canvas = document.getElementById('game');
  var context = canvas.getContext('2d');
  var blockArray = [];

  function Paddle(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  // paddle.draw(new Paddle(300, 470, 100, 20));

  Paddle.prototype.draw = function () {
    context.fillStyle = "black";
    context.fillRect(this.x, this.y, this.width, this.height);
    return this;
  };

  Paddle.prototype.move = function () {
    this.y = this.y + 5;
    return this;
  };

  var paddle = new Paddle(300, 470, 100, 20);

  requestAnimationFrame(function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    paddle.draw();
    // requestAnimationFrame(gameLoop);
  });
}

// window.onload = draw();
