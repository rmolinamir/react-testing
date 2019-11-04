// Libraries
import React from 'react';
import { mount } from 'enzyme';

// Dependencies
import { findByTestAttr, checkPropTypes } from 'test/utils';
import { languageStrings } from 'helpers/strings/index';

// Contexts
import languageContext from 'contexts/languageContext';
import successContext from 'contexts/successContext';
import guessedWordsContext from 'contexts/guessedWordsContext';

// Components
import Input from '.';

/**
 * Setup function for app components
 * @returns {mountWrapper}
 */
function setup({ secretWord = 'train', language = 'en', success = false, } = {}) {
  return mount(
    <guessedWordsContext.GuessedWordsProvider>
      <languageContext.Provider value={language}>
        <successContext.SuccessProvider value={[success, jest.fn()]}>
          <Input secretWord={secretWord} />
        </successContext.SuccessProvider>
      </languageContext.Provider>
    </guessedWordsContext.GuessedWordsProvider>
  );
}

it('renders without errors', () => {
  const wrapper = setup();
  const inputComponent = findByTestAttr(wrapper, 'component-input');
  expect(inputComponent.length).toBe(1);
});

it('renders with the correct props', () => {
  checkPropTypes(Input, { secretWord: 'train' });
});

describe('renders', () => {
  let wrapper;
  beforeEach(() => {
    // Setting 
    wrapper = setup();
  });

  it('renders without errors', () => {
    const inputComponent = findByTestAttr(wrapper, 'component-input');
    expect(inputComponent.exists()).toBe(true);
  });

  it('renders submit-button', () => {
    const submitButton = findByTestAttr(wrapper, 'submit-button');
    expect(submitButton.exists()).toBe(true);
  });
});

describe('languagePicker', () => {
  test('correctly renders submit string in english', () => {
    const wrapper = setup();
    const submitButton = findByTestAttr(wrapper, 'submit-button');
    expect(submitButton.text()).toBe(languageStrings.en.submit);
  });

  test('correctly renders submit string in emoji', () => {
    const wrapper = setup({ language: 'emoji' });
    const submitButton = findByTestAttr(wrapper, 'submit-button');
    expect(submitButton.text()).toBe(languageStrings.emoji.submit);
  });
});

describe('state controlled input field', () => {
  let wrapper;
  let setCurrentGuessMock;
  beforeEach(() => {
    // Setting up mock functions
    setCurrentGuessMock = jest.fn();
    React.useState = jest.fn(() => ['', setCurrentGuessMock]);
    // Setting 
    wrapper = setup();
  });

  afterEach(() => {
    setCurrentGuessMock.mockClear();
  });

  it('state updates with value of input box upon change', () => {
    const inputBox = findByTestAttr(wrapper, 'input-box');
    // Simulating onChange event
    const mockEvent = { target: { value: 'train' }, preventDefault() {} };
    inputBox.simulate('change', mockEvent);
    // Assertion
    expect(setCurrentGuessMock).toHaveBeenCalledWith('train');
  });

  it('state updates with value of input box upon change', () => {
    const submitButton = findByTestAttr(wrapper, 'submit-button');
    // Simulating onClick event
    const mockEvent = { preventDefault() {} };
    submitButton.simulate('click', mockEvent);
    // Assertion
    expect(setCurrentGuessMock).toHaveBeenCalledWith('');
  });
});

it('input component does not show when success is true', () => {
  const wrapper = setup({ success: true });
  expect(wrapper.isEmptyRender()).toBe(true);
});
