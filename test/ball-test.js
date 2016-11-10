var chai = require('chai');
var assert = chai.assert;
var Ball = require('../lib/ball');

describe('Ball', function(){
  context('with default attributes', function() {
    var ball = new Ball({width: 700, height: 550}, {}, {h: 10});

    it('should be a function', function() {
      assert.isFunction(Ball);
    });

    it('should have a canvas property', function() {
      assert.property(ball, 'cvs');
    });

    it('should have a context property', function() {
      assert.property(ball, 'ctx');
    });

    it('should have a paddle property', function() {
      assert.property(ball, 'pad');
    });

    it('should have a radius property set to 15 when instantiated', function() {
      assert.equal(ball.radius, 15);
    });

    it('should have an x property equal to half the canvas width', function() {
      assert.equal(ball.x, 350);
    });

    it('should have a y property equal to the canvas height less the paddle height and its radius', function() {
      assert.equal(ball.y, 525);
    });
  });

  context('on action', function() {
    var ball = new Ball({width: 700, height: 550}, {}, {h: 10, w: 200, x: 250}, {});

    it('should have x property aligned with paddle when gameMode is set to 0', function() {
      ball.action(0);
      assert.equal(ball.x, 350);
    });

    it('should have x property aligned with paddle when gameMode is set to 2', function() {
      ball.action(2);
      assert.equal(ball.x, 350);
    });

    it('should have x property aligned with paddle when gameMode is set to 3', function() {
      ball.action(3);
      assert.equal(ball.x, 350);
    });

    it('should have x property that is incrementing by 6 when gameMode is equal to 1', function() {
      ball.action(1);
      assert.equal(ball.x, 356);
    });

    it('should have y property that is decrementing by 6 when gameMode is equal to 1', function() {
      ball.action(1);
      assert.equal(ball.y, 513);
    });
  });

  context('on paddleBounce', function() {
    var ball = new Ball({width: 700, height: 550}, {}, {h: 10, w: 200, x: 250}, {});

    it('should have a property dirY that reverses when ball hits the top of canvas', function() {
      ball.y = 5;
      ball.bounceTop();
      assert.equal(ball.dirY, 6);
    });

    it('should have a property dirX that gets set to negative when ballhits the right side of the canvas', function() {
      ball.x = 680;
      ball.bounceSide();
      assert.equal(ball.dirX, -6);
    });

    it('should have a property dirX that gets set to positive when ball hits the left side of the canvas', function() {
      ball.x = 20;
      ball.bounceSide();
      assert.equal(ball.dirX, 6);
    });

    it('should have a property of dirY that gets set to negative when it hits the left side of the paddle', function() {
      ball.y = 540;
      ball.x = 255;
      ball.dirX = 6;
      ball.paddleBounce();
      assert.equal(ball.dirY, -6);
    });

    it('should have a property of dirX that gets reversed when it hits the right side of the paddle', function() {
      ball.y = 540;
      ball.x = 445;
      ball.dirX = -6;
      ball.paddleBounce();
      assert.equal(ball.dirX, 6);
    });
  });

  context('on bottomCollision', function() {
    var ball = new Ball({width: 700, height: 550}, {}, {h: 10, w: 200, x: 250}, {});

    it('should return true if ball hits the bottom of the canvas at 1 life', function() {
      this.y = 549;
      this.dirY = 6;
      assert.equal(ball.bottomCollision(550, 1), true);
    });

    it('should return false if ball hits the bottom of the canvas if you have 2 or more lives', function() {
      this.y = 549;
      this.dirY = 6;
      assert.equal(ball.bottomCollision(550, 2), false);
    });
  });
});
