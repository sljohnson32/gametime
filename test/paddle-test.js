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
});
