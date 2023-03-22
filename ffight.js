const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gravitySelect = document.getElementById('gravity');

const ship = {
    x: canvas.width / 2,
    y: 50,
    angle: Math.PI / 2,
    speed: 0,
    acceleration: 0.20,
    friction: 0.99,
    gravity: parseFloat(gravitySelect.value),
    thrust: false
};

function drawShip() {
    ctx.save();
    ctx.translate(ship.x, ship.y);
    ctx.rotate(ship.angle);

    // Draw the ship
    ctx.beginPath();
    ctx.moveTo(10, 0);
    ctx.lineTo(-10, -7);
    ctx.lineTo(-10, 7);
    ctx.closePath();
    ctx.fillStyle = 'white';
    ctx.fill();

    // Draw the fire when thrust is active
    if (ship.thrust) {
        ctx.fillStyle = 'orange';
        ctx.fillRect(-14, -3, 4, 2);
        ctx.fillRect(-14, 1, 4, 2);

        ctx.fillStyle = 'red';
        ctx.fillRect(-16, -2, 2, 1);
        ctx.fillRect(-16, 1, 2, 1);
    }

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
        ship.thrust = true;
    } else if (e.code === 'ArrowDown') {
        ship.speed = 0;
    } else if (e.code === 'ArrowLeft') {
        ship.angle -= 0.3;
    } else if (e.code === 'ArrowRight') {
        ship.angle += 0.3;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.code === 'ArrowUp') {
        ship.thrust = false;
    }
});

gravitySelect.addEventListener('change', (e) => {
    ship.gravity = parseFloat(e.target.value);
});
