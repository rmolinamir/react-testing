// Libraries
import React from 'react';
import { shallow } from 'enzyme';

// Dependencies
import { storeFactory, findByTestAttr } from 'test/utils';

// Components
import JottoRedux, { JottoRedux as UnconnectedJottoRedux } from './index';

// Initial state for the store factory.
const initialProps = {
  guessedWords: [
    {
      guessedWord: 'train',
      letterMatchCount: 3,
    }
  ],
  secretWord: 'party',
  success: true,
};

const initialState = {
  isSettingUserSecretWord: false,
}

/**
 * Factory function to create a ShallowWrapper for the JottoRedux component
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @param {object} state  - Initial state for setup.
 * @return {ShallowWrapper}
 */
function setup(initialProps = {}, initialState) {
  const store = storeFactory(initialProps);
  const wrapper = shallow(<JottoRedux store={store} />).dive().dive();
  wrapper.setState(initialState);
  return wrapper;
}

describe('render', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup(initialProps, initialState);
  });

  /**
   * You can also use `test`, it's synonimous with `it`.
   */
  it('renders without crashing', () => {
    expect(wrapper.length).toBe(1);
  });

  it('renders user enter secret word button', () => {
    const enterSecretWordButton = findByTestAttr(wrapper, 'enter-secret-word-button');
    expect(enterSecretWordButton.length).toBe(1);
  });
});

describe('redux props', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup(initialProps, initialState);
  });

  it('has `guessedWords` piece of state as a prop', () => {
    const { guessedWords: guessedWordsProp } = wrapper.instance().props;
    expect(guessedWordsProp).toEqual(initialProps.guessedWords);
  });

  it('has `secretWord` piece of state as a prop', () => {
    const { secretWord: secretWordProp } = wrapper.instance().props;
    expect(secretWordProp).toBe(initialProps.secretWord);
  });

  it('has `success` piece of state as a prop', () => {
    const { success: successProp } = wrapper.instance().props;
    expect(successProp).toBe(initialProps.success);
  });

  it('`getSecretWord` action creator is a function prop', () => {
    const { getSecretWord } = wrapper.instance().props;
    expect(getSecretWord).toBeInstanceOf(Function);
  });
});

it(' runs `getSecretWord` on UnconnectedJottoRedux mount', () => {
  const getSecretWordMock = jest.fn();
  const props = {
    ...initialProps,
    getSecretWord: getSecretWordMock,
  };
  // Set up app component with getSecretWordMock as the getSecretWordProp.
  const wrapper = shallow(<UnconnectedJottoRedux {...props} />);
  // Run lifecycle method
  wrapper.instance().componentDidMount();
  // Check if the mock ran
  const getSecretWordCallCount = getSecretWordMock.mock.calls.length;
  expect(getSecretWordCallCount).toBe(1);
});

describe('if user is setting secret word', () => {
  const initialState = {
    isSettingUserSecretWord: true,
    userSecretWord: '',
  };
  let wrapper;
  beforeEach(() => {
    wrapper = setup(initialProps, initialState);
  });

  it('renders user secret word form', () => {
    const secretWordForm = findByTestAttr(wrapper, 'secret-word-form');
    expect(secretWordForm.length).toBe(1);
  });

  it('renders user secret word input box', () => {
    const secretWordInputBox = findByTestAttr(wrapper, 'secret-word-input-box');
    expect(secretWordInputBox.length).toBe(1);
  });

  it('renders user secret word submit button', () => {
    const secretWordSubmitButton = findByTestAttr(wrapper, 'secret-word-submit-button');
    expect(secretWordSubmitButton.length).toBe(1);
  });

  it('does not executes `handlerUserWordSubmit` if `userSecretWord` is empty', () => {
    // Setting the `handlerUserWordSubmit` mock function and refreshing the wrapper.
    const handlerUserWordSubmitMock = jest.fn();
    wrapper.instance().handlerUserWordSubmit = handlerUserWordSubmitMock;
    wrapper.update();
    // Finding the user secret word submit button.
    const secretWordSubmitButton = findByTestAttr(wrapper, 'secret-word-submit-button');
    secretWordSubmitButton.simulate('click', { preventDefault() {} });
    // Assertion
    expect(handlerUserWordSubmitMock.mock.calls.length).toBe(0);
  });
});

describe('if user changes the value of the input', () => {
  const initialState = {
    isSettingUserSecretWord: true,
    userSecretWord: 'train',
  };
  let wrapper;
  let handleOnChangeMock;
  beforeEach(() => {
    handleOnChangeMock = jest.fn();
    wrapper = setup(initialProps, initialState);
    // Setting the `handlerUserWordSubmit` mock function and refreshing the wrapper.
    wrapper.instance().handleOnChange = handleOnChangeMock;
    wrapper.update();
    // Finding the user secret word submit button.
    const secretWordInput = findByTestAttr(wrapper, 'secret-word-input-box');
    secretWordInput.simulate('change', { preventDefault() {}, target: { value: 'party' } })
  });

  it('correctly sets the `userSecretWord` state', () => {
    expect(wrapper.instance().state.userSecretWord).toBe('party');
  });
});

describe('if user submits secret word', () => {
  const initialState = {
    isSettingUserSecretWord: true,
    userSecretWord: 'train',
  };
  let wrapper;
  let handlerUserWordSubmitMock;
  beforeEach(() => {
    handlerUserWordSubmitMock = jest.fn();
    wrapper = setup(initialProps, initialState);
    // Setting the `handlerUserWordSubmit` mock function and refreshing the wrapper.
    wrapper.instance().handlerUserWordSubmit = handlerUserWordSubmitMock;
    wrapper.update();
    // Finding the user secret word submit button.
    const secretWordSubmitButton = findByTestAttr(wrapper, 'secret-word-submit-button');
    secretWordSubmitButton.simulate('click',  { preventDefault() {} });
  });

  it('executes `handlerUserWordSubmit` if `userSecretWord` is not empty', () => {
    expect(handlerUserWordSubmitMock.mock.calls.length).toBe(1);
  });

  it('`handlerUserWordSubmit` arguments match the `userSecretWord`', () => {
    expect(handlerUserWordSubmitMock.mock.calls[0][0]).toBe(initialState.userSecretWord);
  });
});

describe('after user submits secret word', () => {
  const initialState = {
    isSettingUserSecretWord: true,
    userSecretWord: 'train',
  };
  let wrapper;
  let store;
  beforeEach(() => {
    store = storeFactory(initialProps);
    wrapper = shallow(<JottoRedux store={store} />).dive().dive();
    wrapper.setState(initialState);
    // Finding the user secret word submit button.
    const secretWordSubmitButton = findByTestAttr(wrapper, 'secret-word-submit-button');
    secretWordSubmitButton.simulate('click',  { preventDefault() {} });
  });

  it('unmounts secret word form ', () => {
    const secretWordForm = findByTestAttr(wrapper, 'secret-word-form');
    expect(secretWordForm.length).toBe(0);
  });

  it('unmounts secret word form ', () => {
    const secretWordForm = findByTestAttr(wrapper, 'secret-word-form');
    expect(secretWordForm.length).toBe(0);
  });

  it('redux prop `secretWord` is equal to the `userSecretWord`', () => {
    const { secretWord: secretWordProp } = store.getState();
    expect(secretWordProp).toBe(initialState.userSecretWord);
  });
});
