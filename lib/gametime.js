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
var level = 1;

var brickArray = [];
var brickRows = 4;
var brickColumns = 6;
var brickWidth = 100;
var brickHeight = 25;

var paddle = new Paddle(canvas, context, {});
var ball = new Ball(canvas, context, paddle);

var score = {
  bricksAlive: 24,
  bricksDestroyed: 0,
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
        score.bricksDestroyed++;
        score.bricksAlive--;
        $('#player-score').text(score.bricksDestroyed);

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
      var brickMarginLeft = 25;
      var brickX = (c*(brickWidth+brickPad))+brickMarginLeft;
      var brickY = (r*(brickHeight+brickPad))+brickMarginTop;
      brickArray[c][r] = new Brick(brickX, brickY);
    }
  }
}

populateBrickArray();

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

function ballActions() {
  ball.draw();
  bottomCollision();
  ballMove();
  ball.bounceTop();
  ball.bounceSide();
}

function scoreText() {
  context.font = "16px Arial";
  context.fillStyle = "#000";
  context.textAlign = "left";
  context.fillText("Score: "+score.bricksDestroyed, 8, 20);
  levelText();
}

function levelText() {
  context.font = "16px Arial";
  context.fillStyle = "#000";
  context.textAlign = 'center';
  context.fillText("Level " + level, (canvas.width/2), 20);
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
    context.fillText("Hit Enter, and try harder this time", (canvas.width/2), (canvas.height/2));
  }

  if(gameMode === 3) {
    context.font = "16px Arial";
    context.fillStyle = "#000";
    context.textAlign = 'center';
    context.fillText("You destroyed the brick block! Hit Enter to start Level 2!", (canvas.width/2), (canvas.height/2));
  }

  if(gameMode === 4) {
    context.font = "16px Arial";
    context.fillStyle = "#000";
    context.textAlign = 'center';
    context.fillText("You lost, but hit Enter if you actually want to try harder and start a new game", (canvas.width/2), (canvas.height/2));
  }

  if(gameMode === 5) {
    context.font = "16px Arial";
    context.fillStyle = "#000";
    context.textAlign = 'center';
    context.fillText("You WON the game! Congrats! Hit Enter to play again.", (canvas.width/2), (canvas.height/2));
  }
}

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
        playerLives--;
        gameMode = 4;
        console.log(gameMode);
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
    if (gameMode === 2 || gameMode === 0 || gameMode === 3) {
      ball.x = paddle.x + (paddle.w / 2);
      ball.y = canvas.height - paddle.h - ball.radius;
    }

    if (gameMode === 1) {
      ball.x += ball.dirX;
      ball.y += ball.dirY;
    }
}

function levelUp() {
  ball.x = canvas.width/2;
  ball.y = canvas.height - paddle.h - ball.radius;
  paddle.w = paddle.w * 3 / 4;
  paddle.x = (canvas.width - paddle.w)/2;
  paddle.dirX = 14;
  ball.dirX = 8;
  ball.dirY = -8;
  level++;
  score.bricksAlive = 24;
  gameMode = 3;
}

function gameRestart () {
  ball.x = canvas.width/2;
  ball.y = canvas.height - paddle.h - ball.radius;
  paddle.x = (canvas.width - paddle.w)/2;
  paddle.y = canvas.height - paddle.h;
  ball.dirX = 6;
  ball.dirY = -6;
  level = 1;
  playerLives = 3;
  score.bricksDestroyed = 0;
  score.bricksAlive = 24;
}

function gameStart() {
  context.clearRect(0, 0, canvas.width,
  canvas.height);
  populateBrickArray();
  paddle.draw();
  paddle.move(rightPressed, leftPressed);
  ballActions();
  modeText();
  scoreText();
  livesText();
  drawBricks();
}

function gameEnd() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  paddle.draw();
  ball.draw();
  modeText();
  scoreText();
  livesText();
  drawBricks();
  gameRestart();
}

function gamePause() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  paddle.draw();
  paddle.move(rightPressed, leftPressed);
  ballActions();
  modeText();
  scoreText();
  livesText();
  drawBricks();
}

function gameAnimate() {
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

function gameWin() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  paddle.draw();
  ballActions();
  modeText();
  scoreText();
  livesText();
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
  if (score.bricksAlive === 0 && level === 1) {
    levelUp();
  }
  if (score.bricksAlive === 0 && level === 2) {
    gameWin();
  }
}

module.exports = gameTime;
