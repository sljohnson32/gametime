

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var rightPressed = false;
var leftPressed = false;
var paddleHeight = 20;
var paddleWidth = 100;
var paddleX = (canvas.width-paddleWidth)/2;
var paddleY = canvas.height-paddleHeight;

var ballRadius = 15;
var ballX = canvas.width/2;
var ballY = paddleY - ballRadius;
var dirX = 2;
var dirY = -2;

var gameOn = false;
var rightPressed = false;
var leftPressed = false;

var brickArray = [];
var brickWidth = 70;
var brickHeight = 25;
var brickPad = 10;
var brickMarginTop = 30;
var brickMarginLeft = 30;
var brickRows = 4;
var brickColumns = 8;

for(c=0; c<brickColumns; c++) {
  brickArray[c] = [];
  for(r=0; r<brickRows; r++) {
    brickArray[c][r] = {x: 0, y: 0};
  }
}

function populateBrickArray() {
    for(c=0; c<brickColumns; c++) {
        for(r=0; r<brickRows; r++) {
            var brickX = (c*(brickWidth+brickPad))+brickMarginLeft;
            var brickY = (r*(brickHeight+brickPad))+brickMarginTop;
            brickArray[c][r].x = brickX;
            brickArray[c][r].y = brickY;
            context.beginPath();
            context.rect(brickX, brickY, brickWidth, brickHeight);
            context.fillStyle = "#000000";
            context.fill();
            context.closePath();
        }
    }
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e) {
  if(e.keyCode == 39) {
    rightPressed = true;
  }
  else if(e.keyCode == 37) {
    leftPressed = true;
  }
  else if(e.keyCode ==13) {
    gameOn = true;
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

function drawBall () {
  context.fillStyle = 'magenta';
  context.beginPath();
  context.arc(ballX,ballY,ballRadius,0,2*Math.PI);
  context.fill();
}

function ballMove() {
  if (gameOn === true) {
    ballX += dirX;
    ballY += dirY;
  }
  if(ballX + dirX + ballRadius > canvas.width || ballX + dirX - ballRadius < 0) {
    dirX = -dirX;
  }
  if(ballY + dirY + ballRadius > canvas.height || ballY + dirY - ballRadius < 0) {
    dirY = -dirY;
  }
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = 'blue';
  context.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);
  drawBall();
}

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  populateBrickArray();
  draw();
  paddleMove();
  ballMove();
  requestAnimationFrame(gameLoop);
});
