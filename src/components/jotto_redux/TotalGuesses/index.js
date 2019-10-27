// Libraries
import React from 'react';
import PropTypes from 'prop-types';

export default function TotalGuesses(props) {
  const { guessedWords } = props;
  return (
    <div data-test="component-total-guesses">
      <h6 className="mt-1 mb-3">Total Guesses: {guessedWords.length}</h6>
    </div>
  );
}

TotalGuesses.propTypes = {
  guessedWords: PropTypes.instanceOf(Array).isRequired,
};
