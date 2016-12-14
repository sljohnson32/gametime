var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var Game = require('./gametime');

var game = new Game(context, canvas);

document.addEventListener('keydown', function(e) {
  if(e.keyCode == 39) {
    game.rightPressed = true;
  }
  if(e.keyCode == 37) {
    game.leftPressed = true;
  }
  if(e.keyCode == 13) {
    if(game.gameMode === 0 || game.gameMode === 2) {
      game.gameMode = 1;
    }
    if(game.gameMode === 4) {
      game.gameMode = 0;
    }
    if (game.gameMode === 3) {
      game.gameMode = 1;
    }
    if(game.gameMode === 5) {
      game.gameRestart();
      game.gameMode = 0;
    }
  }
});

document.addEventListener('keyup', function(e) {
  if(e.keyCode == 39) {
    game.rightPressed = false;
  }
  if(e.keyCode == 37) {
    game.leftPressed = false;
  }
});

function animateGame() {
  game.gameTime();
  requestAnimationFrame(animateGame);
}

animateGame(); 
