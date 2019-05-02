import { UPDATE_SETTINGS } from '../actions/types';

const initialState = {
  difficulty: 'slow',
  totalOfCups: 3
}

export default (state = initialState, action) => {
  switch(action.type) {
    case UPDATE_SETTINGS:
      return {
        difficulty: action.difficulty ? action.difficulty : state.difficulty,
        totalOfCups: action.totalOfCups ? action.totalOfCups : state.totalOfCups
      }

    default:
      return state
  }
}
