

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var gameTime = require('./gametime');

function animate() {
  gameTime();
  requestAnimationFrame(animate);
}

animate();

// module.exports = brickWorld;
