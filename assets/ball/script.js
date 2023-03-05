// Get a reference to the canvas and its context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set the initial position and speed of the ball
let x = canvas.width / 2;
let y = canvas.height / 2;
let dx = 2;
let dy = -2;

// Draw the ball on the canvas
function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y, 10, 0, Math.PI * 2);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

// Move the ball and detect collisions with the walls
function moveBall() {
	// Clear the canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Draw the ball
	drawBall();

	// Check for collisions with the walls
	if (x + dx > canvas.width - 10 || x + dx < 10) {
		dx = -dx;
	}
	if (y + dy > canvas.height - 10 || y + dy < 10) {
		dy = -dy;
	}

	// Update the position of the ball
	x += dx;
	y += dy;
}

// Call the moveBall function every 10 milliseconds
setInterval(moveBall, 10);
