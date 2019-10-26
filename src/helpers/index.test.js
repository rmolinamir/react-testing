import { getLetterMatchCount } from '.';

describe('getLetterMatchCount', () => {
  const secretWord = 'party';
  it('returns correct count when there are no matching letters', () => {
    const lettersMatchCount = getLetterMatchCount('bones', secretWord);
    expect(lettersMatchCount).toBe(0);
  });

  it('returns correct count when there are 3 matching letters', () => {
    const lettersMatchCount = getLetterMatchCount('train', secretWord);
    expect(lettersMatchCount).toBe(3);
  });

  it('returns correct count when there are duplicate letters in the guess', () => {
    
    const lettersMatchCount = getLetterMatchCount(secretWord, secretWord);
    expect(lettersMatchCount).toBe(secretWord.length);
  });
})