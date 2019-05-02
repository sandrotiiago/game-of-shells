import { getRandomCup } from './randomCup';

const swap = (arr, firstRandIdx, secondtRandIdx) => {
  const newArr = [...arr];

  let auxArr = newArr[firstRandIdx];
  newArr[firstRandIdx] = newArr[secondtRandIdx];
  newArr[secondtRandIdx] = auxArr;

  return newArr;
}

const shuffle = arr => {
  let firstRandIdx = getRandomCup(),
      secondtRandIdx = getRandomCup();

  while (firstRandIdx === secondtRandIdx) {
    secondtRandIdx = getRandomCup();
  }

  return swap(arr, firstRandIdx, secondtRandIdx);
}

export default shuffle;
