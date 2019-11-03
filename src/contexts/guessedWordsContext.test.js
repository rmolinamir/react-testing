// Libraries
import React from 'react';
import { shallow, mount } from 'enzyme';

// Dependencies
import guessedWordsContext from './guessedWordsContext';

// Functional component that calls useGuessedWords for our tests
function FunctionalComponent() {
  guessedWordsContext.useGuessedWords();
  return <div />
}

it('useGuessedWords throws error whhen not wrapper in GuessedWordsProvider', () => {
  expect(() => {
    shallow(<FunctionalComponent />);
  }).toThrow('useGuessedWords must be used within a GuessedWordsProvider');
});

it('useGuessedWords does not throw error when wrapped in GuessedWordsProvider', () => {
  expect(() => {
    mount(
      <guessedWordsContext.GuessedWordsProvider>
        <FunctionalComponent />
      </guessedWordsContext.GuessedWordsProvider>
    );
  }).not.toThrow('useGuessedWords must be used within a GuessedWordsProvider');
});
