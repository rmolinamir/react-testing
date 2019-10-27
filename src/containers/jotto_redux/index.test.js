// Libraries
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

// Dependencies
import { storeFactory } from 'test/utils';

// Components
import Jotto from './index';

Enzyme.configure({ adapter: new EnzymeAdapter() });

// Initial state for the store factory.
const initialState = {
  guessedWords: [
    {
      guessedWord: 'train',
      letterMatchCount: 3,
    }
  ],
  secretWord: 'party',
  success: true,
};

/**
 * Factory function to create a ShallowWrapper for the Jotto component
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @param {object} state  - Initial state for setup.
 * @return {ShallowWrapper}
 */
function setup(initialState = {}) {
  const store = storeFactory(initialState);
  const wrapper = shallow(<Jotto store={store} />).dive().dive();
  return wrapper;
}

describe('render', () => {
  /**
   * You can also use `test`, it's synonimous with `it`.
   */
  it('renders without crashing', () => {
    const wrapper = setup();
    expect(wrapper.length).toBe(1);
  });
});

describe('redux props', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup(initialState);
  });

  it('has `guessedWords` piece of state as a prop', () => {
    const { guessedWords: guessedWordsProp } = wrapper.instance().props;
    expect(guessedWordsProp).toEqual(initialState.guessedWords);
  });

  it('has `secretWord` piece of state as a prop', () => {
    const { secretWord: secretWordProp } = wrapper.instance().props;
    expect(secretWordProp).toBe(initialState.secretWord);
  });

  it('has `success` piece of state as a prop', () => {
    const { success: successProp } = wrapper.instance().props;
    expect(successProp).toBe(initialState.success);
  });

  it('`getSecretWord` action creator is a function prop', () => {
    const { getSecretWord } = wrapper.instance().props;
    expect(getSecretWord).toBeInstanceOf(Function);
  });
});