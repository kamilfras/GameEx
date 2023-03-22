const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gravitySelect = document.getElementById('gravity');

const ship = {
    x: canvas.width / 2,
    y: 50,
    angle: Math.PI / 2,
    speed: 0,
    acceleration: 0.05,
    friction: 0.99,
    gravity: parseFloat(gravitySelect.value)
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
    ship.y += Math.sin(ship.angle) * ship.speed + ship.gravity;

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

gravitySelect.addEventListener('change', (e) => {
    ship.gravity = parseFloat(e.target.value);
});
