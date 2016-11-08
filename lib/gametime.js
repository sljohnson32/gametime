var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var Brick = require('./brick');
var Ball = require('./ball');
var Paddle = require('./paddle');
var Level = require('./level');
var Scoreboard = require('./scoreboard');

var paddle = new Paddle(canvas, context);
var score = new Scoreboard();
var ball = new Ball(canvas, context, paddle, score);

var rightPressed = false;
var leftPressed = false;

var gameMode = 0;

var brickArray = [];
var brickRows = 4;
var brickColumns = 6;
var brickWidth = 100;
var brickHeight = 25;

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

function keyDown(e) {
  if(e.keyCode == 39) {
    rightPressed = true;
  }
  if(e.keyCode == 37) {
    leftPressed = true;
  }
  if(e.keyCode == 13) {
    console.log('ENTER' + gameMode);
    if(gameMode === 0 || gameMode === 2) {
      gameMode = 1;
    }
    if(gameMode === 4) {
      gameMode = 0;
    }
    if (gameMode === 3) {
      gameMode = 1;
    }
    if(gameMode === 5) {
      gameRestart();
      gameMode = 0;
    }
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

function ballRectCollision () {
  brickArray.forEach(function (brickR) {
    brickR.forEach(function (brick) {
      var distX = Math.abs(ball.x - brick.x - brickWidth/2);
      var distY = Math.abs(ball.y - brick.y - brickHeight/2);
      if (distX > (brickWidth + ball.radius)) {
        return false;
      }
      if (distX <= (brickWidth/2) && distY <= (brickHeight/2)) {
        ball.dirY = -ball.dirY;
        brick.destroyBrick();
        score.bricksDestroyed++;
        score.bricksAlive--;
        $('#player-score').text(score.bricksDestroyed);
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
      var brickMarginTop = 50;
      var brickMarginLeft = 25;
      var brickX = (c*(brickWidth+brickPad))+brickMarginLeft;
      var brickY = (r*(brickHeight+brickPad))+brickMarginTop;
      brickArray[c][r] = new Brick(brickX, brickY);
    }
  }
}

populateBrickArray();

function passedBall() {
  if (ball.bottomCollision(canvas.height, score.playerLives) === true) {
    score.playerLives--;
    gameRestart();
    gameMode = 4;
  }
  if (ball.bottomCollision(canvas.height, score.playerLives) === false) {
    score.playerLives--;
    gameMode = 2;
  }
}

function allBallActions() {
  passedBall();
  ball.move(gameMode);
}

function levelUp() {
  ball.x = canvas.width/2;
  ball.y = canvas.height - paddle.h - ball.radius;
  paddle.w = paddle.w * 3 / 4;
  paddle.x = (canvas.width - paddle.w)/2;
  paddle.dirX = 14;
  ball.dirX = 8;
  ball.dirY = -8;
  score.levelReset();
  gameMode = 3;
}

function gameRestart () {
  ball.x = canvas.width/2;
  ball.y = canvas.height - paddle.h - ball.radius;
  paddle.x = (canvas.width - paddle.w)/2;
  paddle.y = canvas.height - paddle.h;
  ball.dirX = 6;
  ball.dirY = -6;
  score.fullReset();
}

function gameStart() {
  context.clearRect(0, 0, canvas.width,
  canvas.height);
  populateBrickArray();
  paddle.draw();
  paddle.move(rightPressed, leftPressed);
  allBallActions();
  score.textUpdate(context, canvas, gameMode);
  drawBricks();
  if (score.level === 1) {
    paddle.w = 200;
  }
}

function gameEnd() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  paddle.draw();
  ball.draw();
  score.textUpdate(context, canvas, gameMode);
  drawBricks();
  gameRestart();
}

function gamePause() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  paddle.draw();
  paddle.move(rightPressed, leftPressed);
  allBallActions();
  score.textUpdate(context, canvas, gameMode);
  drawBricks();
}

function gameAnimate() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  paddle.draw();
  paddle.move(rightPressed, leftPressed);
  allBallActions();
  score.textUpdate(context, canvas, gameMode);
  drawBricks();
  ballRectCollision();
}

function gameWin() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  paddle.draw();
  allBallActions();
  score.textUpdate(context, canvas, gameMode);
  drawBricks();
  gameMode = 5;
  ball.dirX = 0;
  ball.dirY = 0;
}

function gameTime() {
  if(gameMode === 0 || gameMode === 3) {
    gameStart();
  }
  if(gameMode === 1) {
    gameAnimate();
  }
  if (gameMode === 2){
    gamePause();
  }
  if (gameMode === 4) {
    gameEnd();
  }
  if (score.bricksAlive === 0 && score.level === 1) {
    levelUp();
  }
  if (score.bricksAlive === 0 && score.level === 2) {
    gameWin();
  }
}

module.exports = gameTime;
