// Libraries
import React from 'react';
import { shallow } from 'enzyme';

// Dependencies
import { findByTestAttr } from 'test/utils';

// Components
import JottoHooks from '.';

/**
 * Setup function for app components
 * @returns {ShallowWrapper}
 */
function setup() {
  return shallow(<JottoHooks />);
}

it('renders JottoHooks without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-jotto-hooks');
  expect(component.length).toBe(1);
});
