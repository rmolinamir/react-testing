// Libraries
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

// Dependencies
import { findByTestAttr } from 'test/utils';

// Components
import Congrats from '.';

Enzyme.configure({ adapter: new EnzymeAdapter() });


/**
 * Factory function to create a ShallowWrapper for the Congrats component
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @return {ShallowWrapper}
 */
function setup(props = {}) {
  const wrapper = shallow(<Congrats {...props} />);
}

it('renders without error', () => {

});

it('renders no text when `success` prop is `false`', () => {

});

it('renders non-empty congrats message when `success` prop is `true`', () => {

});
