function pong(): any {
    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;
    canvas = <HTMLCanvasElement>document.getElementById('pong');
    ctx = canvas.getContext("2d");
    let canvasWidth: number = canvas.width;
    let canvasHeight: number = canvas.height;
    gameLoop();


    let x: number = 10;
    let y: number = canvasHeight / 2;
    let a: number = 15;
    let b: number = 15;
    let paddleX: number = 0;
    let paddleY: number = canvasHeight/2 -100;

    function ballDirection(): void {

        if (x >= canvasWidth) {
            a = -a;
        } else if (x < 5) {
            a = Math.abs(a);
        }

        if (y >= canvasHeight) {
            b = -b;
        } else if (y < 5) {
            b = Math.abs(b);
        }
        x = x + a;
        y = y + b;
    }

    function ballDraw(): void {
        ballDirection();
        ctx.beginPath();
        ctx.fillStyle = "#ffffff";
        ctx.arc(x, y, 10, 0, 2 * Math.PI);
        ctx.fill();
    }


    function paddleDraw():void {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(paddleX,paddleY,15,200);
        paddleMove();
    }

    function paddleMove() {
        document.addEventListener('keydown', (event) => {
            if (event.keyCode === 38 && paddleY > 0) {
                paddleY = paddleY - 0.10;
            }
            else if (event.keyCode === 40 && paddleY < canvasHeight-200) {
                paddleY = paddleY + 0.10;
            }

        }, false)
    }

    function gameLoop() {
        requestAnimationFrame(gameLoop);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 1500, 700);
        ballDraw();
        paddleDraw();
        ctx.beginPath();
        ctx.moveTo(canvasWidth/2,0);
        ctx.lineTo(canvasWidth/2,canvasHeight);
        ctx.strokeStyle = '#ffffff';
        ctx.stroke();
    }
}

window.onload = () => {
    pong();
};




