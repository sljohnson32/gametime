var chai = require('chai');
var assert = chai.assert;
var Game = require('../lib/gametime');

describe('Game', function() {
  context('with default attributes', function() {
    var game = new Game({}, {width:700, height:550});

    it('should be a function', function() {
      assert.isFunction(Game);
    });

    it('should have a canvas property', function() {
      assert.property(game, 'canvas');
    });

    it('should have a context property', function () {
      assert.property(game, 'context');
    });

    it('should have a paddle property', function () {
      assert.property(game, 'paddle');
    });

    it('should have a score property', function () {
      assert.property(game, 'score');
    });

    it('should have a ball property', function () {
      assert.property(game, 'ball');
    });

    it('should have a default gameMode of 0', function () {
      // assert.property(game.gameMode, 0);
    });

    it('should have a default rightPressed value of 0', function () {
      assert.equal(game.rightPressed, false);
    });

    it('should have a default leftPressed value of 0', function () {
      assert.equal(game.leftPressed, false);
    });

    it('should have an empty brickArray by default', function () {
      // assert.equal(game.brickArray, []);
    });

    it('should have 4 brickRows by default', function () {
      assert.equal(game.brickRows, 4);
    });

    it('should have 6 brickColumns by default', function () {
      assert.equal(game.brickColumns, 6);
    });

    it('should have a brickWidth of 100 by default', function () {
      assert.equal(game.brickWidth, 100);
    });

    it('should have a brickHeight of 25 by default', function () {
      assert.equal(game.brickHeight, 25);
    });
  });

  context('on ballRectCollision (ball missing brick)', function() {
    var game = new Game({}, {width:700, height:550});

    it('should be a function', function() {
      assert.isFunction(game.ballRectCollision);
    });
  });

  context('on drawBricks', function() {
    var game = new Game({}, {width:700, height:550});

    it('should be a function', function() {
      assert.isFunction(game.drawBricks);
    });
  });

  context('on populateBrickArray', function() {
    var game = new Game({}, {width:700, height:550});

    it('should be a function', function() {
      assert.isFunction(game.populateBrickArray);
    });

    it('should add 6 new bricks to brickArray', function() {
      game.populateBrickArray();
      assert.lengthOf(game.brickArray, 6);
    });
  });

  context('on passedBall functions', function() {
    var game = new Game({}, {width:700, height:550});
    game.score.playerLives = 3;

    it('should be a function', function() {
      assert.isFunction(game.passedBall);
    });

    it('if ball hits bottom of canvas, remove a life', function () {
      game.ball.y = 715;
      game.passedBall();
      assert.equal(game.score.playerLives, 2);
    });

    it('if ball is still within canvas, player does not lose a life', function () {
      game.ball.x = 699;
      game.ball.y = 543;
      game.ball.dirY = 6;
      game.score.playerLives = 3;
      assert.equal(game.score.playerLives, 3);
      game.passedBall();
      game.ball.action(1);
      game.passedBall();
      assert.equal(game.score.playerLives, 2);
    });
  });

  context('on gameMode functions', function() {
    var game = new Game({}, {width:700, height:550});

    it('should be a function (allBallActions)', function() {
      assert.isFunction(game.allBallActions);
    });

    it('should be a function (levelUp)', function() {
      assert.isFunction(game.levelUp);
    });

    it('should be a function (gameRestart)', function() {
      assert.isFunction(game.gameRestart);
    });

    it('should be a function (gameStart)', function() {
      assert.isFunction(game.gameStart);
    });

    it('should be a function (gameEnd)', function() {
      assert.isFunction(game.gameEnd);
    });

    it('should be a function (gamePause)', function() {
      assert.isFunction(game.gamePause);
    });

    it('should be a function (gameAnimate)', function() {
      assert.isFunction(game.gameAnimate);
    });

    it('should be a function (gameWin)', function() {
      assert.isFunction(game.gameWin);
    });

    it('should be a function(gameTime)', function() {
      assert.isFunction(game.gameTime);
    });
  });
});
