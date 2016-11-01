

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var blockArray = [];
var paddleHeight = 20;
var paddleWidth = 100;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if(e.keyCode == 39) {
      rightPressed = true;
  }
  else if(e.keyCode == 37) {
      leftPressed = true;
  }
}

function keyUpHandler(e) {
  if(e.keyCode == 39) {
      rightPressed = false;
  }
  else if(e.keyCode == 37) {
      leftPressed = false;
  }
}

function Paddle() {
  this.x = paddleX;
  this.y = canvas.height - paddleHeight;
  this.width = paddleWidth;
  this.height = paddleHeight;
}

Paddle.prototype.move = function () {
  if (rightPressed === true && this.x < canvas.width - this.width) {
    this.x = this.x + 5;
  } else if (leftPressed === true && this.x > 0) {
    this.x = this.x -5;
  }
};

Paddle.prototype.draw = function () {
  context.fillStyle = "blue";
  context.fillRect(this.x, this.y, this.width, this.height);
  return this;
};

var paddle = new Paddle();

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  paddle.draw();
  paddle.move();
  requestAnimationFrame(gameLoop);
});
