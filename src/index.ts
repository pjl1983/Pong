function pong(): any {
    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;
    canvas = <HTMLCanvasElement>document.getElementById('pong');
    ctx = canvas.getContext("2d");
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    const e4 = new Audio('../E4.wav');
    const e5 = new Audio('../E5.wav');
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
    let gameOver: boolean = false;
    gameLoop();

    document.addEventListener('keydown', (event) => {
        keyCode = event.keyCode;
        keyPress = true;
    }, true);

    document.addEventListener('keyup', (event) => {
        keyPress = false;
    }, true);

    function ballDirection(): void {
        if (ballPosX <= 85 && (ballPosY > paddleY && ballPosY < paddleY + 200)) {
            e4.play();
            ballMoveX = Math.abs(ballMoveX);
            ballMoveY = ballMoveY * direction;
            score = score + 1;
            ballMoveX = ballMoveX + 1;
            ballMoveY = ballMoveY + 1;
            ballOffset = Math.floor(Math.random() * (10 - (-10)) + (-10));
            ballPosY = ballPosY + ballOffset;
        } else if (ballPosX >= canvasWidth - 85) {
            ballMoveX = -ballMoveX;
            e5.play();
        } else if (ballPosX <= 30) {
            gameOver = true;
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

        ctx.font = "60px Arial";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.fillText(score.toString(), canvas.width / 2 - 60, 75);
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

    function opponentPaddleDraw(): void {
        let alignPaddle = (): number => {
            const number = ballPosY - 100;
            if (number <= 20) {
                return 0;
            } else if (number > canvasHeight - 230) {
                return canvasHeight - 200;
            } else {
                return number;
            }
        };

        ctx.fillStyle = "#ffffff";
        ctx.fillRect(canvasWidth - 70, alignPaddle(), 15, 200);
    }

    document.addEventListener('keydown', (event) => {
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

    function restart(): void {
        ctx.font = "50px Arial";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.fillText('Would You like to play again?', canvas.width / 2, 300);
        ctx.font = "25px Arial";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.fillText('(Press Y to begin)', canvas.width / 2, 400);
    }

    function gameLoop(): void {
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
        } else {
            restart();
        }
        requestAnimationFrame(gameLoop);
    }
}

window.onload = (): void => {
    pong();
};
