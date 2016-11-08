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

    it('should default to level 1 on fullReset', function() {
      scoreboard.fullReset();
      assert.equal(scoreboard.level, 1);
    });

    it('should default to 3 playerLives on fullReset', function() {
      scoreboard.fullReset();
      assert.equal(scoreboard.playerLives, 3);
    });

    it('should default to 24 bricksAlive on fullReset', function() {
      scoreboard.fullReset();
      assert.equal(scoreboard.bricksAlive, 24);
    });

    it('should default to 0 bricksDestroyed on fullReset', function() {
      scoreboard.fullReset();
      assert.equal(scoreboard.bricksDestroyed, 0);
    });

    it('should increase level by 1 on levelReset', function(){
      scoreboard.levelReset();
      assert.equal(scoreboard.level, 2);
    });

    it('should default to 24 bricksAlive on levelReset', function(){
      scoreboard.levelReset();
      assert.equal(scoreboard.bricksAlive, 24);
    });
  });
});
