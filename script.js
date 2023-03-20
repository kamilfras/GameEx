document.addEventListener('DOMContentLoaded', () => {
    // Your game logic goes here
});

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const tileSize = 50;
const playerSprite = new Image();
playerSprite.src = 'https://www.tibiawiki.com.br/images/7/76/Tibia_icon.png'; // Replace this with the URL of your player sprite image

const arrowIndicators = {
  up: document.querySelector('.arrow-indicator.up'),
  right: document.querySelector('.arrow-indicator.right'),
  down: document.querySelector('.arrow-indicator.down'),
  left: document.querySelector('.arrow-indicator.left'),
};

let player = {
  x: 7,
  y: 7,
};

function drawTile(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
}

function drawPlayer(x, y) {
  ctx.drawImage(playerSprite, x * tileSize, y * tileSize, tileSize, tileSize);
}

function drawScene() {
  for (let x = 0; x < 15; x++) {
    for (let y = 0; y < 15; y++) {
      drawTile(x, y, '#228B22');
    }
  }
  drawPlayer(player.x, player.y);
}

function updateScene() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawScene();
}

document.addEventListener('keydown', (e) => {
  let dx = 0;
  let dy = 0;

  switch (e.key) {
    case 'ArrowUp':
      dy = -1;
      break;
    case 'ArrowRight':
      dx = 1;
      break;
    case 'ArrowDown':
      dy = 1;
break;
case 'ArrowLeft':
dx = -1;
break;
}

if (dx || dy) {
player.x = Math.max(0, Math.min(14, player.x + dx));
player.y = Math.max(0, Math.min(14, player.y + dy));
updateScene();
for (const direction in arrowIndicators) {
  arrowIndicators[direction].style.backgroundColor =
    direction.toLowerCase() === e.key.slice(5).toLowerCase() ? '#ffffff' : 'transparent';
}
}
});

document.addEventListener('keyup', (e) => {
if (['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'].includes(e.key)) {
for (const direction in arrowIndicators) {
arrowIndicators[direction].style.backgroundColor = 'transparent';
}
}
});

playerSprite.onload = () => {
drawScene();
};
