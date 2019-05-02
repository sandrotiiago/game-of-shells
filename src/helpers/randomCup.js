import store from '../store';

export const getRandomCup = () => {
  let totalOfCups = store.getState().settings.totalOfCups;
  return Math.floor(Math.random() * totalOfCups);
}
