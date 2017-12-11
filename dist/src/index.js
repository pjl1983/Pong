function pong() {
    var canvas;
    var ctx;
    canvas = document.getElementById('pong');
    ctx = canvas.getContext("2d");
    gameLoop();
    function gameLoop() {
        requestAnimationFrame(gameLoop);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 1500, 720);
        ctx.beginPath();
    }
}
window.onload = function () {
    pong();
};
