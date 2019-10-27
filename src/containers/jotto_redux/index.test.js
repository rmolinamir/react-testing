// Libraries
import React from 'react';
import { shallow } from 'enzyme';

// Dependencies
import { storeFactory } from 'test/utils';

// Components
import JottoRedux, { JottoRedux as UnconnectedJottoRedux } from './index';

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
 * Factory function to create a ShallowWrapper for the JottoRedux component
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @param {object} state  - Initial state for setup.
 * @return {ShallowWrapper}
 */
function setup(initialState = {}) {
  const store = storeFactory(initialState);
  const wrapper = shallow(<JottoRedux store={store} />).dive().dive();
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

it(' runs `getSecretWord` on UnconnectedJottoRedux mount', () => {
  const getSecretWordMock = jest.fn();
  const props = {
    ...initialState,
    getSecretWord: getSecretWordMock,
  };
  // Set up app component with getSecretWordMock as the getSecretWordProp.
  const wrapper = shallow(<UnconnectedJottoRedux {...props} />);
  // Run lifecycle method
  wrapper.instance().componentDidMount();
  // Check if the mock ran
  const getSecretWordCallCount = getSecretWordMock.mock.calls.length;
  expect(getSecretWordCallCount).toBe(1);
})