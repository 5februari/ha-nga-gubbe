const word = "livslust";
let remainingGuesses = 12;
let guessedLetters = new Set();
let displayWord = "_".repeat(word.length);
let hangmanStep = 1;
const hangmanImages = Array.from(
  { length: 12 },
  (_, i) => `https://via.placeholder.com/300?text=Hangman${i + 1}`
);

function updateDisplay() {
  document.getElementById("word").textContent = displayWord;
  document.getElementById(
    "guesses"
  ).textContent = `kvarstående gissningar: ${remainingGuesses} | gissade bokstäver: ${[
    ...guessedLetters,
  ].join(", ")}`;
}

function checkWinLoss() {
  const messageElem = document.getElementById("message");
  if (!displayWord.includes("_")) {
    messageElem.textContent = "heja dig! ingen gubbe behövde hängas!";
    messageElem.classList.add("green-text");
    document.removeEventListener("keydown", handleGuess);
  } else if (remainingGuesses === 0) {
    messageElem.textContent = `du vann inte, men vi skonar gubben ändå, ordet var: ${word}`;
    messageElem.classList.add("red-text");
    document.removeEventListener("keydown", handleGuess);
  }
}

function updateHangmanImage() {
  const hangmanImageElement = document.getElementById("hangman-image");
  const urlBase =
    "https://cdn.glitch.global/3e0f2c01-9ab0-4839-bfe8-0726889c3591/gubbe";
  const urlExtension = ".png?v=1707936592679";
  hangmanImageElement.src = urlBase + hangmanStep + urlExtension;
}

function handleGuess(event) {
  const guess = event.key.toLowerCase();
  if (!guessedLetters.has(guess)) {
    guessedLetters.add(guess);
    if (!word.includes(guess)) {
      remainingGuesses--;
      hangmanStep = Math.min(hangmanStep + 1, 12);
      updateHangmanImage();
    } else {
      for (let i = 0; i < word.length; i++) {
        if (word[i] === guess) {
          displayWord =
            displayWord.substring(0, i) + guess + displayWord.substring(i + 1);
        }
      }
    }
    updateDisplay();
    checkWinLoss();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateDisplay();
  updateHangmanImage();
  document.addEventListener("keydown", handleGuess);

  document.getElementById("previous").addEventListener("click", () => {
    window.location.href = "https://graygoosimulator.com"; 
  });

  document.getElementById("next").addEventListener("click", () => {
    window.location.href = "https://ilovemy3.shoes"; 
  });
});
