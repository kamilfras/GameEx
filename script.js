const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const tileSize = 50;

const playerSprites = {
  up: new Image(),
  right: new Image(),
  down: new Image(),
  left: new Image(),
};

playerSprites.up.src = 'https://www.tibiawiki.com.br/images/7/76/Tibia_icon.png';
playerSprites.right.src = 'https://www.tibiawiki.com.br/images/7/76/Tibia_icon.png';
playerSprites.down.src = 'https://www.tibiawiki.com.br/images/7/76/Tibia_icon.png';
playerSprites.left.src = 'https://www.tibiawiki.com.br/images/7/76/Tibia_icon.png';

const arrowIndicators = {
  up: document.querySelector('.arrow-indicator.up'),
  right: document.querySelector('.arrow-indicator.right'),
  down: document.querySelector('.arrow-indicator.down'),
  left: document.querySelector('.arrow-indicator.left'),
};

let player = {
  x: 7,
  y: 7,
  direction: 'down',
};

function drawTile(x, y, fillColor, strokeColor) {
  ctx.fillStyle = fillColor;
  ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
  ctx.strokeStyle = strokeColor;
  ctx.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize);
}

function drawScene() {
  for (let x = 0; x < 15; x++) {
    for (let y = 0; y < 15; y++) {
      drawTile(x, y, '#228B22', 'rgba(0, 0, 0, 0.1)');
    }
  }
  drawPlayer(player.x, player.y, player.direction);
}


function drawPlayer(x, y, direction) {
  ctx.drawImage(playerSprites[direction], x * tileSize, y * tileSize, tileSize, tileSize);
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
      player.direction = 'up';
      break;
    case 'ArrowRight':
      dx = 1;
      player.direction = 'right';
      break;
    case 'ArrowDown':
      dy = 1;
      player.direction = 'down';
      break;
    case 'ArrowLeft':
      dx = -1;
      player.direction = 'left';
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

playerSprites.down.onload = () => {
  drawScene();
};
