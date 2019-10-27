// Libraries
import React from 'react';
import { shallow } from 'enzyme';

// Dependencies
import { findByTestAttr, checkPropTypes } from 'test/utils';

// Components
import Congrats from '.';

const defaultProps = { success: false };

/**
 * Factory function to create a ShallowWrapper for the Congrats component
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @return {ShallowWrapper}
 */
function setup(props = {}) {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<Congrats {...setupProps} />);
}

it('renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-congrats');
  expect(component.length).toBe(1);
});

it('renders no text when `success` prop is `false`', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-congrats');
  expect(component.text()).toBe('');
});

it('renders non-empty congrats message when `success` prop is `true`', () => {
  const wrapper = setup({ success: true });
  const message = findByTestAttr(wrapper, 'congrats-message');
  expect(message.text().length).not.toBe(0);
});

it('does not throw warning with expected props', () => {
  checkPropTypes(Congrats.propTypes, defaultProps);
});
