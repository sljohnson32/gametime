var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var Brick = require('./brick');
var Ball = require('./ball');
var Paddle = require('./paddle');

var rightPressed = false;
var leftPressed = false;

var paddle = new Paddle(canvas, context, {});
var ball = new Ball(canvas, context, paddle);

var brickArray = [];
var brickRows = 4;
var brickColumns = 8;
var brickWidth = 70;
var brickHeight = 25;


function ballRectCollision () {
  brickArray.forEach(function (brickR) {
    brickR.forEach(function (brick) {

      var distX = Math.abs(ball.x - brick.x - brickWidth/2);
      var distY = Math.abs(ball.y - brick.y - brickHeight/2);

      if (distX > (brickWidth + ball.radius)) {
        return false;
      }
      if (distX <= (brickWidth/2) && distY <= (brickHeight/2)) {
        console.log('Ball Collided at' + brick.x + ' ' + brick.y);
        ball.dirY = -ball.dirY;
        brick.alive = false;
        brick.x = -1000;
        brick.y = -1000;
      }
      if (distY > (brickHeight + ball.radius)) {
        return false;
      }
    });
  });
}

function drawBricks() {
  // if (brickAlive === true) {
  for(c=0; c<brickColumns; c++) {
    for(r=0; r<brickRows; r++) {
      if (brickArray[c][r].alive === true) {
      context.beginPath();
      context.rect(brickArray[c][r].x, brickArray[c][r].y, brickWidth, brickHeight);
      context.fillStyle = "#000000";
      context.fill();
      context.closePath();
    }
    }
  }
}

function populateBrickArray() {
  for(c=0; c<brickColumns; c++) {
     brickArray[c] = [];
    for(r=0; r<brickRows; r++) {
      var brickPad = 10;
      var brickMarginTop = 30;
      var brickMarginLeft = 30;
      var brickX = (c*(brickWidth+brickPad))+brickMarginLeft;
      var brickY = (r*(brickHeight+brickPad))+brickMarginTop;
      brickArray[c][r] = new Brick(brickX, brickY);
    }
  }
}

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

function keyDown(e) {
  if(e.keyCode == 39) {
    rightPressed = true;
  }
  if(e.keyCode == 37) {
    leftPressed = true;
  }
  if(e.keyCode ==13) {
    ball.gameOn = true;
  }
}

function keyUp(e) {
  if(e.keyCode == 39) {
    rightPressed = false;
  }
  if(e.keyCode == 37) {
    leftPressed = false;
  }
}

function ballMove() {
  ball.draw().move().bounceTop().bounceSide().bounceBottom();
}

populateBrickArray();

function animate() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  paddle.draw();
  paddle.move(rightPressed, leftPressed);
  ballMove();
  drawBricks();
  ballRectCollision ();
  requestAnimationFrame(animate);
}

animate();
