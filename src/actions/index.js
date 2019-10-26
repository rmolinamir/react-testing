export const actionTypes = {
  GUESS_WORD: 'GUESS_WORD',
  CORRECT_GUESS: 'CORRECT_GUESS',
};

/**
 * Returns Redux Thunk function that dispatches GUESS_WORD action
 *      and (conditionally) CORRECT_GUESS action.
 * @function guessWord
 * @param {string} guessedWord - Guessed word.
 * @returns {function} - Redux Thunk function.
 */
export const guessWord = guessedWord => {
  return function(dispatch, getState) {

  };
};
