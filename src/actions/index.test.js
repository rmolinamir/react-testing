// Libraries
import moxios from 'moxios';

// Dependencies
import { storeFactory } from 'test/utils';
import { getSecretWord, getNewWord } from '.'

const secretWord = 'party';

function setupStoreAndMoxios(initialState) {
  const store = storeFactory(initialState);

  moxios.wait(() => {
    const request = moxios.requests.mostRecent();
    request.respondWith({
      status: 200,
      response: secretWord,
    });
  });

  return store;
}

describe('`getSecretWord` action creator', () => {
  let store;
  beforeEach(() => {
    moxios.install();
    store = setupStoreAndMoxios();
  });

  // Resets axios to its original state.
  afterEach(() => {
    moxios.uninstall();
  });

  it('adds response word to state', () => {
    // store.dispatch returns a Promise
    return store.dispatch(getSecretWord()).then(() => {
      const newState = store.getState();
      expect(newState.secretWord).toBe(secretWord);
    });
  });

  it('testing jest.fn()', () => {
    const guessSecretWordCallback = jest.fn();
    guessSecretWordCallback();
    expect(guessSecretWordCallback.mock.calls.length).toBe(1);
  });

  it('executes callback if passed', () => {
    const guessSecretWordCallback = jest.fn();
    return store.dispatch(getSecretWord(guessSecretWordCallback)).then(() => {
      expect(guessSecretWordCallback.mock.calls.length).toBe(1);
    });
  });
});

describe('`getNewWord` action creator', () => {
  const initialState = {
    guessedWords: [
      { guessedWord: 'train', letterMatchCount: 3 },
      { guessedWord: 'raids', letterMatchCount: 3 },
    ],
    secretWord: 'test_secret_word',
    success: true,
  };
  let store;
  beforeEach(() => {
    moxios.install();
    store = setupStoreAndMoxios(initialState);
  });

  // Resets axios to its original state.
  afterEach(() => {
    moxios.uninstall();
  });

  it('`guessedWords` piece of state is an empty array', () => {
    return store.dispatch(getNewWord()).then(response => {
      const newState = store.getState();
      expect(newState.guessedWords).toEqual([]);
    });
  });

  it('`secretWord` piece of state changes', () => {
    return store.dispatch(getNewWord()).then(response => {
      const newState = store.getState();
      expect(newState.secretWord).not.toBe(initialState.secretWord);
    });
  });

  it('`success` piece of state is false', () => {
    return store.dispatch(getNewWord()).then(response => {
      const newState = store.getState();
      expect(newState.success).toBe(!initialState.success);
    });
  });
});
