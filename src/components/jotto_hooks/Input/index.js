// Libraries
import React from 'react';
import PropTypes from 'prop-types';

// Dependencies
import stringsModule from 'helpers/strings/index';
import { getLetterMatchCount } from 'helpers';

// Contexts
import languageContext from 'contexts/languageContext';
import successContext from 'contexts/successContext';
import guessedWordsContext from 'contexts/guessedWordsContext';

export default function Input(props) {
  const { secretWord } = props;
  const [currentGuess, setCurrentGuess] = React.useState('');
  const language = React.useContext(languageContext);
  const [success, setSuccess] = successContext.useSuccess();
  const [guessedWords, setGuessedWords] = guessedWordsContext.useGuessedWords();

  /**
   * Handles input `onChange` event by setting the `currentGuess` value.
   * @param {object} event - Input on change event.
   */
  function handleOnChange(event) {
    event.preventDefault();
    setCurrentGuess(event.target.value);
  }

  /**
   * Handles submit button `onClick` event by clearing the `currentGuess` value.
   * @param {object} event - Input on change event.
   */
  function handleOnClick(event) {
    event.preventDefault();
    if (currentGuess) {
      const letterMatchCount = getLetterMatchCount(currentGuess, secretWord);
      const newGuessedWords = [...guessedWords, { guessedWord: currentGuess, letterMatchCount }];
      setGuessedWords(newGuessedWords);
      if(currentGuess === secretWord) {
        setSuccess(true);
      }
      setCurrentGuess('');
    }
  }

  if (success) return null;

  return (
    <div data-test="component-input">
      <form className="form-inline">
        <input
          data-test="input-box"
          className="mb-2 mx-sm-3"
          type="text"
          placeholder="Enter guess"
          value={currentGuess}
          onChange={handleOnChange}
        />
        <button
          data-test="submit-button"
          onClick={handleOnClick}
          className="btn btn-primary mb-2"
        >
          {stringsModule.getStringByLanguage(language, 'submit')}
        </button>
      </form>
    </div>
  )
}

Input.propTypes = {
  secretWord: PropTypes.string.isRequired,
}
