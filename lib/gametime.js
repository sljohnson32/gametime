var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var Brick = require('./brick');
var Ball = require('./ball');
var Paddle = require('./paddle');
var Level = require('./level');

var rightPressed = false;
var leftPressed = false;

var gameMode = 0;
var playerLives = 3;

var brickArray = [];
var brickRows = 4;
var brickColumns = 8;
var brickWidth = 70;
var brickHeight = 25;
populateBrickArray();

var paddle = new Paddle(canvas, context, {});
var ball = new Ball(canvas, context, paddle);

var score = {
  time: 60,
  blocksAlive: brickArray.length * brickRows,
  blocksDestroyed: 0,
};

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
        score.blocksDestroyed++;
        score.blocksAlive--;
        $('#player-score').text(score.blocksDestroyed);

      }
      if (distY > (brickHeight + ball.radius)) {
        // score.playerLives--;
        // console.log(score.playerLives);
        // $('#player-lives').text(score.playerLives);
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
    gameMode = 1;
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

function ballActions() {
  ball.draw();
  bottomCollision();
  ballMove();
  ball.bounceTop();
  ball.bounceSide();
}

populateBrickArray();

function gameTime() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  paddle.draw();
  paddle.move(rightPressed, leftPressed);
  ballActions();
  modeText();
  scoreText();
  livesText();
  drawBricks();
  ballRectCollision();
}

function scoreText() {
  context.font = "16px Arial";
  context.fillStyle = "#000";
  context.textAlign = "left";
  context.fillText("Score: "+score.blocksDestroyed, 8, 20);
}

function livesText() {
  context.font = "16px Arial";
  context.fillStyle = "#000";
  context.textAlign = "right";
  context.fillText("Lives: " + playerLives, (canvas.width -8), 20);
}

function modeText() {
  if(gameMode === 0) {
    context.font = "16px Arial";
    context.fillStyle = "#000";
    context.textAlign = 'center';
    context.fillText("Hit Enter to begin, and use left/right arrows to control the paddle", (canvas.width/2), (canvas.height/2));
  }

  if(gameMode === 2) {
    context.font = "16px Arial";
    context.fillStyle = "#000";
    context.textAlign = 'center';
    context.fillText("Hit enter, and try harder this time", (canvas.width/2), (canvas.height/2));
  }

  if(gameMode === 3) {
    context.font = "16px Arial";
    context.fillStyle = "#000";
    context.textAlign = 'center';
    context.fillText("You lost, but hit enter if you actually want to try hard on a new round", (canvas.width/2), (canvas.height/2));
  }
}

// function gameOver() {
//   if(playerLives === 0) {
//     ball.gameMode = 3;
//   }
// }

function bottomCollision() {
  if (ball.y + ball.dirY > canvas.height - ball.radius - paddle.h) {
    if (ball.x > paddle.x && ball.x < paddle.x + (paddle.w / 4)) {
      if (Math.sign(ball.dirX) === 1) {
        ball.dirY = -ball.dirY;
        ball.dirX = -ball.dirX;
      } else {
        ball.dirY = -ball.dirY;
      }
    }
    if (ball.x > paddle.x + (paddle.w / 4 * 3) && ball.x < paddle.x + paddle.w) {
      if (Math.sign(ball.dirX) === -1) {
        ball.dirY = -ball.dirY;
        ball.dirX = -ball.dirX;
      } else {
        ball.dirY = -ball.dirY;
      }
    }
    if (ball.x > paddle.x + (paddle.w / 4) && ball.x < paddle.x + (paddle.w / 4 * 3)) {
        ball.dirY = -ball.dirY;
      }

    else if (ball.y + ball.dirY > canvas.height) {
      if (playerLives === 1) {
        gameMode = 3;
      }
      else {
        playerLives--;
        gameMode = 2;
        console.log(gameMode);
      }
    }
  }
}

function ballMove() {
    if (gameMode === 2) {
      ball.x = paddle.x + (paddle.w / 2);
      ball.y = canvas.height - paddle.h - ball.radius;
    }

    if (gameMode === 1 ) {
      ball.x += ball.dirX;
      ball.y += ball.dirY;
    }
}

// function gameOn() {
//   if(ball.gameMode ==)
// }
// function drawScore() {
//   if()
//     context.font = "16px Arial";
//     context.fillStyle = "#0095DD";
//     context.fillText("Score: "+score.blocksDestroyed, 8, 20);
// }

module.exports = gameTime;
