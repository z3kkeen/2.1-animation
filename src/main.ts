const canvas = document.createElement('canvas');
canvas.width = 1000;
canvas.height = 700;
const context = canvas.getContext('2d')!;
document.querySelector('#app')!.append(canvas);

type Ball = {
    radius: number,
    x: number,
    y: number,
    vx: number,
    fillColor: string,
    strokeColor: string,
    strokeWidth: number,
};

const balls: Ball[] = [
    {
      radius: 70,
      x: 100,
      y: 320,
      vx: 6,
      fillColor: 'pink',
      strokeColor: 'darkred',
      strokeWidth: 8
    }
];

gameLoop();

function gameLoop() {
    requestAnimationFrame(gameLoop);
    update();
    render();
}

function update() {
    for (let i = 0; i < balls.length; i++) {
      let ball = balls[i];
  
      ball.x += ball.vx;
  
      // Check right edge collision
      if (ball.x + ball.radius >= canvas.width) {
        ball.vx = -ball.vx;
        ball.x = canvas.width - ball.radius;
      }
  
      // Check left edge collision
      if (ball.x - ball.radius <= 0) {
        ball.vx = -ball.vx;
        ball.x = ball.radius;
      }
    }
}
  
  function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  
    for (const ball of balls) {
      drawCircle(
        ball.x,
        ball.y,
        ball.radius,
        ball.fillColor,
        ball.strokeColor,
        ball.strokeWidth
      );
    }
  }
  
  function drawCircle(
    x: number,
    y: number,
    radius: number,
    fillColor: string,
    strokeColor: string,
    strokeWidth: number ) {

    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
  
    context.fillStyle = fillColor;
    context.fill();
  
    context.lineWidth = strokeWidth;
    context.strokeStyle = strokeColor;
    context.stroke();
}