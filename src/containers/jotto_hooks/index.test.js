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
function setup() {
  // Important to clear mock calls before running further tests
  mockGetSecretWord.mockClear();
  // Use mount, because useEffect is not called on `shallow`
  // https://github.com/airbnb/enzyme/issues/2086
  hookActions.getSecretWord = mockGetSecretWord;
  return mount(<JottoHooks />);
}

it('renders JottoHooks without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-jotto-hooks');
  expect(component.length).toBe(1);
});

describe('renders', () => {
  it('`getSecretWord` gets called on JottoHooks render', () => {
    setup();
    expect(mockGetSecretWord).toHaveBeenCalled();
  });
})
