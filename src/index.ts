function pong(): any {
    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;
    canvas = <HTMLCanvasElement>document.getElementById('pong');
    ctx = canvas.getContext("2d");
    gameLoop();

    function ball() {
        ctx.beginPath();
        ctx.fillStyle = "#ffffff";
        ctx.arc(100, 100, 10, 0, 2 * Math.PI);
        ctx.fill();
    }

    function gameLoop() {
        requestAnimationFrame(gameLoop);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 1500, 720);
        ball();

    }
}

window.onload = () => {
    pong();
};




