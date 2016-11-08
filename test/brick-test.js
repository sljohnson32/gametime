var chai = require('chai');
var assert = chai.assert;
var Brick = require('../lib/brick');

describe('Brick', function(){
  context('with default attributes', function() {
    var brick = new Brick(25, 100);

    it('should be a function', function() {
      assert.isFunction(Brick);
    });

    it('should assign an x value to the brick', function () {
      assert.equal(brick.x, 25);
    });

    it('should assign a y value to the brick', function () {
      assert.equal(brick.y, 100);
    });

    it('should be alive by default', function() {
      assert.equal(brick.alive, true);
    });


  });
});
