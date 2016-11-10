/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var canvas = document.getElementById('game');
	var context = canvas.getContext('2d');
	var gameTime = __webpack_require__(1);

	function animateGame() {
	  gameTime();
	  requestAnimationFrame(animateGame);
	}

	animateGame();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var canvas = document.getElementById('game');
	var context = canvas.getContext('2d');

	var Brick = __webpack_require__(2);
	var Ball = __webpack_require__(3);
	var Paddle = __webpack_require__(4);
	var Level = __webpack_require__(5);
	var Scoreboard = __webpack_require__(6);

	var rightPressed = false;
	var leftPressed = false;

	var gameMode = 0;
	// var playerLives = 3;
	// var level = 1;

	var brickArray = [];
	var brickRows = 4;
	var brickColumns = 6;
	var brickWidth = 100;
	var brickHeight = 25;

	var paddle = new Paddle(canvas, context, {});
	var ball = new Ball(canvas, context, paddle);
	var score = new Scoreboard();

	// var score = {
	//   bricksAlive: 24,
	//   bricksDestroyed: 0,
	//   playerLives: 3,
	//   level: 1,
	// };

	function ballRectCollision() {
	  brickArray.forEach(function (brickR) {
	    brickR.forEach(function (brick) {

	      var distX = Math.abs(ball.x - brick.x - brickWidth / 2);
	      var distY = Math.abs(ball.y - brick.y - brickHeight / 2);

	      if (distX > brickWidth + ball.radius) {
	        return false;
	      }
	      if (distX <= brickWidth / 2 && distY <= brickHeight / 2) {
	        console.log('Ball Collided at' + brick.x + ' ' + brick.y);
	        ball.dirY = -ball.dirY;
	        brick.destroyBrick();
	        score.bricksDestroyed++;
	        score.bricksAlive--;
	        $('#player-score').text(score.bricksDestroyed);
	      }
	      if (distY > brickHeight + ball.radius) {
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
	  for (c = 0; c < brickColumns; c++) {
	    for (r = 0; r < brickRows; r++) {
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
	  for (c = 0; c < brickColumns; c++) {
	    brickArray[c] = [];
	    for (r = 0; r < brickRows; r++) {
	      var brickPad = 10;
	      var brickMarginTop = 30;
	      var brickMarginLeft = 25;
	      var brickX = c * (brickWidth + brickPad) + brickMarginLeft;
	      var brickY = r * (brickHeight + brickPad) + brickMarginTop;
	      brickArray[c][r] = new Brick(brickX, brickY);
	    }
	  }
	}

	populateBrickArray();

	document.addEventListener("keydown", keyDown);
	document.addEventListener("keyup", keyUp);

	function keyDown(e) {
	  if (e.keyCode == 39) {
	    rightPressed = true;
	  }
	  if (e.keyCode == 37) {
	    leftPressed = true;
	  }
	  if (e.keyCode == 13) {
	    if (gameMode === 0 || gameMode === 2) {
	      gameMode = 1;
	    }
	    if (gameMode === 4) {
	      gameMode = 0;
	    }
	    if (gameMode === 3) {
	      gameMode = 1;
	    }
	    if (gameMode === 5) {
	      gameRestart();
	      gameMode = 0;
	    }
	  }
	}

	function keyUp(e) {
	  if (e.keyCode == 39) {
	    rightPressed = false;
	  }
	  if (e.keyCode == 37) {
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
	  context.fillText("Score: " + score.bricksDestroyed, 8, 20);
	  levelText();
	}

	function levelText() {
	  context.font = "16px Arial";
	  context.fillStyle = "#000";
	  context.textAlign = 'center';
	  context.fillText("Level " + score.level, canvas.width / 2, 20);
	}

	function livesText() {
	  context.font = "16px Arial";
	  context.fillStyle = "#000";
	  context.textAlign = "right";
	  context.fillText("Lives: " + score.playerLives, canvas.width - 8, 20);
	}

	function modeText() {
	  if (gameMode === 0) {
	    context.font = "16px Arial";
	    context.fillStyle = "#000";
	    context.textAlign = 'center';
	    context.fillText("Hit Enter to begin, and use left/right arrows to control the paddle", canvas.width / 2, canvas.height / 2);
	  }

	  if (gameMode === 2) {
	    context.font = "16px Arial";
	    context.fillStyle = "#000";
	    context.textAlign = 'center';
	    context.fillText("Hit Enter, and try harder this time", canvas.width / 2, canvas.height / 2);
	  }

	  if (gameMode === 3) {
	    context.font = "16px Arial";
	    context.fillStyle = "#000";
	    context.textAlign = 'center';
	    context.fillText("You destroyed the brick block! Hit Enter to start Level 2!", canvas.width / 2, canvas.height / 2);
	  }

	  if (gameMode === 4) {
	    context.font = "16px Arial";
	    context.fillStyle = "#000";
	    context.textAlign = 'center';
	    context.fillText("You lost, but hit Enter if you actually want to try harder and start a new game", canvas.width / 2, canvas.height / 2);
	  }

	  if (gameMode === 5) {
	    context.font = "16px Arial";
	    context.fillStyle = "#000";
	    context.textAlign = 'center';
	    context.fillText("You WON the game! Congrats! Hit Enter to play again.", canvas.width / 2, canvas.height / 2);
	  }
	}

	function bottomCollision() {
	  if (ball.y + ball.dirY > canvas.height - ball.radius - paddle.h) {
	    if (ball.x > paddle.x && ball.x < paddle.x + paddle.w / 4) {
	      if (Math.sign(ball.dirX) === 1) {
	        ball.dirY = -ball.dirY;
	        ball.dirX = -ball.dirX;
	      } else {
	        ball.dirY = -ball.dirY;
	      }
	    }

	    if (ball.x > paddle.x + paddle.w / 4 * 3 && ball.x < paddle.x + paddle.w) {
	      if (Math.sign(ball.dirX) === -1) {
	        ball.dirY = -ball.dirY;
	        ball.dirX = -ball.dirX;
	      } else {
	        ball.dirY = -ball.dirY;
	      }
	    }

	    if (ball.x > paddle.x + paddle.w / 4 && ball.x < paddle.x + paddle.w / 4 * 3) {
	      ball.dirY = -ball.dirY;
	    } else if (ball.y + ball.dirY > canvas.height) {
	      if (score.playerLives === 1) {
	        score.playerLives--;
	        gameMode = 4;
	        console.log(gameMode);
	      } else {
	        score.playerLives--;
	        gameMode = 2;
	        console.log(gameMode);
	      }
	    }
	  }
	}

	function ballMove() {
	  if (gameMode === 2 || gameMode === 0 || gameMode === 3) {
	    ball.x = paddle.x + paddle.w / 2;
	    ball.y = canvas.height - paddle.h - ball.radius;
	  }

	  if (gameMode === 1) {
	    ball.x += ball.dirX;
	    ball.y += ball.dirY;
	  }
	}

	function levelUp() {
	  ball.x = canvas.width / 2;
	  ball.y = canvas.height - paddle.h - ball.radius;
	  paddle.w = paddle.w * 3 / 4;
	  paddle.x = (canvas.width - paddle.w) / 2;
	  paddle.dirX = 14;
	  ball.dirX = 8;
	  ball.dirY = -8;
	  score.levelReset();
	  gameMode = 3;
	}

	function gameRestart() {
	  ball.x = canvas.width / 2;
	  ball.y = canvas.height - paddle.h - ball.radius;
	  paddle.x = (canvas.width - paddle.w) / 2;
	  paddle.y = canvas.height - paddle.h;
	  ball.dirX = 6;
	  ball.dirY = -6;
	  score.fullReset();
	}

	function gameStart() {
	  context.clearRect(0, 0, canvas.width, canvas.height);
	  populateBrickArray();
	  paddle.draw();
	  paddle.move(rightPressed, leftPressed);
	  ballActions();
	  modeText();
	  scoreText();
	  livesText();
	  drawBricks();
	  if (score.level === 1) {
	    paddle.w = 200;
	  }
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
	  if (gameMode === 0 || gameMode === 3) {
	    gameStart();
	  }
	  if (gameMode === 1) {
	    gameAnimate();
	  }
	  if (gameMode === 2) {
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

/***/ },
/* 2 */
/***/ function(module, exports) {

	function Brick(x, y) {
	  this.x = x;
	  this.y = y;
	  this.alive = true;
	}

	Brick.prototype.destroyBrick = function () {
	  this.alive = false;
	  this.x = -1000;
	};

	module.exports = Brick;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var gameTime = __webpack_require__(1);

	function Ball(canvas, context, paddle) {
	  this.canvas = canvas;
	  this.context = context;
	  this.paddle = paddle;
	  this.radius = 15;
	  this.x = canvas.width / 2;
	  this.y = canvas.height - this.paddle.h - this.radius;
	  this.dirX = 6;
	  this.dirY = -6;
	}

	Ball.prototype.draw = function () {
	  this.context.fillStyle = 'black';
	  this.context.beginPath();
	  this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
	  this.context.fill();
	  return this;
	};

	Ball.prototype.bounceTop = function () {
	  if (this.y + this.dirY < this.radius) {
	    this.dirY = -this.dirY;
	  }
	  return this;
	};

	Ball.prototype.bounceSide = function () {
	  if (this.x + this.dirX + this.radius > this.canvas.width || this.x + this.dirX - this.radius < 0) {
	    this.dirX = -this.dirX;
	  }
	  return this;
	};

	module.exports = Ball;

/***/ },
/* 4 */
/***/ function(module, exports) {

	function Paddle(canvas, context, options) {
	  this.canvas = canvas;
	  this.context = context;
	  this.h = options.h || 15;
	  this.w = options.w || 200;
	  this.x = (canvas.width - this.w) / 2;
	  this.y = canvas.height - this.h;
	  this.dirX = 10;
	}

	Paddle.prototype.draw = function () {
	  this.context.fillStyle = 'black';
	  this.context.fillRect(this.x, this.y, this.w, this.h);
	};

	Paddle.prototype.move = function (right, left) {
	  if (right === true && this.x < this.canvas.width - this.w) {
	    this.x += this.dirX;
	  }
	  if (left === true && this.x > 0) {
	    this.x -= this.dirX;
	  }
	};

	module.exports = Paddle;

/***/ },
/* 5 */
/***/ function(module, exports) {

	function Level() {
	  this.columns = [];
	  this.rows = [];
	  this.paddleWidth = [];
	  this.ballRadius = [];
	  this.lives = [];
	  this.ballSpeed = [];
	  this.time = [];
	}

	module.exports = Level;

/***/ },
/* 6 */
/***/ function(module, exports) {

	function Scoreboard() {
	  this.bricksAlive = 24;
	  this.bricksDestroyed = 0;
	  this.playerLives = 3;
	  this.level = 1;
	}

	Scoreboard.prototype.fullReset = function () {
	  this.level = 1;
	  this.playerLives = 3;
	  this.bricksDestroyed = 0;
	  this.bricksAlive = 24;
	  return this;
	};

	Scoreboard.prototype.levelReset = function () {
	  this.level++;
	  this.bricksAlive = 24;
	  return this;
	};

	module.exports = Scoreboard;

/***/ }
/******/ ]);
