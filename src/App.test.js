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
  const appComponent = wrapper.find("[data-test='component-app']")
  console.log('DOM string serialized', `\n${appComponent.debug()}`);
  expect(appComponent.length).toBe(1);
});

it('renders increment button', () => {
  const wrapper = shallow(<App />);
  const appComponent = wrapper.find("[data-test='increment-button']")
  expect(appComponent.length).toBe(1);
})

it('renders counter display', () => {
  const wrapper = shallow(<App />);
  const appComponent = wrapper.find("[data-test='counter-display']")
  expect(appComponent.length).toBe(1);
})

it('counter starts at 0', () => {
})

it('clicking button increments counter display', () => {
  
})
