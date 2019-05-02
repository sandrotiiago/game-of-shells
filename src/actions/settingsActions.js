import { UPDATE_SETTINGS } from '../actions/types';

function dispatchUpdateSettings(difficulty, total) {
  return {
    type: UPDATE_SETTINGS,
    difficulty,
    totalOfCups: total
  }
}

export const updateSettings = (difficulty, total) => dispatch => {
  dispatch(dispatchUpdateSettings(difficulty, total));
}
