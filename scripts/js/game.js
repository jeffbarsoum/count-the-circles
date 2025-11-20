const MAX_CIRCLE_COUNT = 50;
const CELL_COUNT = 100;

const boardArrays = [];

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

  const boardArray = cellArray.slice(0, circleCount);
  boardArrays.push(boardArray);

  return {
    boardArray,
    MAX_CIRCLE_COUNT,
    CELL_COUNT,
  };
}

export { generateBoardArray, setGameTimeout };
