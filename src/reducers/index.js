// Libraries
import { combineReducers } from 'redux';

// Reducers
import guessedWord from './guessedWordReducer';
import success from './successReducer';

export default combineReducers({
  guessedWord,
  success,
})