// Define canvas and context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Define player properties
const player = {
  x: 50,
  y: canvas.height / 2,
  width: 50,
  height: 50,
  speed: 5,
  velX: 0,
  velY: 0,
  jumping: false,
  grounded: false,
};

// Define key bindings
const keys = {
  up: false,
  down: false,
  left: false,
  right: false,
};

document.addEventListener("keydown", function (event) {
  if (event.code === "KeyW") {
    keys.up = true;
  } else if (event.code === "KeyA") {
    keys.left = true;
  } else if (event.code === "KeyS") {
    keys.down = true;
  } else if (event.code === "KeyD") {
    keys.right = true;
  }
});

document.addEventListener("keyup", function (event) {
  if (event.code === "KeyW") {
    keys.up = false;
  } else if (event.code === "KeyA") {
    keys.left = false;
  } else if (event.code === "KeyS") {
    keys.down = false;
  } else if (event.code === "KeyD") {
    keys.right = false;
  }
});

// Define obstacles array
let obstacles = [];

// Define obstacle properties
class Obstacle {
  constructor(x, y, width, height, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
  }
}

// Create initial obstacle
let obstacle = new Obstacle(
  canvas.width,
  Math.random() * canvas.height,
  50,
  50,
  5
);

// Add obstacle to array
obstacles.push(obstacle);

// Define update function
function update() {
  // Move player
  if (keys.up && player.jumping === false) {
    player.velY -= 20;
    player.jumping = true;
  }

  if (keys.left) {
    player.velX -= player.speed;
  }

  if (keys.right) {
    player.velX += player.speed;
  }

  // Apply gravity to player velocity
  player.velY += 1.5;

  // Apply player velocity to position
  player.x += player.velX;
  player.y += player.velY;

  // Limit player position to canvas bounds
  if (player.x >= canvas.width - player.width) {
    player.x = canvas.width - player.width;
  } else if (player.x <= 0) {
    player.x = 0;
  }

  if (player.y >= canvas.height - player.height) {
    player.y = canvas.height - player.height;
    player.jumping = false;
  }

  //

// Part 3: Collision Detection and Game Over

function checkCollisions() {
  // Check for collision with obstacles
  obstacles.forEach((obstacle) => {
    if (detectCollision(player, obstacle)) {
      gameOver();
    }
  });
}

function detectCollision(player, obstacle) {
  // Calculate player and obstacle edges
  const playerLeft = player.x;
  const playerRight = player.x + player.width;
  const playerTop = player.y;
  const playerBottom = player.y + player.height;

  const obstacleLeft = obstacle.x;
  const obstacleRight = obstacle.x + obstacle.width;
  const obstacleTop = obstacle.y;
  const obstacleBottom = obstacle.y + obstacle.height;

  // Check for collision
  return (
    playerLeft < obstacleRight &&
    playerRight > obstacleLeft &&
    playerTop < obstacleBottom &&
    playerBottom > obstacleTop
  );
}

function gameOver() {
  // Stop the game
  cancelAnimationFrame(animationId);

  // Display game over message
  context.fillStyle = "black";
  context.font = "30px Arial";
  context.fillText("Game Over!", canvas.width / 2 - 80, canvas.height / 2);

  // Show the play again button
  playAgainButton.style.display = "block";
}

playAgainButton.addEventListener("click", () => {
  // Reset the game
  reset();

  // Hide the play again button
  playAgainButton.style.display = "none";

  // Start the game
  animationId = requestAnimationFrame(gameLoop);
});

function reset() {
  // Reset player position
  player.x = canvas.width / 2 - player.width / 2;
  player.y = canvas.height - 100;

  // Clear obstacles array
  obstacles = [];

  // Reset score
  score = 0;
}

function updateScore() {
  // Increment score
  score++;

  // Update score element
  scoreElement.textContent = score;
}

function gameLoop() {
  // Clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Update player position
  updatePlayerPosition();

  // Update obstacles position
  updateObstaclesPosition();

  // Check for collisions
  checkCollisions();

  // Update score
  updateScore();

  // Draw player and obstacles
  drawPlayer();
  drawObstacles();

  // Request next frame
  animationId = requestAnimationFrame(gameLoop);
}

// Start the game loop
animationId = requestAnimationFrame(gameLoop);
