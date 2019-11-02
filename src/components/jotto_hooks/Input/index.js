// Libraries
import React from 'react';
import PropTypes from 'prop-types';

// Dependencies
import languageContext from 'contexts/languageContext';
import stringsModule from 'helpers/strings/index'

export default function Input(props) {
  const [currentGuess, setCurrentGuess] = React.useState('');
  const language = React.useContext(languageContext);

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
   * TODO: Update `guessedWords` context.
   * TODO: Check if `currentGuess` matches `secretWord`, and update `success` context
   * if they are equal.
   */
  function handleOnClick(event) {
    event.preventDefault();
    setCurrentGuess('');
  }

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
