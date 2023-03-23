const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gravitySelect = document.getElementById('gravity');


const ship = {
    x: canvas.width / 2,
    y: 50,
    angle: Math.PI / 2,
    horizontalSpeed: 0,
    verticalSpeed: 0,
    acceleration: 0.20,
    friction: 0.99,
    gravity: parseFloat(gravitySelect.value),
    thrust: false
};

const rockets = [];

function drawShip() {
    ctx.save();
    ctx.translate(ship.x, ship.y);
    ctx.rotate(ship.angle);

    // Draw the ship
    ctx.beginPath();
    ctx.moveTo(20, 0);
    ctx.lineTo(-20, -14);
    ctx.lineTo(-20, 14);
    ctx.closePath();
    ctx.fillStyle = 'white';
    ctx.fill();

    // Draw the fire when thrust is active
    if (ship.thrust) {
        ctx.fillStyle = 'orange';
        ctx.fillRect(-28, -6, 8, 4);
        ctx.fillRect(-28, 2, 8, 4);

        ctx.fillStyle = 'red';
        ctx.fillRect(-32, -4, 4, 2);
        ctx.fillRect(-32, 2, 4, 2);
    }

    ctx.restore();
}

function drawRockets() {
    ctx.fillStyle = 'white';
    rockets.forEach(rocket => {
        ctx.save();
        ctx.translate(rocket.x, rocket.y);
        ctx.rotate(rocket.angle);
        ctx.fillRect(-2, -1, 4, 2);
        ctx.restore();
    });
}


function updateShip() {
    ship.horizontalSpeed *= ship.friction;
    ship.verticalSpeed *= ship.friction;

    ship.x += Math.cos(ship.angle) * ship.horizontalSpeed;
    ship.y += Math.sin(ship.angle) * ship.verticalSpeed + ship.gravity;

    if (ship.y > canvas.height - 20) {
        ship.y = canvas.height - 20;
        ship.verticalSpeed = 0;
    }
}

function updateRockets() {
    rockets.forEach(rocket => {
        rocket.x += Math.cos(rocket.angle) * rocket.speed;
        rocket.y += Math.sin(rocket.angle) * rocket.speed;
    });

    rockets.forEach((rocket, index) => {
        if (rocket.x < 0 || rocket.x > canvas.width || rocket.y < 0 || rocket.y > canvas.height) {
            rockets.splice(index, 1);
        }
    });
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawShip();
    drawRockets();
    updateShip();
    updateRockets();

    requestAnimationFrame(gameLoop);
}

gameLoop();


document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowUp') {
        ship.horizontalSpeed += Math.cos(ship.angle) * ship.acceleration;
        ship.verticalSpeed += Math.sin(ship.angle) * ship.acceleration;
        ship.thrust = true;
    } else if (e.code === 'ArrowDown') {
        ship.horizontalSpeed = 0;
        ship.verticalSpeed = 0;
    } else if (e.code === 'ArrowLeft') {
        ship.angle -= 0.3;
    } else if (e.code === 'ArrowRight') {
        ship.angle += 0.3;
    } else if (e.code === 'Space') {
        rockets.push({
            x: ship.x + Math.cos(ship.angle) * 20,
            y: ship.y + Math.sin(ship.angle) * 20,
            angle: ship.angle,
            speed: 5
        });
    }
});

document.addEventListener('keyup', (e) => {
    if (e.code === 'ArrowUp') {
        ship.thrust = false;
    }
});


gravitySelect.addEventListener('change', (e) => {
    const value = parseFloat(e.target.value);
    ship.gravity = value;
});
