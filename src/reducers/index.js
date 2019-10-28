// Libraries
import { combineReducers } from 'redux';

// Reducers
import giveUp from './giveUpReducer';
import guessedWords from './guessedWordsReducer';
import secretWord from './secretWordReducer';
import success from './successReducer';

export default combineReducers({
  giveUp,
  guessedWords,
  secretWord,
  success,
})