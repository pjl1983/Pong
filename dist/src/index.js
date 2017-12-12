function pong() {
    var canvas;
    var ctx;
    canvas = document.getElementById('pong');
    ctx = canvas.getContext("2d");
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    var x = 10;
    var y = canvasHeight / 2;
    var a = 10;
    var b = 10;
    var paddleX = 0;
    var paddleY = canvasHeight / 2 - 100;
    var direction = 1;
    var score = 0;
    gameLoop();
    function ballDirection() {
        if (x <= 5 && (y > paddleY && y < paddleY + 200)) {
            a = Math.abs(a);
            b = b * direction;
            score = score + 1;
        }
        else {
            if (x >= canvasWidth) {
                a = -a;
            }
            else if (x < 5) {
                a = Math.abs(a);
            }
            if (y >= canvasHeight) {
                b = -b;
            }
            else if (y < 5) {
                b = Math.abs(b);
            }
        }
        x = x + a;
        y = y + b;
        ctx.font = "50px Comic Sans MS";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.fillText(score.toString(), canvas.width / 2 - 100, 100);
    }
    function ballDraw() {
        ballDirection();
        ctx.beginPath();
        ctx.fillStyle = "#ffffff";
        ctx.arc(x, y, 10, 0, 2 * Math.PI);
        ctx.fill();
    }
    function paddleDraw() {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(paddleX, paddleY, 15, 200);
    }
    document.addEventListener('keydown', function (event) {
        if (event.keyCode === 38 && paddleY > 0) {
            paddleY = paddleY - 50;
            direction = -1;
        }
        else if (event.keyCode === 40 && paddleY < canvasHeight - 200) {
            paddleY = paddleY + 50;
            direction = 1;
        }
    }, false);
    function gameLoop() {
        requestAnimationFrame(gameLoop);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        ballDraw();
        paddleDraw();
        ctx.beginPath();
        ctx.moveTo(canvasWidth / 2, 0);
        ctx.lineTo(canvasWidth / 2, canvasHeight);
        ctx.strokeStyle = '#ffffff';
        ctx.stroke();
    }
}
window.onload = function () {
    pong();
};
