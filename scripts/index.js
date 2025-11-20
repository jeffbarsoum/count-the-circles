import { calcGameScore } from "./js/scores.js";
import { generateBoardArray, setGameTimeout } from "./js/game.js";
import {
  addElement,
  removeElement,
  replaceElement,
  generateDisplayScreen,
  generateGameBoard,
  generateUserInput,
  updateScores,
} from "./js/dom.js";

// Invoked immediately upon page load for game setup
(async () => {
  const playButton = document.getElementById("play-button");
  playButton.addEventListener("click", playGame);

  await addDisplayScreen({
    title: "Welcome to 'Count the Circles!",
    content:
      "Press 'Play Game' to start the game! Count the circles that appear on the screen before they disappear!",
  });
})();

async function playGame() {
  const scores = document.querySelector(".scores");

  const boardArrayData = generateBoardArray();
  const actual = boardArray.length;
  const timeout = setGameTimeout(actual);
  const board = generateGameBoard(boardArrayData);

  const gameCountdown = 3;
  while (gameCountdown > 0) {
    const displayScreen = generateDisplayScreen({ title: `${gameCountdown}!` });
    const oldDisplayScreen = document.querySelector(".display-screen");
    await removeElement(oldDisplayScreen, "default-animation-reverse");
    await addElement(displayScreen, "default-animation", "after", scores);
    await sleep(1000);
    gameCountdown--;
  }

  await removeElement(
    document.querySelector(".display-screen"),
    "default-animation-reverse"
  );
  const goMessage = await addElement(
    generateDisplayScreen({ title: "Count!" }),
    "default-animation",
    "after",
    scores
  );

  await sleep(100);
  await removeElement(goMessage, "default-animation-reverse");
  await addElement(board, "default-animation");
  await sleep(timeout);

  await removeElement(board, "default-animation-reverse");
  await addElement(
    generateDisplayScreen({
      title: "How many circles?? 🟢🤔",
      userInputBox: generateUserInput({
        type: "number",
        attributes: {
          min: 0,
          max: boardArrayData.MAX_CIRCLE_COUNT,
          placeholder: 0,
        },
        button: "Submit Your Guess ⭕",
      }),
    }),
    "default-animation",
    "after",
    scores
  );

  document
    .querySelector(".user-input-box button")
    .addEventListener("click", updateScores, { useOnce: true });
}
