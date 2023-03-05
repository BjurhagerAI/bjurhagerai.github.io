<!DOCTYPE html>
<html>
  <head>
    <title>Maze Game</title>
    <style>
      #canvas {
        border: 1px solid #333;
      }
    </style>
  </head>
  <body>
    <canvas id="canvas" width="500" height="500"></canvas>
    <script>
      // Get a reference to the canvas and its context
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");

      // Set the size of the maze and the player's starting position
      const mazeWidth = 10;
      const mazeHeight = 10;
      let playerX = 0;
      let playerY = 0;

      // Define the maze as a 2D array of cells, where 0 = wall and 1 = open space
      const maze = [
        [0,0,0,0,0,0,0,0,0,0],
        [1,1,1,0,1,1,1,1,1,0],
        [0,0,1,0,1,0,0,0,1,0],
        [0,0,1,0,1,0,1,0,1,0],
        [0,0,1,1,1,1,1,0,1,0],
        [0,0,0,0,0,0,0,0,1,0],
        [0,0,1,1,1,1,1,1,1,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0]
      ];

      // Define the cell size and padding
      const cellSize = canvas.width / mazeWidth;
      const cellPadding = 2;

      // Define the cheese location
      const cheeseX = mazeWidth - 1;
      const cheeseY = mazeHeight - 1;

      // Draw the maze on the canvas
      function drawMaze() {
        // Loop through each cell in the maze
        for (let y = 0; y < mazeHeight; y++) {
          for (let x = 0; x < mazeWidth; x++) {
            // Calculate the coordinates of the cell on the canvas
            const xPos = x * cellSize;
            const yPos = y * cellSize;

            // Draw the cell as a rectangle
            ctx.fillStyle = maze[y][x] === 0 ? "#333" : "#eee";
            ctx.fillRect(xPos, yPos, cellSize - cellPadding, cellSize - cellPadding);
          }
        }

        // Draw the cheese
        const cheeseXPos = cheeseX * cellSize;
        const cheeseYPos = cheeseY * cellSize;
        ctx.fillStyle = "#ff0";
        ctx.fillRect(cheeseXPos, cheeseYPos, cellSize - cellPadding, cellSize - cellPadding);
      }

      // Draw the player on the canvas
      function drawPlayer() {
        // Calculate the coordinates of the player on the canvas
        const xPos = playerX * cellSize;
        const yPos = playerY * cellSize;

        // Draw the player as a circle
        ctx.beginPath();
        ctx.arc(xPos + cellSize / 2, yPos + cellSize / 2, cellSize / 2 - cellPadding, 0, 2 * Math.PI);

	ctx.fillStyle = "#f00";
	ctx.fill();
	}

	// Draw the cheese on the canvas
	function drawCheese() {
	// Calculate the coordinates of the cheese on the canvas
	const xPos = (mazeWidth - 1) * cellSize;
	const yPos = (mazeHeight - 1) * cellSize;

	// Draw the cheese as a triangle
	ctx.beginPath();
	ctx.moveTo(xPos + cellPadding, yPos + cellSize - cellPadding);
	ctx.lineTo(xPos + cellSize / 2, yPos + cellPadding);
	ctx.lineTo(xPos + cellSize - cellPadding, yPos + cellSize - cellPadding);
	ctx.closePath();
	ctx.fillStyle = "#ffc107";
	ctx.fill();
	}

	// Check if the player has reached the end of the maze (the cheese)
	function checkWin() {
	if (playerX === mazeWidth - 1 && playerY === mazeHeight - 1) {
	alert("You win!");
	reset();
	}
	}

	// Reset the game to its initial state
	function reset() {
	playerX = 0;
	playerY = 0;
	drawMaze();
	drawPlayer();
	drawCheese();
	}

	// Move the player in response to a key press
	function handleKeyPress(e) {
	switch (e.keyCode) {
	case 37: // left arrow
	if (playerX > 0 && maze[playerY][playerX - 1] === 1) {
	playerX--;
	}
	break;
	case 38: // up arrow
	if (playerY > 0 && maze[playerY - 1][playerX] === 1) {
	playerY--;
	}
	break;
	case 39: // right arrow
	if (playerX < mazeWidth - 1 && maze[playerY][playerX + 1] === 1) {
	playerX++;
	}
	break;
	case 40: // down arrow
	if (playerY < mazeHeight - 1 && maze[playerY + 1][playerX] === 1) {
	playerY++;
	}
	break;
	}
	drawMaze();
	drawPlayer();
	drawCheese();
	checkWin();
	}

	// Add an event listener to respond to key presses
	document.addEventListener("keydown", handleKeyPress);

	// Draw the initial state of the maze, player, and cheese
