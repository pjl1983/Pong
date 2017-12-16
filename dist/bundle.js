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
    var ballmoveX = 10;
    var ballmoveY = 10;
    var paddleMoveSpeed = 30;
    var paddleX = 50;
    var paddleY = canvasHeight / 2 - 100;
    var direction = 1;
    var score = 0;
    var keycode = null;
    var keypress = false;
    var ballOffset = 0;
    gameLoop();
    function ballDirection() {
        if (ballPosX <= 85 && (ballPosY > paddleY && ballPosY < paddleY + 200)) {
            ballmoveX = Math.abs(ballmoveX);
            ballmoveY = ballmoveY * direction;
            score = score + 1;
            ballmoveX = ballmoveX + 1;
            ballmoveY = ballmoveY + 1;
            ballOffset = Math.floor(Math.random() * (10 - (-10)) + (-10));
            ballPosY = ballPosY + ballOffset;
        }
        else {
            if (ballPosX >= canvasWidth) {
                ballmoveX = -ballmoveX;
            }
            else if (ballPosX < 5) {
                ballmoveX = Math.abs(ballmoveX);
            }
            if (ballPosY >= canvasHeight) {
                ballmoveY = -ballmoveY;
            }
            else if (ballPosY < 5) {
                ballmoveY = Math.abs(ballmoveY);
            }
        }
        ballPosX = ballPosX + ballmoveX;
        ballPosY = ballPosY + ballmoveY;
        ctx.font = "50px Arial";
        // ctx.font = "50px Press Start 2P', cursive;";
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
    document.addEventListener('keydown', function (event) {
        keycode = event.keyCode;
        keypress = true;
    }, true);
    document.addEventListener('keyup', function (event) {
        keypress = false;
    }, true);
    function paddlemove() {
        if (keypress) {
            if (keycode === 38 && paddleY > 0) {
                paddleY = paddleY - paddleMoveSpeed;
                direction = -1;
            }
            else if (keycode === 40 && paddleY < canvasHeight - 200) {
                paddleY = paddleY + paddleMoveSpeed;
                direction = 1;
            }
        }
    }
    function gameLoop() {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        ballDraw();
        paddleDraw();
        ctx.beginPath();
        ctx.moveTo(canvasWidth / 2, 0);
        ctx.lineTo(canvasWidth / 2, canvasHeight);
        ctx.setLineDash([5]);
        ctx.strokeStyle = '#ffffff';
        ctx.stroke();
        paddlemove();
        requestAnimationFrame(gameLoop);
    }
}
window.onload = function () {
    pong();
};


/***/ })
/******/ ]);