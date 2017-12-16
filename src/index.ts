function pong(): any {
    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;
    canvas = <HTMLCanvasElement>document.getElementById('pong');
    ctx = canvas.getContext("2d");
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    let canvasWidth: number = canvas.width;
    let canvasHeight: number = canvas.height;
    let ballPosX: number = 70;
    let ballPosY: number = canvasHeight / 2;
    let ballmoveX: number = 15;
    let ballmoveY: number = 15;
    let paddleMoveSpeed: number = 30;
    let paddleX: number = 50;
    let paddleY: number = canvasHeight / 2 - 100;
    let direction: number = 1;
    let score: number = 0;
    let keycode: number = null;
    let keypress: boolean = false;
    let ballOffset: number = 0;
    gameLoop();

    function ballDirection(): void {

        if (ballPosX <= 85 && (ballPosY > paddleY && ballPosY < paddleY + 200)) {
            ballmoveX = Math.abs(ballmoveX);
            ballmoveY = ballmoveY * direction;
            score = score + 1;
            ballmoveX = ballmoveX + 1;
            ballmoveY = ballmoveY + 1;
            ballOffset = Math.floor(Math.random() * (10 - (-10)) + (-10));
            ballPosY = ballPosY + ballOffset;
        } else {
            if (ballPosX >= canvasWidth) {
                ballmoveX = -ballmoveX;
            } else if (ballPosX < 5) {
                ballmoveX = Math.abs(ballmoveX);
            }
            if (ballPosY >= canvasHeight) {
                ballmoveY = -ballmoveY;
            } else if (ballPosY < 5) {
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

    function ballDraw(): void {
        ballDirection();
        ctx.beginPath();
        ctx.fillStyle = "#ffffff";
        ctx.arc(ballPosX, ballPosY, 10, 0, 2 * Math.PI);
        ctx.fill();
    }

    function paddleDraw(): void {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(paddleX, paddleY, 15, 200);
    }

    document.addEventListener('keydown', (event) => {
        keycode = event.keyCode;
        keypress = true;
    }, true);

    document.addEventListener('keyup', (event) => {
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

window.onload = () => {
    pong();
};




