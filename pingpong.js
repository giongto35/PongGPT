function init() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    const paddleHeight = 100;
    const paddleWidth = 10;
    const ballSize = 8;
    const ballSpeed = 4;
    const paddleSpeed = 4;

    let player1X = (canvas.width - paddleWidth) / 2;
    let player1Y = (canvas.height - paddleHeight) / 4;
    let player2X = (canvas.width - paddleWidth) / 2;
    let player2Y = (canvas.height - paddleHeight) * 3 / 4;

    let balls = [
        {
            x: canvas.width / 2,
            y: canvas.height / 2,
            velocityX: ballSpeed,
            velocityY: ballSpeed
        },
        {
            x: canvas.width / 2,
            y: canvas.height / 2,
            velocityX: -ballSpeed,
            velocityY: -ballSpeed
        }
    ];

    let keys = {};

    function handleKeyDown(event) {
        keys[event.code] = true;
    }

    function handleKeyUp(event) {
        keys[event.code] = false;
    }

    function movePaddles() {
        if (keys['KeyW'] && player1Y > 0) {
            player1Y -= paddleSpeed;
        }
        if (keys['KeyS'] && player1Y < canvas.height - paddleHeight) {
            player1Y += paddleSpeed;
        }
        if (keys['KeyA'] && player1X > 0) {
            player1X -= paddleSpeed;
        }
        if (keys['KeyD'] && player1X < canvas.width - paddleWidth) {
            player1X += paddleSpeed;
        }
        if (keys['ArrowUp'] && player2Y > 0) {
            player2Y -= paddleSpeed;
        }
        if (keys['ArrowDown'] && player2Y < canvas.height - paddleHeight) {
            player2Y += paddleSpeed;
        }
        if (keys['ArrowLeft'] && player2X > 0) {
            player2X -= paddleSpeed;
        }
        if (keys['ArrowRight'] && player2X < canvas.width - paddleWidth) {
            player2X += paddleSpeed;
        }
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw paddles
        ctx.fillStyle = '#fff';
        ctx.fillRect(player1X, player1Y, paddleWidth, paddleHeight);
        ctx.fillRect(player2X, player2Y, paddleWidth, paddleHeight);

        // Draw balls
        balls.forEach((ball) => {
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ballSize, 0, Math.PI * 2);
            ctx.fill();

            // Move ball
            ball.x += ball.velocityX;
            ball.y += ball.velocityY;

            // Check collisions with top and bottom
            if (ball.y < 0 || ball.y > canvas.height) {
                ball.velocityY = -ball.velocityY;
            }

            // Check collisions with paddles
            if (
                // Player 1 collision
                (
                    ball.x - ballSize / 2 < player1X + paddleWidth &&
                    ball.y > player1Y &&
                    ball.y < player1Y + paddleHeight
                ) ||
                // Player 2 collision
                (
                    ball.x + ballSize / 2 > player2X &&
                    ball.y > player2Y &&
                    ball.y < player2Y + paddleHeight
                )
            ) {
                ball.velocityX = -ball.velocityX;
            }

            // Check if ball is out of bounds and reset its position
            if (ball.x < 0 || ball.x > canvas.width) {
                ball.x = canvas.width / 2;
                ball.y = canvas.height / 2;
                ball.velocityX = Math.random() > 0.5 ? ballSpeed : -ballSpeed;
                ball.velocityY = Math.random() > 0.5 ? ballSpeed : -ballSpeed;
            }
        });

        movePaddles();

        requestAnimationFrame(draw);
    }

    draw();
}

//init();

window.addEventListener('DOMContentLoaded', init);
