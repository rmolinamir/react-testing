// Libraries
import React from 'react';
import { mount } from 'enzyme';

// Dependencies
import { findByTestAttr } from 'test/utils';
import hookActions from 'actions/hookActions';

// Components
import JottoHooks from '.';

const mockGetSecretWord = jest.fn();

/**
 * Setup function for app components
 * @returns {ReactWrapper}
 */
function setup(secretWord = "party") {
  // Important to clear mock calls before running further tests
  mockGetSecretWord.mockClear();
  const useReducerMock = jest.fn().mockReturnValue([
    { secretWord }, // State value
    jest.fn(), // Dispatch function
  ]);
  React.useReducer = useReducerMock;
  // Use mount, because useEffect is not called on `shallow`
  // https://github.com/airbnb/enzyme/issues/2086
  hookActions.getSecretWord = mockGetSecretWord;
  return mount(<JottoHooks />);
}

it('renders JottoHooks without error', () => {
  const wrapper = setup();
  const componentJottoHooks = findByTestAttr(wrapper, 'component-jotto-hooks');
  expect(componentJottoHooks.length).toBe(1);
});

describe('`getSecretWord` calls`', () => {
  it('calls `getSecretWord` on JottoHooks render', () => {
    setup();
    expect(mockGetSecretWord).toHaveBeenCalled();
  });

  it('does not update `secretWord` on JottoHooks update', () => {
    const wrapper = setup();
    mockGetSecretWord.mockClear();
    // wrapper.update() doesn't trigger update
    // https://github.com/airbnb/enzyme/issues/2254
    wrapper.setProps();
    expect(mockGetSecretWord).not.toHaveBeenCalled();
  });
});

describe('when `secretWord` is not `null`', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup('party');
  });

  it('renders app', () => {
    const componentJottoHooks = findByTestAttr(wrapper, 'component-jotto-hooks');
    expect(componentJottoHooks.exists()).toBe(true);
  });

  it('does not renders spinner', () => {
    const spinnerComponent = findByTestAttr(wrapper, 'spinner');
    expect(spinnerComponent.exists()).toBe(false);
  });
});

describe('when `secretWord` is `null`', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup(null);
  });

  it('does not renders app', () => {
    const componentJottoHooks = findByTestAttr(wrapper, 'component-jotto-hooks');
    expect(componentJottoHooks.exists()).toBe(false);
  });

  it('renders spinner', () => {
    const spinnerComponent = findByTestAttr(wrapper, 'spinner');
    expect(spinnerComponent.exists()).toBe(true);
  });
});
