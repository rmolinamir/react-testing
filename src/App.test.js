import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * You can also use `test`, it's synonimous with `it`.
 */
it('renders without crashing', () => {
  const wrapper = shallow(<App />);
  console.log('DOM string serialized', `\n${wrapper.debug()}`);
  expect(wrapper).toBeTruthy();
});
