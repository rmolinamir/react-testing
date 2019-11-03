// Libraries
import React from 'react';

const guessedWordsContext = React.createContext();

/**
 * @function useGuessedWords
 * @return {array} guessedWordsContext value, which is a state of [value, setter].
 */
function useGuessedWords() {
  const context = React.useContext(guessedWordsContext);
  if (!context) {
    throw new Error('useGuessedWords must be used within a GuessedWordsProvider');
  }
  return context;
}

/**
 * @function GuessedWordsProvider
 * @param {object} props - Props to pass through from declared component.
 * @returns {JSX.Element} - Provider component.
 */
function GuessedWordsProvider(props) {
  const [guessedWords, setGuessedWords] = React.useState([]);
  const value = React.useMemo(() => [guessedWords, setGuessedWords], [guessedWords]);
  return (
    <guessedWordsContext.Provider {...props} value={value} />
  );
}

export default {
  useGuessedWords,
  GuessedWordsProvider,
}
