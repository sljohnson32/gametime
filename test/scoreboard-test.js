var chai = require('chai');
var assert = chai.assert;
var Scoreboard = require('../lib/scoreboard');

describe('Scoreboard', function(){
  context('with default attributes', function() {
    var scoreboard = new Scoreboard();

    it('should be a function', function() {
      assert.isFunction(Scoreboard);
    });

    it('should default to 24 bricksAlive', function() {
      assert.equal(scoreboard.bricksAlive, 24);
    });

    it('should default to 0 bricksDestroyed', function() {
      assert.equal(scoreboard.bricksDestroyed, 0);
    });

    it('should default to 3 playerLives', function() {
      assert.equal(scoreboard.playerLives, 3);
    });

    it('should default to level 1', function() {
      assert.equal(scoreboard.level, 1);
    });
  });

  context('on levelReset', function() {
    var scoreboard = new Scoreboard();
    scoreboard.level = 1;
    scoreboard.playerLives = 1;
    scoreboard.bricksDestroyed = 10;
    scoreboard.bricksAlive = 14;
    scoreboard.levelReset();

    it('should be a function', function() {
      assert.isFunction(scoreboard.levelReset);
    });

    it('should increase level by 1 on levelReset', function(){
      scoreboard.levelReset();
      assert.equal(scoreboard.level, 3);
    });

    it('should default to 24 bricksAlive on levelReset', function(){
      scoreboard.levelReset();
      assert.equal(scoreboard.bricksAlive, 24);
    });
  });

  context('on fullReset', function() {
    var scoreboard = new Scoreboard();
    scoreboard.level = 2;
    scoreboard.playerLives = 1;
    scoreboard.bricksDestroyed = 10;
    scoreboard.bricksAlive = 14;
    scoreboard.fullReset();

    it('should be a function', function() {
      assert.isFunction(scoreboard.fullReset);
    });

    it('should default to level 1 on fullReset', function() {

      assert.equal(scoreboard.level, 1);
    });

    it('should default to 3 playerLives on fullReset', function() {

      assert.equal(scoreboard.playerLives, 3);
    });

    it('should default to 24 bricksAlive on fullReset', function() {

      assert.equal(scoreboard.bricksAlive, 24);
    });

    it('should default to 0 bricksDestroyed on fullReset', function() {

      assert.equal(scoreboard.bricksDestroyed, 0);
    });
  });

  context('canvas text display', function() {
    var scoreboard = new Scoreboard();

    it('should be a function (scoreText)', function() {
      assert.isFunction(scoreboard.scoreText);
    });

    it('should be a function (levelText)', function() {
      assert.isFunction(scoreboard.levelText);
    });

    it('should be a function (livesText)', function() {
      assert.isFunction(scoreboard.livesText);
    });

    it('should be a function (modeText)', function() {
      assert.isFunction(scoreboard.modeText);
    });

    it('should be a function (textUpdate)', function() {
      assert.isFunction(scoreboard.textUpdate);
    });

  });
});
