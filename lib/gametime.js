//
//
// var canvas = document.getElementById('game');
// var context = canvas.getContext('2d');
//
// var Brick = require('./brick');
//
// var rightPressed = false;
// var leftPressed = false;
// var gameOn = false;
//
// var brickArray = [];
// var brickRows = 4;
// var brickColumns = 8;
// var brickWidth = 70;
// var brickHeight = 25;
// var brickAlive = true;
//
// var ball = {
//   radius: 15,
//   x: canvas.width/2,
//   y: 465,
//   dirX: 6,
//   dirY: -6,
// };
//
// var paddle = {
//   h: 20,
//   w: 100,
//   x: (canvas.width - 100)/2,
//   y: canvas.height - 20,
// };
//
// function ballRectCollision () {
//   brickArray.forEach(function (brickR) {
//     brickR.forEach(function (brick) {
//
//       var distX = Math.abs(ball.x - brick.x - brickWidth/2);
//       var distY = Math.abs(ball.y - brick.y - brickHeight/2);
//
//       if (distX > (brickWidth + ball.radius)) {
//         return false;
//       }
//       if (distX <= (brickWidth/2) && distY <= (brickHeight/2)) {
//         console.log('Ball Collided at' + brick.x + ' ' + brick.y);
//         ball.dirY = -ball.dirY;
//         brickAlive.child = false;
//         brick.x = -1000;
//         brick.y = -1000;
//       }
//       if (distY > (brickHeight + ball.radius)) {
//         return false;
//       }
//     });
//   });
// }
//
// function drawBricks() {
//   // if (brickAlive === true) {
//   for(c=0; c<brickColumns; c++) {
//     for(r=0; r<brickRows; r++) {
//       if (brickAlive === true) {
//       // if (brickArray[c][r].brickAlive === true) {
//       context.beginPath();
//       context.rect(brickArray[c][r].x, brickArray[c][r].y, brickWidth, brickHeight);
//       context.fillStyle = "#000000";
//       context.fill();
//       context.closePath();
//     }
//     }
//   }
// }
// //
// // function Brick (x, y) {
// //   this.x = x;
// //   this.y = y;
// // }
//
// function populateBrickArray() {
//   for(c=0; c<brickColumns; c++) {
//      brickArray[c] = [];
//     for(r=0; r<brickRows; r++) {
//       var brickPad = 10;
//       var brickMarginTop = 30;
//       var brickMarginLeft = 30;
//       var brickX = (c*(brickWidth+brickPad))+brickMarginLeft;
//       var brickY = (r*(brickHeight+brickPad))+brickMarginTop;
//       brickArray[c][r] = new Brick(brickX, brickY);
//     }
//   }
// }
//
// document.addEventListener("keydown", keyDownHandler);
// document.addEventListener("keyup", keyUpHandler);
//
// function keyDownHandler(e) {
//   if(e.keyCode == 39) {
//     rightPressed = true;
//   }
//   if(e.keyCode == 37) {
//     leftPressed = true;
//   }
//   if(e.keyCode ==13) {
//     gameOn = true;
//   }
// }
//
// function keyUpHandler(e) {
//   if(e.keyCode == 39) {
//     rightPressed = false;
//   }
//   if(e.keyCode == 37) {
//     leftPressed = false;
//   }
// }
//
// function paddleMove() {
//   if (rightPressed === true && paddle.x < canvas.width - paddle.w) {
//     paddle.x += 6;
//   }
//   if (leftPressed === true && paddle.x > 0) {
//     paddle.x -= 6;
//   }
// }
//
// function drawBall () {
//   context.fillStyle = 'magenta';
//   context.beginPath();
//   context.arc(ball.x,ball.y,ball.radius,0,2*Math.PI);
//   context.fill();
// }
//
// function ballMove() {
//   if (gameOn === true) {
//     ball.x += ball.dirX;
//     ball.y += ball.dirY;
//   }
//   if(ball.x + ball.dirX + ball.radius > canvas.width || ball.x + ball.dirX - ball.radius < 0) {
//     ball.dirX = -ball.dirX;
//   }
//   if(ball.y + ball.dirY < ball.radius) {
//     ball.dirY = -ball.dirY;
//   }
//   if (ball.y + ball.dirY > canvas.height - ball.radius - paddle.h) {
//     if (ball.x > paddle.x && ball.x < paddle.x + paddle.w) {
//       ball.dirY = -ball.dirY;
//     } else if (ball.y + ball.dirY > canvas.height) {
//       // alert('Game Over!');
//       document.location.reload();
//       }
//     }
//   }
//
// function draw() {
//   context.fillStyle = 'blue';
//   context.fillRect(paddle.x, paddle.y, paddle.w, paddle.h);
//   drawBall();
//   drawBricks();
// }
//
// populateBrickArray();
//
// requestAnimationFrame(function gameLoop() {
//   context.clearRect(0, 0, canvas.width, canvas.height);
//   draw();
//   paddleMove();
//   ballMove();
//   ballRectCollision ();
//   requestAnimationFrame(gameLoop);
// });
