// Libraries
import React from 'react';
import { mount } from 'enzyme';
import { findByTestAttr } from 'test/utils';

// Contexts
import successContext from 'contexts/successContext';
import guessedWordsContext from 'contexts/guessedWordsContext';

// Components
import Input from 'components/jotto_hooks/Input';
import GuessedWords from 'components/jotto_hooks/GuessedWords';

function setup(guessedWords = [], secretWord = 'party') {
  const wrapper = mount(
    <guessedWordsContext.GuessedWordsProvider>
      <successContext.SuccessProvider>
        <Input secretWord={secretWord} />
        <GuessedWords />
      </successContext.SuccessProvider>
    </guessedWordsContext.GuessedWordsProvider>
  );

  const inputBox = findByTestAttr(wrapper, 'input-box');
  const submitButton = findByTestAttr(wrapper, 'submit-button');

  // Prepopulate guessedWords context by simulating word guess
  guessedWords.forEach(word => {
    const mockEvent = { target: { value: word } };
    inputBox.simulate('change', mockEvent);
    submitButton.simulate('click');
  });

  return [wrapper, inputBox, submitButton];
}

describe('test word guesses', () => {
  let wrapper, inputBox, submitButton;

  beforeEach(() => {
    [wrapper, inputBox, submitButton] = setup(['agile'], 'party');
  });

  describe('correct guess', () => {
    beforeEach(() => {
      const mockEvent = { target: { value: 'party' } };
      inputBox.simulate('change', mockEvent);
      submitButton.simulate('click');
    });

    it('contains no children', () => {
      const inputComponent = findByTestAttr(wrapper, 'component-input');
      expect(inputComponent.children().length).toBe(0);
    });

    it('reflects updated guess count equal to GuessedWords table rows count', () => {
      const guessedWordsTableRows = findByTestAttr(wrapper, 'guessed-word');
      expect(guessedWordsTableRows.length).toBe(2);
    })
  });

  describe('incorrect guess', () => {
    beforeEach(() => {
      const mockEvent = { target: { value: 'train' } };
      inputBox.simulate('change', mockEvent);
      submitButton.simulate('click');
    });

    it('contains input box', () => {
      expect(inputBox.exists()).toBe(true);
    });
  });
});

describe('test empty word guesses', () => {
  let wrapper, inputBox, submitButton;

  beforeEach(() => {
    [wrapper, inputBox, submitButton] = setup([], 'party');
  });

  it('reflects updated guess count equal to GuessedWords table rows count', () => {
    const mockEvent = { target: { value: 'train' } };
    inputBox.simulate('change', mockEvent);
    submitButton.simulate('click');
    const guessedWordsTableRows = findByTestAttr(wrapper, 'guessed-words');
    expect(guessedWordsTableRows.length).toBe(1);
  });
});
