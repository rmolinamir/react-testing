// Libraries
import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, checkPropTypes } from 'test/utils';
import TotalGuesses from '.';

const defaultProps = {
  guessedWords: [
    { guessedWord: 'train', letterMatchCount: 3 },
    { guessedWord: 'raids', letterMatchCount: 3 },
  ]
};

/**
 * Factory function to create a ShallowWrapper for the TotalGuesses component
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @return {ShallowWrapper}
 */
function setup(props = {}) {
  const wrapper = shallow(<TotalGuesses {...props} />);
  return wrapper;
}

it('does not throw warning with expected props', () => {
  checkPropTypes(TotalGuesses, defaultProps);
});

describe('if there are no guessed words', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({ guessedWords: [] });
  });

  it('renders without crashing', () => {
    const totalGuessesComponent = findByTestAttr(wrapper, 'component-total-guesses');
    expect(totalGuessesComponent.length).toBe(1);
  });

  it('renders the correct number of guesses', () => {
    const totalGuessesComponent = findByTestAttr(wrapper, 'component-total-guesses');
    expect(totalGuessesComponent.text()).toBe('Total Guesses: 0');
  });
});

describe('if there are guessed words', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup(defaultProps);
  });

  it('renders without crashing', () => {
    const totalGuessesComponent = findByTestAttr(wrapper, 'component-total-guesses');
    expect(totalGuessesComponent.length).toBe(1);
  });

  it('renders the correct number of guesses', () => {
    const totalGuessesComponent = findByTestAttr(wrapper, 'component-total-guesses');
    expect(totalGuessesComponent.text()).toBe(`Total Guesses: ${defaultProps.guessedWords.length}`);
  });
})
