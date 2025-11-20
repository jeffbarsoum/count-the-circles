import { camelCaseToHyphen } from "./helpers";

function generateDisplayScreen(
  components = {
    title,
    content: undefined,
    userInputBox: undefined,
  }
) {
  const displayScreen = document.createElement("div");
  displayScreen.classList.add("display-screen");
  displayScreen.style.opacity = 0;

  for (const [componentName, value] of Object.entries(components)) {
    const element = document.createElement("div");
    element.classList.add(camelCaseToHyphen(componentName));

    if (value && Array.isArray(value)) {
      value.forEach((row) => {
        const elementRow = document.createElement("div");
        elementRow.classList.add(camelCaseToHyphen(componentName) + "-row");
        elementRow.textContent = value;
        element.appendChild(elementRow);
      });
    } else if (value) {
      element.textContent = value;
    }
    displayScreen.appendChild(element);
  }

  if (components.userInputBox)
    displayScreen.appendChild(components.userInputBox);

  return displayScreen;
}

function generateUserInput(
  components = {
    type: undefined,
    label: undefined,
    attributes: {},
    button: { text: "Change Me", callback: undefined },
  }
) {
  const userForm = document.createElement("form");

  if (components.label) {
    const label = document.createElement("label");
    label.textContent = label;
    userForm.appendChild(label);
  }

  if (components.type) {
    const userInput = document.createElement("input");
    userInput.type = userInputType;
    userInput.id = "user-input";

    if (!Object.keys(components.attributes).length === 0) {
      for (const [atr, value] in Object.entries(components.attributes)) {
        userInput.setAttribute(atr, value);
      }
    }
    userForm.appendChild(userInput);
  }

  if (components.button) {
    const userButton = document.createElement("button");
    userButton.value = components.button.text;
    if (components.button.callback)
      userButton.addEventListener("click", components.button.callback);
    userForm.appendChild(userButton);
  }

  const userInputBox = document.createElement("div");
  userInputBox.classList.add("user-input-box");
  userInputBox.appendChild(userForm);

  return userInputBox;
}

function generateGameBoard(boardArrayData) {
  const { boardArray, CELL_COUNT } = boardArrayData;

  const gameBoard = document.createElement("div");
  gameBoard.classList.add("game");
  gameBoard.style.opacity = 0;

  for (let i = 0; i < CELL_COUNT; i++) {
    const gameCell = document.createElement("div");
    gameCell.classList.add(`cell-${i}`);
    gameBoard.appendChild(gameCell);

    if (boardArray.includes(i)) {
      const circle = document.createElement("div");
      circle.classList.add(circle);
      gameCell.appendChild(circle);
    }
  }

  return gameBoard;
}

function generatePlayAgainScreen(
  components = {
    title,
    content: undefined,
    userInputBox: undefined,
  }
) {
  return generateDisplayScreen({
    title,
  });
}

function generateThanksForPlayingScreen() {}

export { generateDisplayScreen, generateUserInput, generateGameBoard };
