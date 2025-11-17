const MAX_CIRCLE_COUNT = 50;
const CELL_COUNT = 100;

const cells = [];
let gamesPlayed = 0;
const scores = [];

const game = document.querySelector(".game");
const displayScreen = document.querySelector(".display-screen");

const playButton = document.getElementById("play-button");
playButton.addEventListener("click", playGame);

function playGame() {
  displayScreen.style.display = "none";
  game.style.display = "flex";
}

function displayScreen() {
  displayScreen.style.display = "flex";
  game.style.display = "none";
}

// Giving users more time to count if there's more circles
function setGameTimeout(circleCount) {
  if (circleCount < 10) {
    return 1;
  } else if (circleCount < 20) {
    return 2;
  } else if (circleCount < 35) {
    return 3;
  } else {
    return 5;
  }
}

// Returns row class and cell class associated with random number
// Eg 47 -> (cell-7, row-4)
function getCellCoordsFromRnd(randomNumber) {
  return {
    cell: `cell-${randomNumber % 10}`,
    row: `row-${(randomNumber - col) / 10}`,
  };
}

function selectCell(randomNumber) {
  const cellCoords = getCellCoordsFromRnd(randomNumber);
  return document.querySelector(`.${cellCoords.row} .${cellCoords.cell}`);
}

function clearBoard() {
  const filledCells = document.querySelectorAll(".circle");
  filledCells.forEach((cell) => {
    cell.classList.remove("circle");
  });
}

function generateBoardArray() {
  const circleCount = Math.floor(Math.random() * MAX_CIRCLE_COUNT);
  const cellArray = Array.from(
    { length: CELL_COUNT },
    (_value, index) => index
  );

  for (let i = CELL_COUNT - 1; 0; i--) {
    const j = Math.floor(Math.random() * CELL_COUNT);
    [cellArray[i], cellArray[j]] = [cellArray[j], cellArray[i]];
  }
  return cellArray.slice(0, circleCount);
}

function populateBoard(boardArray) {
  boardArray.forEach((cell) => {
    selectCell(cell).classList.add("circle");
  });
}

function calcGameScore(guess, actual) {
  // Score is essentially (1 - % Wrong)
  const err = Math.abs(guess - actual);
  const score = Math.round(100 * (1 - (1.0 * err) / actual));
  return scores.push(Math.round(score * 100));
}
