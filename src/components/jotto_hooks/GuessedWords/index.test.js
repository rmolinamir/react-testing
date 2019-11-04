// Libraries
import React from 'react';
import { shallow } from 'enzyme';

// Dependencies
import { findByTestAttr } from 'test/utils';
import { languageStrings } from 'helpers/strings';

// Components
import GuessedWords from '.';

// Contexts
import guessedWordsContext from 'contexts/guessedWordsContext';

/**
 * Factory function to create a ShallowWrapper for the GuessedWords component
 * @function setup
 * @param {array} guessedWords - Component guessed words array of objects.
 * @returns {shallowWrapper}
 */
function setup(guessedWords = []) {
  const useGuessedWordsMock = jest.fn().mockReturnValue([guessedWords, jest.fn()])
  guessedWordsContext.useGuessedWords = useGuessedWordsMock;
  return shallow(<GuessedWords />);
}

describe('if there are no words guessed', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup([]);
  });

  it('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-guessed-words');
    expect(component.length).toBe(1);
  });

  it('renders instructions to guess a word', () => {
    const instructions = findByTestAttr(wrapper, 'guess-instructions');
    expect(instructions.text().length).not.toBe(0);
  });
});

describe('if there are words guessed', () => {
  let wrapper;
  const guessedWords = [
    { guessedWord: 'train', letterMatchCount: 3 },
    { guessedWord: 'agile', letterMatchCount: 1 },
    { guessedWord: 'party', letterMatchCount: 5 },
  ];

  beforeEach(() => {
    wrapper = setup(guessedWords);
  });

  it('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-guessed-words');
    expect(component.length).toBe(1);
  });

  it('renders instructions to guess a word', () => {
    const guessedWordsNode = findByTestAttr(wrapper, 'guessed-words');
    expect(guessedWordsNode.length).toBe(1);
  });

  it('correct number of guessed words', () => {
    const guessedWordsNodes = findByTestAttr(wrapper, 'guessed-word');
    expect(guessedWordsNodes.length).toBe(guessedWords.length);
  });

  it('renders the correct guess number for each guessed word', () => {
    const guessedWordsNodes = findByTestAttr(wrapper, 'guessed-word-number');
    guessedWordsNodes.forEach((node, index) => {
      expect(node.text()).toContain(`${index + 1}`);
    });
  });
});

describe('`languagePicker`', () => {
  it('correctly renders guess instructions string in English by default', () => {
    const wrapper = setup([]);
    const guessIntructions = findByTestAttr(wrapper, 'guess-instructions');
    expect(guessIntructions.text()).toBe(languageStrings.en.guessPrompt);
  });

  it('correctly renders guess instructions string in emoji', () => {
    const useContextMock = jest.fn().mockReturnValue('emoji');
    React.useContext = useContextMock;
    const wrapper = setup([]);
    const guessIntructions = findByTestAttr(wrapper, 'guess-instructions');
    expect(guessIntructions.text()).toBe(languageStrings.emoji.guessPrompt);
  });
});
