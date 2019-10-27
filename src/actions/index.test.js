// Libraries
import moxios from 'moxios';

// Dependencies
import { storeFactory } from 'test/utils';
import { getSecretWord } from '.'

describe('getSecretWord action creator', () => {
  beforeEach(() => {
    moxios.install();
  });

  // Resets axios to its original state.
  afterEach(() => {
    moxios.uninstall();
  });

  it('adds response word to state', () => {
    const secretWord = 'party';
    const store = storeFactory();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: secretWord,
      });
    });

    // store.dispatch returns a Promise
    return store.dispatch(getSecretWord()).then(response => {
      const newState = store.getState();
      expect(newState.secretWord).toBe(secretWord);
    });
  });
});
