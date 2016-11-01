

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var blockArray = [];
var paddleHeight = 20;
var paddleWidth = 100;
var paddleX = (canvas.width-paddleWidth)/2;
var paddleY = canvas.height-paddleHeight;
var ballRadius = 15;
var ballX = canvas.width/2;
var ballY = paddleY - ballRadius;

var rightPressed = false;
var leftPressed = false;

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

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

function paddleMove() {
  if (rightPressed === true && paddleX < canvas.width - paddleWidth) {
    paddleX += 5;
  } else if (leftPressed === true && paddleX > 0) {
    paddleX -= 5;
  }
}

function draw() {
  context.fillStyle = 'blue';
  context.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);

  context.fillStyle = 'magenta';
  context.beginPath();
  context.arc(ballX,ballY,ballRadius,0,2*Math.PI);
  context.fill();
}

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  draw();
  paddleMove();
  requestAnimationFrame(gameLoop);
});
