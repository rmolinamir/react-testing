// Libraries
import { combineReducers } from 'redux';

// Reducers
import guessedWords from './guessedWordsReducer';
import secretWord from './secretWordReducer';
import success from './successReducer';

export default combineReducers({
  guessedWords,
  secretWord,
  success,
})