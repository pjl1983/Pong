/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

function pong() {
    var canvas;
    var ctx;
    canvas = document.getElementById('pong');
    ctx = canvas.getContext("2d");
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    var ballPosX = 90;
    var ballPosY = canvasHeight / 2;
    var ballMoveX = 10;
    var ballMoveY = 10;
    var paddleMoveSpeed = 30;
    var paddleX = 50;
    var paddleY = canvasHeight / 2 - 100;
    var direction = 1;
    var score = 0;
    var keyCode = null;
    var keyPress = false;
    var ballOffset = 0;
    var gameOver = false;
    gameLoop();
    document.addEventListener('keydown', function (event) {
        keyCode = event.keyCode;
        keyPress = true;
    }, true);
    document.addEventListener('keyup', function (event) {
        keyPress = false;
    }, true);
    function ballDirection() {
        if (ballPosX <= 85 && (ballPosY > paddleY && ballPosY < paddleY + 200)) {
            ballMoveX = Math.abs(ballMoveX);
            ballMoveY = ballMoveY * direction;
            score = score + 1;
            ballMoveX = ballMoveX + 1;
            ballMoveY = ballMoveY + 1;
            ballOffset = Math.floor(Math.random() * (10 - (-10)) + (-10));
            ballPosY = ballPosY + ballOffset;
        }
        else if (ballPosX >= canvasWidth - 85) {
            ballMoveX = -ballMoveX;
        }
        else if (ballPosX <= 30) {
            gameOver = true;
        }
        else {
            if (ballPosX >= canvasWidth) {
                ballMoveX = -ballMoveX;
            }
            else if (ballPosX < 5) {
                ballMoveX = Math.abs(ballMoveX);
            }
            if (ballPosY >= canvasHeight) {
                ballMoveY = -ballMoveY;
            }
            else if (ballPosY < 5) {
                ballMoveY = Math.abs(ballMoveY);
            }
        }
        ballPosX = ballPosX + ballMoveX;
        ballPosY = ballPosY + ballMoveY;
        ctx.font = "50px Arial";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.fillText(score.toString(), canvas.width / 2 - 100, 100);
    }
    function ballDraw() {
        ballDirection();
        ctx.beginPath();
        ctx.fillStyle = "#ffffff";
        ctx.arc(ballPosX, ballPosY, 10, 0, 2 * Math.PI);
        ctx.fill();
    }
    function paddleDraw() {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(paddleX, paddleY, 15, 200);
    }
    function opponentPaddleDraw() {
        var alignPaddle = function () {
            var number = ballPosY - 100;
            if (number <= 20) {
                return 0;
            }
            else if (number > canvasHeight - 230) {
                return canvasHeight - 200;
            }
            else {
                return number;
            }
        };
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(canvasWidth - 70, alignPaddle(), 15, 200);
    }
    document.addEventListener('keydown', function (event) {
        if (event.keyCode === 89) {
            ballPosX = 90;
            ballPosY = canvasHeight / 2;
            ballMoveX = 10;
            ballMoveY = 10;
            paddleMoveSpeed = 30;
            paddleX = 50;
            paddleY = canvasHeight / 2 - 100;
            direction = 1;
            score = 0;
            keyCode = null;
            keyPress = false;
            ballOffset = 0;
            gameOver = false;
        }
    }, true);
    function paddlemove() {
        if (keyPress) {
            if (keyCode === 38 && paddleY > 0) {
                paddleY = paddleY - paddleMoveSpeed;
                direction = -1;
            }
            else if (keyCode === 40 && paddleY < canvasHeight - 200) {
                paddleY = paddleY + paddleMoveSpeed;
                direction = 1;
            }
        }
    }
    function restart() {
        ctx.font = "50px Arial";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.fillText('Would You like to play again?', canvas.width / 2, 300);
        ctx.font = "25px Arial";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.fillText('(Press Y to begin)', canvas.width / 2, 400);
    }
    function gameLoop() {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        if (!gameOver) {
            ballDraw();
            paddleDraw();
            opponentPaddleDraw();
            ctx.beginPath();
            ctx.moveTo(canvasWidth / 2, 0);
            ctx.lineTo(canvasWidth / 2, canvasHeight);
            ctx.setLineDash([5]);
            ctx.strokeStyle = '#ffffff';
            ctx.stroke();
            paddlemove();
        }
        else {
            restart();
        }
        requestAnimationFrame(gameLoop);
    }
}
window.onload = function () {
    pong();
};


/***/ })
/******/ ]);