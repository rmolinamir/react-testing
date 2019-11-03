// Libraries
import React from 'react';

// Dependencies
import stringsModule from 'helpers/strings';

// Contexts
import languageContext from 'contexts/languageContext';
import guessedWordsContext from 'contexts/guessedWordsContext';

export default function GuessedWords(props) {
  const language = React.useContext(languageContext);
  const [guessedWords] = guessedWordsContext.useGuessedWords();

  let contents;
  if (guessedWords.length === 0) {
    contents = (
      <span data-test="guess-instructions">
        {stringsModule.getStringByLanguage(language, 'guessPrompt')}
      </span>
    );
  } else {
    const guessedWordsRows = guessedWords.map((word, index) => (
      <tr key={index} data-test="guessed-word">
        <td data-test="guessed-word-number">{index + 1}</td>
        <td>{word.guessedWord}</td>
        <td>{word.letterMatchCount}</td>
      </tr>
    ))
    contents = (
      <div data-test="guessed-words">
        <h3>{stringsModule.getStringByLanguage(language, 'guessColumnHeader')}</h3>
        <table className="table table-sm">
          {/* Table Head */}
          <thead className="thead-light">
            <tr>
              <th>
                {stringsModule.getStringByLanguage(language, 'guessedWordAttemptNumberHeader')}
              </th>
              <th>
                {stringsModule.getStringByLanguage(language, 'guessedWords')}
              </th>
              <th>
                {stringsModule.getStringByLanguage(language, 'matchingLettersColumnHeader')}
              </th>
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
