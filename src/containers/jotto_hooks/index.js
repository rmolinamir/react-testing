// Libraries
import React from 'react';

// Dependencies
import hookActions from 'actions/hookActions';
import languageContext from 'contexts/languageContext';
import successContext from 'contexts/successContext'
import guessedWordsContext from 'contexts/guessedWordsContext'

// Components
import Input from 'components/jotto_hooks/Input';
import LanguagePicker from 'components/jotto_hooks/LanguagePicker';
import Congrats from 'components/jotto_hooks/Congrats';
import GuessedWords from 'components/jotto_hooks/GuessedWords';

const actionTypes = {
  SET_SECRET_WORD: 'SET_SECRET_WORD',
  SET_LANGUAGE: 'SET_LANGUAGE',
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
    case actionTypes.SET_LANGUAGE:
      return { ...state, language: payload };
    default:
      return state;
  };
}

export default function JottoHooks() {
  const [state, dispatch] = React.useReducer(
    reducer,
    { secretWord: null, language: 'en' },
  );

  /**
   * @param {string} secretWord 
   */
  function setSecretWord(secretWord) {
    dispatch({
      type: actionTypes.SET_SECRET_WORD,
      payload: secretWord,
    });
  }

  /**
   * @param {string} secretWord 
   */
  function setLanguage(language) {
    dispatch({
      type: actionTypes.SET_LANGUAGE,
      payload: language,
    });
  }

  React.useEffect(() => {
    hookActions.getSecretWord(setSecretWord);
  }, [dispatch]);

  const { secretWord, language } = state;

  if (!secretWord) {
    return (
      <div className="container" data-test="spinner">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p>Loading secret word</p>
      </div>
    );
  }

  return (
    <div className="container" data-test="component-jotto-hooks">
      <h1>Jotto Hooks</h1>
      <languageContext.Provider value={language}>
        <LanguagePicker setLanguage={setLanguage} />
        <successContext.SuccessProvider>
          <Congrats />
          <guessedWordsContext.GuessedWordsProvider>
            <Input secretWord={secretWord} />
            <GuessedWords />
          </guessedWordsContext.GuessedWordsProvider>
        </successContext.SuccessProvider>
          
      </languageContext.Provider>
    </div>
  );
}
