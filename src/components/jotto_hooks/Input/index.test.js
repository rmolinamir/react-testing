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
function setup() {
  return shallow(<Input />);
}

it('renders without errors', () => {
  const wrapper = setup();
  const inputComponent = findByTestAttr(wrapper, 'component-input');
  expect(inputComponent.length).toBe(1);
});

it('renders with the correct props', () => {
  checkPropTypes(Input, defaultProps);
});
