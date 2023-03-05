// Generate a random number between 1 and 100
const randomNumber = Math.floor(Math.random() * 100) + 1;

// Get references to the HTML elements
const guessInput = document.getElementById("guessInput");
const guessButton = document.getElementById("guessButton");
const result = document.getElementById("result");

// Add an event listener to the button
guessButton.addEventListener("click", function() {
	// Get the player's guess
	const guess = parseInt(guessInput.value);

	// Check if the guess is valid
	if (isNaN(guess) || guess < 1 || guess > 100) {
		result.textContent = "Please enter a number between 1 and 100.";
	} else {
		// Check if the guess is correct
		if (guess === randomNumber) {
			result.textContent = "Congratulations! You guessed the number!";
			guessButton.disabled = true;
			guessInput.disabled = true;
		} else {
			// Give a hint
			result.textContent = `Sorry, that's not the number. ${guess < randomNumber ? "Try a higher number." : "Try a lower number."}`;
		}
	}
});
