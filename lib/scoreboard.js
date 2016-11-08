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

Scoreboard.prototype.scoreText = function(ctx) {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#000";
  ctx.textAlign = "left";
  ctx.fillText("Score: " + this.bricksDestroyed, 8, 20);
};

Scoreboard.prototype.levelText = function(ctx, cvs) {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#000";
  ctx.textAlign = 'center';
  ctx.fillText("Level " + this.level, (cvs.width/2), 20);
};

Scoreboard.prototype.livesText = function(ctx, cvs) {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#000";
  ctx.textAlign = "right";
  ctx.fillText("Lives: " + this.playerLives, (cvs.width -8), 20);
};

Scoreboard.prototype.modeText = function(ctx, cvs, gameMode) {
  ctx.font = '20px Arial';
  ctx.fillStyle = "#000";
  ctx.textAlign = 'center';
  ctx.fillText(textArray[gameMode], (cvs.width/2), (cvs.height/2));
};

Scoreboard.prototype.textUpdate = function(ctx, cvs, gameMode) {
  this.scoreText(ctx);
  this.levelText(ctx, cvs);
  this.livesText(ctx, cvs);
  this.modeText(ctx, cvs, gameMode);
};

var textArray = ['Hit Enter to begin, and use left/right arrows to control the paddle', '','Hit Enter, and try harder this time', 'You destroyed the brick block! Hit Enter to start Level 2!', 'You lost, but hit Enter if you actually want to try harder and start a new game', 'You WON the game! Congrats! Hit Enter to play again.'];

module.exports = Scoreboard;
