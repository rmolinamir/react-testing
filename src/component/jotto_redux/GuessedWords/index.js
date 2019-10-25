// Libraries
import React from 'react';
import PropTypes from 'prop-types';

export default function GuessedWords(props) {
  const { guessedWords } = props;

  let contents;
  if (guessedWords.length === 0) {
    contents = (
      <span data-test="guess-instructions">
        Try to guess the secret word!
      </span>
    );
  } else {
    const guessedWordsRows = guessedWords.map((word, index) => (
      <tr key={index} data-test="guessed-word">
        <td>{word.guessedWord}</td>
        <td>{word.letterMatchCount}</td>
      </tr>
    ))
    contents = (
      <div data-test="guessed-words">
        <h3>Guessed Words</h3>
        <table>
          {/* Table Head */}
          <thead>
            <tr>
              <th>Guess</th>
              <th>Matching Letters</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {guessedWordsRows}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div data-test="component-guessed-words">
      {contents}
    </div>
  );
};

GuessedWords.propTypes = {
  guessedWords: PropTypes.arrayOf(
    PropTypes.shape({
      guessedWord: PropTypes.string.isRequired,
      letterMatchCount: PropTypes.number.isRequired,
    })
  ).isRequired,
};
