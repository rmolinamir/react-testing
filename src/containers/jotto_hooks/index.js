// Libraries
import React from 'react';

// Dependencies
import hookActions from 'actions/hookActions';

const actionTypes = {
  SET_SECRET_WORD: 'SET_SECRET_WORD',
}

/**
 * Reducer to update state, called automatically by `dispatch`.
 * @param {object} state - Existing state.
 * @param {object} action - Contain the `type` and `payload` properties for the state update.
 * @return {object} - New state.
 */
function reducer(state, action = {}) {
  const { type, payload } = action;
  switch(type) {
    case actionTypes.SET_SECRET_WORD:
      return { ...state, secretWord: payload };
    default:
      return state;
  };
}

export default function JottoHooks() {
  const [state, dispatch] = React.useReducer(
    reducer,
    { secretWord: null },
  );

  /**
   * 
   * @param {string} secretWord 
   */
  function setSecretWord(secretWord) {
    dispatch({
      type: actionTypes.SET_SECRET_WORD,
      payload: secretWord,
    });
  }

  React.useEffect(() => {
    hookActions.getSecretWord(setSecretWord);
  }, [dispatch]);

  return (
    <div data-test="component-jotto-hooks" />
  );
}
