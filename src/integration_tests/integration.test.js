import { storeFactory } from 'test/utils';
import { guessWord } from 'actions';

describe('guessWord action dispatcher', () => {
  const secretWord = 'party';
  const unsuccessfulGuess = 'train';

  describe('no guessed words', () => {
    let store;
    const initialState = { secretWord };
    beforeEach(() => {
      store = storeFactory(initialState);
    });

    it('updates state correctly for unsuccessful guess', () => {
      store.dispatch(guessWord(unsuccessfulGuess));
      const newState = store.getState();
      const expectedState = {
        guessedWords: [{
          guessedWord: unsuccessfulGuess,
          letterMatchCount: 3,
        }],
        secretWord,
        success: false,
      }
      expect(newState).toEqual(expectedState);
    });

    it('updates state correctly for successful guess', () => {
      store.dispatch(guessWord(secretWord));
      const newState = store.getState();
      const expectedState = {
        guessedWords: [{
          guessedWord: secretWord,
          letterMatchCount: secretWord.length,
        }],
        secretWord,
        success: true,
      };
      expect(newState).toEqual(expectedState);
    });
  });

  describe('some guessed words', () => {
    const guessedWords = [
      { guessedWord: 'agile', letterMatchCount: 1 },
      { guessedWord: 'image', letterMatchCount: 1 },
    ];
    const initialState = { guessedWords, secretWord };
    let store;
    beforeEach(() => {
      store = storeFactory(initialState);
    });

    it('updates state correctly for unsuccessful guess', () => {
      store.dispatch(guessWord(unsuccessfulGuess));
      const newState = store.getState();
      const expectedState = {
        guessedWords: [
          ...guessedWords,
          { guessedWord: unsuccessfulGuess, letterMatchCount: 3 }
        ],
        secretWord,
        success: false,
      };
      expect(newState).toEqual(expectedState);
    });

    it('updates state correctly for successful guess', () => {
      store.dispatch(guessWord(secretWord));
      const newState = store.getState();
      const expectedState = {
        guessedWords: [
          ...guessedWords,
          { guessedWord: secretWord, letterMatchCount: secretWord.length }
        ],
        secretWord,
        success: true,
      };
      expect(newState).toEqual(expectedState);
    });
  });
});
