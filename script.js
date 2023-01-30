let color = document.getElementById("color");
let colorButtons = document.querySelectorAll(".colorButtons");
let score = document.getElementById("score");
let lives = document.getElementById("lives");
let buttonsContainer = document.getElementById("buttons");
let reset = document.getElementById("resetButton");
let next = document.getElementById("nextButton");
let colorButtonsContainer = document.getElementsByClassName(
  "colorButtonsContainer"
);
let toggleSwitch = document.getElementById("switch");

let difficultyLevel = 0;
let scoreCount = 0;
let livesCount = 0;

function setGameStatLabels() {
  if (difficultyLevel == 0) {
    scoreCount = 0;
    livesCount = 5;
  } else {
    scoreCount = 0;
    livesCount = 3;
  }
  lives.innerHTML = livesCount;
  score.innerHTML = scoreCount;
}

function generateRandomColor() {
  let rgb = [];
  rgb[0] = Math.floor(Math.random() * 255);
  rgb[1] = Math.floor(Math.random() * 255);
  rgb[2] = Math.floor(Math.random() * 255);
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}

function pickRandomTilePosition() {
  return Math.floor(Math.random() * 5);
}

function generateRandomColorButtons() {
  correctAnswerIndex = pickRandomTilePosition();
  for (let i = 0; i < colorButtons.length; i++) {
    randColor = generateRandomColor();
    colorButtons[i].style.backgroundColor = randColor;
    colorButtonsContainer[i].style.display = "inline";
    if (i === correctAnswerIndex) {
      color.innerHTML = randColor;
      colorButtons[correctAnswerIndex].style.backgroundColor = randColor;
    }
  }
}

function resetColorButtonStates() {
  for (let i = 0; i < colorButtons.length; i++) {
    colorButtons[i].style.visibility = "visible";
    colorButtons[i].style.display = "inline";
    colorButtons[i].removeAttribute("disabled");
  }
}

function resetGame() {
  resetColorButtonStates();
  // setGameStatLabels();
  generateRandomColorButtons();
}

function nextColorCode() {
  resetColorButtonStates();
  generateRandomColorButtons();
}

function showFinalStats() {
  for (let i = 0; i < colorButtons.length; i++) {
    colorButtons[i].style.display = "none";
    colorButtonsContainer[i].style.display = "none";
  }
  buttonsContainer.classList.add("summary");

  // add title
  gameOverElement = document.createElement("div");
  gameOverElement.innerHTML = "Game Over";
  gameOverElement.style.fontSize = "25px";
  buttonsContainer.appendChild(gameOverElement);

  // add final score label
  finalScoreElement = document.createElement("div");
  finalScoreElement.innerHTML = `Final Score: ${scoreCount}`;
  finalScoreElement.style.fontSize = "20px";
  buttonsContainer.appendChild(finalScoreElement);

  // add play again button
  playAgainElement = document.createElement("button");
  playAgainElement.innerHTML = "Play Again";
  playAgainElement.classList.add("playAgainButton");
  playAgainElement.addEventListener("click", function () {
    for (let i = 0; i < colorButtons.length; i++) {
      colorButtons[i].style.visibility = "visible";
      colorButtons[i].style.display = "inline";
    }
    setGameStatLabels();
    generateRandomColorButtons();
    buttonsContainer.classList.remove("summary");
    gameOverElement.style.display = "none";
    finalScoreElement.style.display = "none";
    playAgainElement.style.display = "none";
    reset.style.display = "inline";
    next.style.display = "inline";
  });
  buttonsContainer.appendChild(playAgainElement);

  reset.style.display = "none";
  next.style.display = "none";
}

function toggleSwitchCode() {
  if (difficultyLevel == 0) {
    selectMode.classList.add("selectModeDifficult");
    difficultyLevel = 1;
    resetGame();
  } else {
    selectMode.classList.remove("selectModeDifficult");
    difficultyLevel = 0;
    resetGame();
  }
}

generateRandomColorButtons(); // load initial color tiles
setGameStatLabels(); // load initial stats

colorButtons.forEach((colorButton, currentIndex) => {
  colorButton.addEventListener("click", function () {
    if (livesCount > 0) {
      if (currentIndex == correctAnswerIndex) {
        scoreCount++;
        score.innerHTML = scoreCount;
        for (let i = 0; i < colorButtons.length; i++) {
          colorButtons[i].style.backgroundColor = randColor;
          colorButtons[i].style.visibility = "visible";
          colorButtons[i].disabled = "true";
        }
      } else {
        livesCount--;
        lives.innerHTML = livesCount;
        colorButton.style.visibility = "hidden";
        if (livesCount == 0) {
          showFinalStats();
        }
      }
    }
  });
});

reset.addEventListener("click", resetGame);
next.addEventListener("click", nextColorCode);

toggleSwitch.addEventListener("click", toggleSwitchCode);
