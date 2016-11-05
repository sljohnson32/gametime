var chai = require('chai');
var assert = chai.assert;
var Brick = require('../lib/brick');

describe('Brick', function(){
  context('with default attributes', function() {
    var brick = new Brick();

    it('should be a function', function() {
      assert.isFunction(Brick);
    });

    it('should assign an x value to the brick', function () {
      var brick = new Brick(75, 25);
      assert.equal(Brick.x, this.x);
    });

    it('should assign a y value to the brick', function () {
      assert.equal(Brick.y, this.y);
    });

    it('should be alive by default', function() {
      assert.equal(Brick.alive, this.alive);
    });

    // it('should have an empty brickArray by default', function() {
    //   assert.equal(Brick.brickArray, []);
    // });
    //
    // it('should have a brickAlive value of true by default', function() {
    //   assert.equal(Brick.brickAlive, 'true');
    // });
    //
    // it('should add a brick to the column if c < brickColums', function(){
    //
    // });
    //
    // it('should add a brick to the row if c < brickRows', function(){
    //
    // });
    //
    // it('should have 4 rows and 8 columns made of bricks w/ width of 70 and height of 25', function () {
    //
    // });
  });
});
