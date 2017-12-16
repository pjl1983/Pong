function pong(): any {
    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;
    canvas = <HTMLCanvasElement>document.getElementById('pong');
    ctx = canvas.getContext("2d");
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    let canvasWidth: number = canvas.width;
    let canvasHeight: number = canvas.height;
    let ballPosX: number = 90;
    let ballPosY: number = canvasHeight / 2;
    let ballMoveX: number = 10;
    let ballMoveY: number = 10;
    let paddleMoveSpeed: number = 30;
    let paddleX: number = 50;
    let paddleY: number = canvasHeight / 2 - 100;
    let direction: number = 1;
    let score: number = 0;
    let keyCode: number = null;
    let keyPress: boolean = false;
    let ballOffset: number = 0;
    gameLoop();

    function ballDirection(): void {
        if (ballPosX <= 85 && (ballPosY > paddleY && ballPosY < paddleY + 200)) {
            ballMoveX = Math.abs(ballMoveX);
            ballMoveY = ballMoveY * direction;
            score = score + 1;
            ballMoveX = ballMoveX + 1;
            ballMoveY = ballMoveY + 1;
            ballOffset = Math.floor(Math.random() * (10 - (-10)) + (-10));
            ballPosY = ballPosY + ballOffset;
        } else {
            if (ballPosX >= canvasWidth) {
                ballMoveX = -ballMoveX;
            } else if (ballPosX < 5) {
                ballMoveX = Math.abs(ballMoveX);
            }
            if (ballPosY >= canvasHeight) {
                ballMoveY = -ballMoveY;
            } else if (ballPosY < 5) {
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
        keyCode = event.keyCode;
        keyPress = true;
    }, true);

    document.addEventListener('keyup', (event) => {
        keyPress = false;
    }, true);

    function paddlemove(): void {
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

    function gameLoop(): void {
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

window.onload = (): void => {
    pong();
};




