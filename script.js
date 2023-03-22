const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const ship = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    angle: 0,
    speed: 0,
    acceleration: 0.05,
    friction: 0.99
};

function drawShip() {
    ctx.save();
    ctx.translate(ship.x, ship.y);
    ctx.rotate(ship.angle);
    ctx.beginPath();
    ctx.moveTo(10, 0);
    ctx.lineTo(-10, -7);
    ctx.lineTo(-10, 7);
    ctx.closePath();
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.restore();
}

function updateShip() {
    ship.speed *= ship.friction;
    ship.x += Math.cos(ship.angle) * ship.speed;
    ship.y += Math.sin(ship.angle) * ship.speed;

    if (ship.y > canvas.height - 10) {
        ship.y = canvas.height - 10;
        ship.speed = 0;
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawShip();
    updateShip();

    requestAnimationFrame(gameLoop);
}

gameLoop();

document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowUp') {
        ship.speed += ship.acceleration;
    } else if (e.code === 'ArrowDown') {
        ship.speed = 0;
    } else if (e.code === 'ArrowLeft') {
        ship.angle -= 0.1;
    } else if (e.code === 'ArrowRight') {
        ship.angle += 0.1;
    }
});
