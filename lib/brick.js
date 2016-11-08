function Brick (x, y) {
  this.x = x;
  this.y = y;
  this.alive = true;
}

Brick.prototype.destroyBrick = function() {
  this.alive = false;
  this.x = -1000;
};

module.exports = Brick;
