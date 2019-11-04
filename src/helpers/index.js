/**
 * @method getLetterMatchCount
 * @param {*} guessedWord - Guessed word.
 * @param {*} secretWord - Secret word.
 * @returns {number} - Number of letters matched between guessed word and secret word.
 */
export function getLetterMatchCount(guessedWord, secretWord) {
  const guessedLetterSet = new Set(guessedWord.split(''));
  const secretLetterSet = new Set(secretWord.split(''));
  return [...secretLetterSet].filter(letter => guessedLetterSet.has(letter)).length;
};
