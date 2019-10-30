// Libraries
import React from 'react';
import { shallow } from 'enzyme';

// Dependencies
import { findByTestAttr, checkPropTypes } from 'test/utils';

// Components
import Input from '.';

const defaultProps = {
  secretWord: 'train',
}

/**
 * Setup function for app components
 * @returns {ShallowWrapper}
 */
function setup(initialProps) {
  return shallow(<Input {...initialProps} />);
}

it('renders without errors', () => {
  const wrapper = setup();
  const inputComponent = findByTestAttr(wrapper, 'component-input');
  expect(inputComponent.length).toBe(1);
});

it('renders with the correct props', () => {
  checkPropTypes(Input, defaultProps);
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
