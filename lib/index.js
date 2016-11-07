var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var gameTime = require('./gametime');


function animateGame() {
  gameTime();
  requestAnimationFrame(animateGame);
}

animateGame();
