var chai = require('chai');
var assert = chai.assert;
var Scoreboard = require('../lib/scoreboard');

describe('Scoreboard', function(){
  context('with default attributes', function() {
    it('should be a function', function() {
      assert.isFunction(Scoreboard);
    });
  });
});
