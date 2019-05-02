// Minimum number of cups
export const MIN_CUPS = 3;

// Maximum number of cups
export const MAX_CUPS = 6;

// Availables difficulties/speeds
export const DIFFICULTIES = [
  {
    name: 'slow',
    iteration: 750 // milliseconds
  },
  {
    name: 'medium',
    iteration: 600 // milliseconds
  },
  {
    name: 'fast',
    iteration: 500 // milliseconds
  }
];

// Duration of ball animations (in milliseconds)
export const DURATIONS = {
  ballPlacing: 1500,
  shuffling: 10000,
  delayAfterBallPlacing: 800
}

const getDifficultyByName = diff => {
  let filteredDifficulties = DIFFICULTIES.filter((d) => d.name === diff);
  return filteredDifficulties.length ? filteredDifficulties[0] : null;
}

export const getNumberOfIterations = diff => {
  const difficulty = getDifficultyByName(diff);
  return difficulty ? parseInt(DURATIONS.shuffling / difficulty.iteration, 10) : 0;
}

export const getIterationDuration = diff => {
  const difficulty = getDifficultyByName(diff);
  return difficulty ? difficulty.iteration : 0;
}

export const getShufflingAndBallPlacingDuration = diff => {
  const difficulty = getDifficultyByName(diff);
  return difficulty ? DURATIONS.shuffling + DURATIONS.ballPlacing + DURATIONS.delayAfterBallPlacing : 0;
}
