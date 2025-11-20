import { addElement, removeElement } from "./dom.js";
import { calcGameScore } from "./scores.js";
import { animate, camelCaseToHyphen } from "./helpers.js";
import {
  generateDisplayScreen,
  generateGameBoard,
  generateUserInput,
} from "./screens.js";

import { scores } from "./scores.js";

// FIX HERE
// these are event handlers...should they go here or dom.js??
function onGameEnd(scores) {
  const userInput = document.getElementById("user-input");
  const guess = userInput.value;
  const { err, ...scores } = calcGameScore(guess, actual);

  const gameEndEventListener = async () => {
    const playAgainButton = generateUserInput({
      button: {
        text: "Play Again 🟡",
        callback: onPlayAgain,
      },
    });

    const resultMessage = generateDisplayScreen({
      title: `Your score is ${scores.getScore()}`,
      content: [
        `You guessed ${scores.getGuess()} circles.`,
        `There were ${scores.getActual()} circles.`,
        "",
        "Would you like to play again??",
        "⭕🟣🟢??",
      ],
      userInputBox: playAgainButton,
    });

    for (const [scoreName, score] of Object.entries(scores)) {
      const scoreElement = document.querySelector(
        `.score-cell.${camelCaseToHyphen(scoreName)} .score`
      );

      scoreElement.style.opacity = 0;
      scoreElement.textContent = score;
      await animate(scoreElement, "score-animation");
    }

    await removeElement(
      document.querySelector(".game"),
      "default-animation-reverse"
    );
    await addElement(
      resultMessage,
      "default-animation",
      "after",
      document.querySelector(".scores")
    );
  };
  return gameEndEventListener;
}

async function onPlayAgain() {}

async function onGameStart() {}
