var chai = require('chai');
var assert = chai.assert;
var Ball = require('../lib/ball');

describe('Ball', function(){
  context('with default attributes', function() {
    var ball = new Ball({width: 200, height: 200}, {}, {h: 10});

    it('should be a function', function() {
      assert.isFunction(Ball);
    });

    // it('should have a gameOn property set to false when instantiated', function() {
    //   assert.equal(ball.gameOn, false);
    // });

    it('has a canvas property', function() {
      assert.property(ball.cvs, 'canvas');
    });

    it('has a context property', function() {
      assert.property(ball, 'context');
    });

    it('has a paddle property', function() {
      assert.property(ball, 'paddle');
    });

    it('has a radius property set to 15 when instantiated', function() {
      assert.equal(ball.radius, 15);
    });

    it('should have an x property equal to half the canvas width', function() {
      assert.equal(ball.x, 100);
    });

    it('should have a y property equal to the canvas height less the paddle height and its radius', function() {
      assert.equal(ball.y, 175);
    });

    it('should have a property to represent the context object', function() {

    });
  });
});
