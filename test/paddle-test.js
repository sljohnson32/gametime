var chai = require('chai');
var assert = chai.assert;
var Paddle = require('../lib/paddle');

describe('paddle', function(){
  context('with default attributes', function() {
    var paddle = new Paddle({width: 400, height: 400}, {}, {});

    it('should be a function', function() {
      assert.isFunction(Paddle);
    });

    it('should have a canvas property', function() {
      assert.property(paddle, 'canvas');
    });

    it('should have a context property', function() {
      assert.property(paddle, 'context');
    });

    it('should have an h property set to 15 by default when instantiated', function() {
      assert.equal(paddle.h, 15);
    });

    it('should have a w property set to 200 by default when instantiated', function() {
      assert.equal(paddle.w, 200);
    });

    it('should have an x property set to equal half of the the width of the canvas minus the value of the w property', function() {
      assert.equal(paddle.x, 100);
    });

    it('should have a y property set to equal the height of the canvas property minus the value of the h property', function() {
      assert.equal(paddle.y, 385);
    });
  });

  context('on draw', function() {
    var paddle = new Paddle({width: 700, height: 550}, {}, {});

    it('should be a function', function() {
      assert.isFunction(paddle.draw);
    });
  });

  context('on move', function() {
    var paddle = new Paddle({width: 700, height: 550}, {}, {});

    it('should be a function', function() {
      assert.isFunction(paddle.move);
    });

    it('should have x property that increments by 10 when right arrow is pressed', function() {
      paddle.move(true, false);
      assert.equal(paddle.x, 260);
    });

    it('should have x property that decrements by 10 when left arrow is pressed', function() {
      paddle.move(false, true);
      assert.equal(paddle.x, 250);
    });
  });
});
