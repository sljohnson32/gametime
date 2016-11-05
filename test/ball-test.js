var chai = require('chai');
var assert = chai.assert;
var Ball = require('../lib/ball');

describe('Ball', function(){
  context('with default attributes', function() {
    var ball = new Ball({width: 20, height: 20}, {}, {h: 10});

    it('should be a function', function() {
      assert.isFunction(all);
    });
  });
});
