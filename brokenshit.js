var Brick = require('./brick');
var Ball = require('./ball');
var Paddle = require('./paddle');
var Level = require('./level');

document.addEventListener("keydown", Game.keyDown);
document.addEventListener("keyup", Game.keyUp);


function Game(canvas, context, level) {
  this.canvas = canvas;
  this.context = context;
  this.gameMode = 0;
  this.paddle = new Paddle(this.canvas, this.context, {});
  this.ball = new Ball(this.canvas, this.context, paddle);
  this.lives = level.lives || 3;

  this.brickArray = [];
  this.brickRows = 4;
  this.brickColumns = 8;
  this.brickWidth = 70;
  this.brickHeight = 25;

  this.rightPressed = false;
  this.leftPressed = false;

  this.score = {
    blocksAlive: brickArray.length * brickRows,
    blocksDestroyed: 0,
    playerLives: 3
  };

  // function gameModeSwitcher() {
  //
  // }

  Game.prototype.ballRectCollision = function() {
    brickArray.forEach(function (brickR) {
      brickR.forEach(function (brick) {

        var distX = Math.abs(this.ball.x - brick.x - brickWidth/2);
        var distY = Math.abs(this.ball.y - brick.y - brickHeight/2);

        if (distX > (brickWidth + this.ball.radius)) {
          return false;
        }
        if (distX <= (brickWidth/2) && distY <= (brickHeight/2)) {
          console.log('Ball Collided at' + brick.x + ' ' + brick.y);
          this.ball.dirY = -this.ball.dirY;
          brick.alive = false;
          brick.x = -1000;
          brick.y = -1000;
          this.score.blocksDestroyed++;
          this.score.blocksAlive--;
          // $('#player-score').text(this.score.blocksDestroyed);

        }
        if (distY > (this.brickHeight + this.ball.radius)) {
          // score.playerLives--;
          // console.log(score.playerLives);
          // $('#player-lives').text(score.playerLives);
          return false;
        }
      });
    });
    return this;
  };

  Game.prototype.drawBricks = function() {
    // if (brickAlive === true) {
    for(c=0; c<brickColumns; c++) {
      for(r=0; r<brickRows; r++) {
        if (this.brickArray[c][r].alive === true) {
        this.context.beginPath();
        this.context.rect(this.brickArray[c][r].x, this.brickArray[c][r].y, brickWidth, brickHeight);
        this.context.fillStyle = "#000000";
        this.context.fill();
        this.context.closePath();
      }
      }
    }
    return this;
  };

  Game.prototype.populateBrickArray = function() {
    for(c=0; c<brickColumns; c++) {
       this.brickArray[c] = [];
      for(r=0; r<brickRows; r++) {
        var brickPad = 10;
        var brickMarginTop = 30;
        var brickMarginLeft = 30;
        var brickX = (c*(this.brickWidth+brickPad))+brickMarginLeft;
        var brickY = (r*(this.brickHeight+brickPad))+brickMarginTop;
        this.brickArray[c][r] = new Brick(brickX, brickY);
      }
    }
    return this;
  };

  Game.prototype.keyDown = function(e) {
    if(e.keyCode == 39) {
      this.rightPressed = true;
    }
    if(e.keyCode == 37) {
      this.leftPressed = true;
    }
    if(e.keyCode ==13) {
      this.gameMode = 1;
      console.log(gameMode);
    }
    return this;
  };

  Game.prototype.keyUp = function(e) {
    if(e.keyCode == 39) {
      this.rightPressed = false;
    }
    if(e.keyCode == 37) {
      this.leftPressed = false;
    }
    return this;
  };

  Game.prototype.gameReset = function() {
    if (this.ball.dirX === 0) {
      this.gameMode = 2;
    }
    return this;
  };

  Game.prototype.startBall = function(){
    if (this.gameMode === 0) {
      this.ball.x = paddle.x + (paddle.w / 2);
    }

    if (this.gameMode === 1) {
      this.ball.x += this.ball.dirX;
      this.ball.y += this.ball.dirY;
    }
    return this;
  };

  Game.prototype.ballMove = function() {
    this.ball.draw().bounceBottom().bounceTop().bounceSide();
    Game.startBall();
    Game.gameReset();
    return this;
  };

  Game.prototype.gameTime = function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    paddle.draw();
    paddle.move(this.rightPressed, this.leftPressed);
    ballMove();
    drawBricks();
    ballRectCollision();
  };
}

module.exports = Game;
