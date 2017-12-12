function pong(): any {
    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;
    canvas = <HTMLCanvasElement>document.getElementById('pong');
    ctx = canvas.getContext("2d");
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    let canvasWidth: number = canvas.width;
    let canvasHeight: number = canvas.height;
    let x: number = 20;
    let y: number = canvasHeight / 2;
    let a: number = 10;
    let b: number = 10;
    let paddleX: number = 0;
    let paddleY: number = canvasHeight/2 -100;
    let direction: number = 1;
    let score: number = 0;
    gameLoop();


    function ballDirection(): void {

        if (x <= 15 && (y > paddleY && y < paddleY + 200)) {
            a = Math.abs(a);
            b = b * direction;
            score = score + 1;
        } else {
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
        }

        x = x + a;
        y = y + b;

        ctx.font = "50px Comic Sans MS";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.fillText(score.toString(), canvas.width/2 - 100, 100);

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
    }

    document.addEventListener('keydown', (event) => {
        if (event.keyCode === 38 && paddleY > 0) {
            paddleY = paddleY - 50;
            direction = -1;
        }
        else if (event.keyCode === 40 && paddleY < canvasHeight-200) {
            paddleY = paddleY + 50;
            direction = 1;
        }
    }, false)

    function gameLoop() {
        requestAnimationFrame(gameLoop);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
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




