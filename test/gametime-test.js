var chai = require('chai');
var assert = chai.assert;
var Game = require('../lib/gametime');

describe('Game', function(){
  context('with default attributes', function() {
    var game = new Game({}, {});

    it('should be a function', function() {
      assert.isFunction(Game);
    });

    it('should have a canvas property', function(){
      assert.property(game, 'canvas');
    });

    it('should have a context property', function (){
      assert.property(game, 'context');
    });

    it('should have a paddle property', function (){
      assert.property(game, 'paddle');
    });

    it('should have a score property', function (){
      assert.property(game, 'score');
    });

    it('should have a ball property', function (){
      assert.property(game, 'ball');
    });

    it('should have a context property', function (){
      assert.property(game, 'context');
    });

    it('should have a default rightPressed value of 0', function (){
      assert.equal(game.rightPressed, false);
    });

    it('should have a default leftPressed value of 0', function (){
      assert.equal(game.leftPressed, false);
    });

    it('should have an empty brickArray by default', function (){
      assert.equal(game.brickArray, []);
    });

    it('should have 4 brickRows by default', function (){
      assert.equal(game.brickRows, 4);
    });

    it('should have 6 brickColumns by default', function (){
      assert.equal(game.brickColumns, 6);
    });

    it('should have a brickWidth of 100 by default', function (){
      assert.equal(game.brickWidth, 100);
    });

    it('should have a brickHeight of 25 by default', function (){
      assert.equal(game.brickHeight, 25);
    });
  });
});
