import { camelCaseToHyphen, animate } from "./helpers.js";

async function replaceElement(newElement, oldElementQuery, animation) {
  newElement.style.opacity = 0;

  const oldElement = document.querySelector(oldElementQuery);
  oldElement.replaceWith(newElement);

  await animate(newElement, animation);
}

async function removeElement(element, animation) {
  await animate(element, animation);
  element.remove();
}

async function addElement(element, animation, position, relativeNode) {
  element.style.opacity = 0;
  switch (position) {
    case "before":
      relativeNode.before(element);
      break;
    case "after":
      relativeNode.after(element);
      break;
    case "childOf":
      relativeNode.appendChild(element);
      break;
  }

  await animate(element, animation);
}

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
    if (value) {
      const element = document.createElement("div");
      element.classList.add(camelCaseToHyphen(componentName));
      element.textContent = value;
      displayScreen.appendChild(element);
    }
  }

  if (components.userInputBox)
    displayScreen.appendChild(components.userInputBox);

  return displayScreen;
}

function generateUserInput(
  components = {
    type: "",
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
  const userInput = document.createElement("input");
  userInput.type = userInputType;
  userInput.id = "user-input";

  if (!Object.keys(components.attributes).length === 0) {
    for (const [atr, value] in Object.entries(components.attributes)) {
      userInput.setAttribute(atr, value);
    }
  }
  userForm.appendChild(userInput);

  if (components.button) {
    const userButton = document.createElement("button");
    userButton.value = components.button;
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

export {
  addElement,
  removeElement,
  replaceElement,
  generateDisplayScreen,
  generateUserInput,
  generateGameBoard,
};
