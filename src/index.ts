function pong(): any {
    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;
    canvas = <HTMLCanvasElement>document.getElementById('pong');
    ctx = canvas.getContext("2d");
    const canvasWidth: number = canvas.width;
    const canvasheight: number = canvas.height;
    gameLoop();


    function ball() {
        let x: number = 10;
        let y: number = canvasheight / 2;


        function ballDirection (): void {
            let dx = 2;
            let dy = -2;

            if(x + dx > canvas.width-10 || x + dx < 10) {
                dx = -dx;
            }
            if(y + dy > canvas.height-10 || y + dy < 10) {
                dy = -dy;
            }

            x += dx;
            y += dy;
            console.log(x,y);
        }

        function ballDraw() {
            ballDirection();
            ctx.beginPath();
            ctx.fillStyle = "#ffffff";
            ctx.arc(x, y, 10, 0, 2 * Math.PI);
            ctx.fill();
        }
        ballDraw();
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




