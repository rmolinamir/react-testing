// Libraries
import moxios from 'moxios';

// Dependencies
import { getSecretWord } from '.';

describe('moxios tests', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('calls the getSecretWord callback on axios response', async () => {
    const secretWord = 'party';

    // 
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: secretWord,
      });
    });

    // create mock for callback arg
    const setSecretWordMock = jest.fn();

    // Async action that fetches the secret word.
    await getSecretWord(setSecretWordMock);

    // See whether mock was run with the correct argument.
    expect(setSecretWordMock).toHaveBeenCalledWith(secretWord);
  });
});
