var chai = require('chai');
var assert = chai.assert;
var stub = require('./support/stub');
var Bricks = require('../lib/bricks');

describe('Bricks', function(){
  context('with default attributes', function() {
    var bricks = new Brick ({});

    it('should be a function', function() {
      assert.isFunction(Brick);
    });

    it('should have an empty brickArray by default', function() {
      assert.equal(Brick.brickArray, []);
    });

    it('should have a brickAlive value of true by default', function() {
      assert.equal(Brick.brickAlive, 'true');
    });

    it('should add a brick to the column if c < brickColums', function(){

    });

    it('should add a brick to the row if c < brickRows', function(){

    });

    it('should have 4 rows and 8 columns made of bricks w/ width of 70 and height of 25', function () {

    });
  });
});
