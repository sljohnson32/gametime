var chai = require('chai');
var assert = chai.assert;
var Ball = require('../lib/ball');

describe('Ball', function(){
  context('with default attributes', function() {
    var ball = new Ball({width: 200, height: 200}, {}, {h: 10});

    it('should be a function', function() {
      assert.isFunction(Ball);
    });

    it('has a canvas property', function() {
      assert.property(ball, 'cvs');
    });

    it('has a context property', function() {
      assert.property(ball, 'ctx');
    });

    it('has a paddle property', function() {
      assert.property(ball, 'pad');
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
  });
});

var chai = require('chai');
var assert = chai.assert;
var Ball = require('../lib/ball');

describe(' ', function(){
  context('on action', function() {
    var ball = new Ball({width: 200, height: 200}, {}, {h: 10});

    it('should be in the center of the paddle if gameMode is 0, 2, or 3', function() {

    });

    it('should be moving if gameMode is 1', function() {

    });


  });
});

var chai = require('chai');
var assert = chai.assert;
var Ball = require('../lib/ball');

describe(' ', function(){
  context('on paddleBounce', function() {
    var ball = new Ball({width: 200, height: 200}, {}, {h: 10});

    it('', function() {

    });

    it('', function() {

    });

    it('', function() {

    });

    it('', function() {

    });

    it('', function() {

    });


  });
});

var chai = require('chai');
var assert = chai.assert;
var Ball = require('../lib/ball');

describe(' ', function(){
  context('on bottomCollision', function() {
    var ball = new Ball({width: 200, height: 200}, {}, {h: 10});

    it('should return true if ball hits the bottom of the canvas at 1 life', function() {

    });

    it('should return false if ball hits the bottom of the canvas if you have 2 or more lives', function() {

    });


  });
});
