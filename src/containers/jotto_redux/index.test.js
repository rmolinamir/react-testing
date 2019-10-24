import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Jotto from './index';

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShallowWrapper for the Jotto component
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @param {object} state  - Initial state for setup.
 * @return {ShallowWrapper}
 */
function setup(props = {}, state = null) {
  const wrapper = shallow(<Jotto {...props} />);
  if (state) wrapper.setState(state)
  return wrapper
}

/**
 * Return ShallowWrapper containing node(s) with the given data-test value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within
 * @param {string} val - Value of data-test attribute for search.
 * @return {ShallowWrapper}
 */
function findByTestAttr(wrapper, val) {
  return wrapper.find(`[data-test="${val}"]`)
}

/**
 * You can also use `test`, it's synonimous with `it`.
 */
it('renders without crashing', () => {
  const wrapper = setup();
  expect(wrapper.length).toBe(1);
});