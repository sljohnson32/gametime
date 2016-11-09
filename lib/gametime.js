var Brick = require('./brick');
var Ball = require('./ball');
var Paddle = require('./paddle');
var Level = require('./level');
var Scoreboard = require('./scoreboard');

function Game(ctx, cvs) {
  this.context = ctx;
  this.canvas = cvs;
  this.paddle = new Paddle(cvs, ctx);
  this.score = new Scoreboard();
  this.ball = new Ball(cvs, ctx, this.paddle, this.score);
  this.gameMode = 0;
  this.rightPressed = false;
  this.leftPressed = false;
  this.brickArray = [];
  this.brickRows = 4;
  this.brickColumns = 6;
  this.brickWidth = 100;
  this.brickHeight = 25;
}

Game.prototype.ballRectCollision = function () {
  var ball = this.ball;
  var game = this;
  this.brickArray.forEach(function (brickR) {
    brickR.forEach(function (brick) {
      var distX = Math.abs(ball.x - brick.x - game.brickWidth/2);
      var distY = Math.abs(ball.y - brick.y - game.brickHeight/2);
      if (distX > (game.brickWidth + ball.radius)) {
        return false;
      }
      if (distX <= (game.brickWidth/2) && distY <= (game.brickHeight/2)) {
        ball.dirY = -ball.dirY;
        brick.destroyBrick();
        game.score.bricksDestroyed++;
        game.score.bricksAlive--;
        $('#player-score').text(game.score.bricksDestroyed);
      }
      if (distY > (game.brickHeight + ball.radius)) {
        return false;
      }
    });
  });
};

Game.prototype.drawBricks = function() {
  // if (brickAlive === true) {
  for(c=0; c<this.brickColumns; c++) {
    for(r=0; r<this.brickRows; r++) {
      if (this.brickArray[c][r].alive === true) {
      this.context.beginPath();
      this.context.rect(this.brickArray[c][r].x, this.brickArray[c][r].y, this.brickWidth, this.brickHeight);
      this.context.fillStyle = "#000000";
      this.context.fill();
      this.context.closePath();
      }
    }
  }
};

Game.prototype.populateBrickArray = function() {
  for(c=0; c<this.brickColumns; c++) {
     this.brickArray[c] = [];
    for(r=0; r<this.brickRows; r++) {
      var brickPad = 10;
      var brickMarginTop = 60;
      var brickMarginLeft = 25;
      var brickX = (c*(this.brickWidth+brickPad))+brickMarginLeft;
      var brickY = (r*(this.brickHeight+brickPad))+brickMarginTop;
      this.brickArray[c][r] = new Brick(brickX, brickY);
    }
  }
};

Game.prototype.runPopulateBrickArray = function() {
  this.populateBrickArray();
};

Game.prototype.passedBall = function() {
  if (this.ball.bottomCollision(this.canvas.height, this.score.playerLives) === true) {
    this.score.playerLives--;
    this.gameRestart();
    this.gameMode = 4;
  }
  if (this.ball.bottomCollision(this.canvas.height, this.score.playerLives) === false) {
    this.score.playerLives--;
    this.gameMode = 2;
  }
};

Game.prototype.allBallActions = function() {
  this.passedBall();
  this.ball.move(this.gameMode);
};

Game.prototype.levelUp = function() {
  this.ball.x = this.canvas.width/2;
  this.ball.y = this.canvas.height - this.paddle.h - this.ball.radius;
  this.paddle.w = this.paddle.w * 3 / 4;
  this.paddle.x = (this.canvas.width - this.paddle.w)/2;
  this.paddle.dirX = 14;
  this.ball.dirX = 8;
  this.ball.dirY = -8;
  this.score.levelReset();
  this.gameMode = 3;
};

Game.prototype.gameRestart = function () {
  this.ball.x = this.canvas.width/2;
  this.ball.y = this.canvas.height - this.paddle.h - this.ball.radius;
  this.paddle.x = (this.canvas.width - this.paddle.w)/2;
  this.paddle.y = this.canvas.height - this.paddle.h;
  this.ball.dirX = 6;
  this.ball.dirY = -6;
  this.score.fullReset();
};

Game.prototype.gameStart = function() {
  this.context.clearRect(0, 0, this.canvas.width,
  this.canvas.height);
  this.runPopulateBrickArray();
  this.paddle.draw();
  this.paddle.move(this.rightPressed, this.leftPressed);
  this.allBallActions();
  this.score.textUpdate(this.context, this.canvas, this.gameMode);
  this.drawBricks();
  if (this.score.level === 1) {
    this.paddle.w = 200;
  }
};

Game.prototype.gameEnd = function() {
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.paddle.draw();
  this.ball.draw();
  this.score.textUpdate(this.context, this.canvas, this.gameMode);
  this.drawBricks();
  this.gameRestart();
};

Game.prototype.gamePause = function() {
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.paddle.draw();
  this.paddle.move(this.rightPressed, this.leftPressed);
  this.allBallActions();
  this.score.textUpdate(this.context, this.canvas, this.gameMode);
  this.drawBricks();
};

Game.prototype.gameAnimate = function() {
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.paddle.draw();
  this.paddle.move(this.rightPressed, this.leftPressed);
  this.allBallActions();
  this.score.textUpdate(this.context, this.canvas, this.gameMode);
  this.drawBricks();
  this.ballRectCollision();
};

Game.prototype.gameWin = function() {
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.paddle.draw();
  this.allBallActions();
  this.score.textUpdate(this.context, this.canvas, this.gameMode);
  this.drawBricks();
  this.gameMode = 5;
  this.ball.dirX = 0;
  this.ball.dirY = 0;
};

Game.prototype.gameTime = function() {
  if(this.gameMode === 0 || this.gameMode === 3) {
    this.gameStart();
  }
  if(this.gameMode === 1) {
    this.gameAnimate();
  }
  if (this.gameMode === 2){
    this.gamePause();
  }
  if (this.gameMode === 4) {
    this.gameEnd();
  }
  if (this.score.bricksAlive === 0 && this.score.level === 1) {
    this.levelUp();
  }
  if (this.score.bricksAlive === 0 && this.score.level === 2) {
    this.gameWin();
  }
};

module.exports = Game;
