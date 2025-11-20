const scores = () => {
  let playCount = 0;
  const scores = [];
  const errors = [];
  const guesses = [];
  const actuals = [];

  function calcGameScore(guess, actual) {
    playCount += 1;
    guesses.push(guess);
    actuals.push(actual);
    const err = calcError(guess, actual);
    const scoreLastPlayed = actual - err;
    // Score is essentially (1 - % Wrong)
    const successRateLastPlayed = calcSuccessRate(guess, actual);
    errors.push(err);
    scores.push(scoreLastPlayed);

    const sumGuesses = guesses.reduce((sum, gs) => sum + gs);
    const sumActuals = actuals.reduce((sum, actl) => sum + actl);
    /**@type {number} */
    const sumScores = scores.reduce((sum, scr) => sum + scr);

    return {
      err,
      playCount,
      scoreLastPlayed,
      successRateLastPlayed,
      totalScore: sumScores,
      totalSuccessRate: calcSuccessRate(sumGuesses, sumActuals),
    };
  }

  return {
    getPlayCount: () => playCount,
    setPlayCount: (plCnt) => (playCount = plCnt),
    addScore: (scr) => scores.push(scr),
    getScore: () => scores[scores.length - 1],
    getScores: () => scores,
    addError: (err) => errors.push(err),
    getError: () => errors[errors.length - 1],
    getErrors: () => errors,
    addGuess: (gss) => guesses.push(gss),
    getGuess: () => guesses[guesses.length - 1],
    getGuesses: () => guesses,
    addActual: (actl) => actuals.push(actl),
    getActual: () => actuals[actuals.length - 1],
    getActuals: () => actuals,
    calcGameScore,
  };
};

function calcGameScore(guess, actual) {
  playCount += 1;
  guesses.push(guess);
  actuals.push(actual);
  const err = calcError(guess, actual);
  const scoreLastPlayed = actual - err;
  // Score is essentially (1 - % Wrong)
  const successRateLastPlayed = calcSuccessRate(guess, actual);
  errors.push(err);
  scores.push(scoreLastPlayed);

  const sumGuesses = guesses.reduce((sum, gs) => sum + gs);
  const sumActuals = actuals.reduce((sum, actl) => sum + actl);
  /**@type {number} */
  const sumScores = scores.reduce((sum, scr) => sum + scr);

  return {
    err,
    playCount,
    scoreLastPlayed,
    successRateLastPlayed,
    totalScore: sumScores,
    totalSuccessRate: calcSuccessRate(sumGuesses, sumActuals),
  };
}

function calcSuccessRate(guess, actual) {
  return Math.round(100 * (1 - (1.0 * calcError(guess, actual)) / actual));
}

function calcError(guess, actual) {
  return Math.abs(guess - actual);
}

export { scores };
