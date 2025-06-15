 const hangmanImage = document.querySelector(".hangman-box img");
 const wordDisplay = document.querySelector(".word-display");
 const guessesText = document.querySelector(".guesses-correct b");
 const keyboardDiv = document.querySelector(".keyboard");
 const gameModal = document.querySelector(".game-modal");
 const playAgainBtn = document.querySelector(".play-again");

let currentWord, correctLetters = [], wrongGuessCount = 0;
const maxGuesses = 6;

const resetGame = () => {
  //resetting the game
  correctLetters = [];
  wrongGuessCount = 0;
  hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
  keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
   wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
   gameModal.classList.remove("show");
}

 const getRandomWord = () => {
    //selecting a random word and hint from the wordlist
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    console.log(word);
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
 }

 const gameOver = (isVictory) => {
  //after the game is finished
  setTimeout(() => {
    const modalText = isVictory ? `You figured out the word:` : `The correct word was:`;
    gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
    gameModal.querySelector("h4").innerText = `${isVictory ? 'Yayyy!' : 'Game Over!'}`;
    gameModal.querySelector("p").innerHTML = `${modalText}<b>${currentWord}</b>`;
    gameModal.classList.add("show");
  },300)
 }

 const initGame = (button, clickedLetter) => {
    //checking if clicked letter exists in the currentWord
   if(currentWord.includes(clickedLetter))  {
    //showing correct letters in the word display
    [...currentWord].forEach((letter, index) => {
        if(letter === clickedLetter) {
          correctLetters.push(letter) 
            wordDisplay.querySelectorAll("li")[index].innerText = letter;
            wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
        }
    });
   } else {
    // if clicked letter doesnt exist than hangman image is updated
     wrongGuessCount++;
     hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
   }
   button.disabled = true;
   guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

   //calling gameover function if any of these conditions are met
   if(wrongGuessCount === maxGuesses) return gameOver(false);
   if(correctLetters.length === currentWord.length) return gameOver(true);
 }

 //creating keyboard buttons and adding event listeners
for (let i = 97; i <=122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);