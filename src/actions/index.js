// Libraries
import axios from 'axios';

// Dependencies
import { getLetterMatchCount } from 'helpers';

export const actionTypes = {
  GUESS_WORD: 'GUESS_WORD',
  CORRECT_GUESS: 'CORRECT_GUESS',
  SET_SECRET_WORD: 'SET_SECRET_WORD',
  NEW_WORD: 'NEW_WORD',
  GIVE_UP: 'GIVE_UP',
};

/**
 * Returns Redux Thunk function that dispatches `GUESS_WORD` action
 * and (conditionally) `CORRECT_GUESS` action.
 * @function guessWord
 * @param {string} guessedWord - Guessed word.
 * @returns {Function} - Redux Thunk function.
 */
export const guessWord = guessedWord => {
  return function(dispatch, getState) {
  const { secretWord } = getState();
    const letterMatchCount = getLetterMatchCount(guessedWord, secretWord);

    dispatch({
      type: actionTypes.GUESS_WORD,
      payload: { guessedWord, letterMatchCount },
    });

    if (guessedWord === secretWord) {
      dispatch({ type: actionTypes.CORRECT_GUESS });
    }
  };
};

/**
 * Returns a promise that fetches the secret word from the local server.
 * Dispatches `SET_SECRET_WORD` action executed after the promise is resolved.
 * @function getSecretWord
 * @param {Function} callback - callback (conditionally) executed after the server request is resolved.
 * @returns {Function} - Redux Thunk function.
 */
export const getSecretWord = callback => {
  return dispatch => {
    return axios.get('http://localhost:3030').then(response => {
      dispatch({
        type: actionTypes.SET_SECRET_WORD,
        payload: response.data,
      });
      if (callback) callback();
    });
  };
};

/**
 * Executes `getSecretWord` and sends a callback parameter to the Redux Thunk function
 * that resets the store `guessedWords` reducer, and the `success` reducer.
 * @function getNewWord
 * @return {Function}
 */
export const getNewWord = () => {
  return dispatch => {
    /**
     * `getSecretWord` is a function that returns a function. The `dispatch` parameter
     * must be passed to `getSecretWord`'s returned function.
     */
    return getSecretWord(() => {
      dispatch({
        type: actionTypes.NEW_WORD,
      });
    })(dispatch);
  };
};

/**
 * Returns Redux Thunk function that dispatches `GIVE_UP`.
 * @function giveUp
 * @returns {function} - Redux Thunk function.
 */
export const giveUp = () => {
  return dispatch => {

  }
}
