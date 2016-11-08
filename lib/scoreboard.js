function Scoreboard () {
  this.bricksAlive = 24;
  this.bricksDestroyed = 0;
  this.playerLives = 3;
  this.level = 1;
}

Scoreboard.prototype.fullReset = function() {
  this.level = 1;
  this.playerLives = 3;
  this.bricksDestroyed = 0;
  this.bricksAlive = 24;
  return this;
};

Scoreboard.prototype.levelReset = function() {
  this.level++;
  this.bricksAlive = 24;
  return this;
};

module.exports = Scoreboard;
