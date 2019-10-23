import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShallowWrapper for the App component
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @param {object} state  - Initial state for setup.
 * @return {ShallowWrapper}
 */
function setup(props = {}, state = null) {
  const wrapper = shallow(<App {...props} />);
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
  const appComponent = findByTestAttr(wrapper, 'component-app')
  console.log('DOM string serialized', `\n${appComponent.debug()}`);
  expect(appComponent.length).toBe(1);
});

it('renders increment button', () => {
  const wrapper = setup();
  const incrementButton = findByTestAttr(wrapper, 'increment-button')
  expect(incrementButton.length).toBe(1);
})

it('renders decrement button', () => {
  const wrapper = setup();
  const decrementButton = findByTestAttr(wrapper, 'decrement-button');
  expect(decrementButton.length).toBe(1);
})

it('renders counter display', () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, 'counter-display')
  expect(counterDisplay.length).toBe(1);
})

it('counter starts at 0', () => {
  const wrapper = setup();
  const initialCounterState = wrapper.state('counter');
  expect(initialCounterState).toBe(0);
})

it('clicking increment button increments counter display', () => {
  const counter = 7;
  const wrapper = setup(null, { counter });

  // Find button and click
  const incrementButton = findByTestAttr(wrapper, 'increment-button');
  incrementButton.simulate('click');

  // Find display and test value
  const counterDisplay = findByTestAttr(wrapper, 'counter-display')
  expect(counterDisplay.text()).toContain(`The count is: ${counter + 1}`);
})

it('clicking decrement button decreases counter display', () => {
  const counter = 5;
  const wrapper = setup(null, { counter });

  // Finding decrement button and clicking it
  const decrementButton = findByTestAttr(wrapper, 'decrement-button');
  decrementButton.simulate('click');

  // Finding counter display and evaluate counter
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(`The count is: ${counter - 1}`);
})

it('counter is never less than zero when decrement button is clicked', () => {
  const counter = 0;
  const wrapper = setup(null, { counter });

  // Finding decrement button and clicking it
  const decrementButton = findByTestAttr(wrapper, 'decrement-button');
  decrementButton.simulate('click');

  // Finding counter display and evaluate counter
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toBe('The count is: 0'); // brittle
})

it('error message displays when counter is less than zero', () => {
  const isError = true;
  const wrapper = setup(null, { isError });

  // Finding counter display and evaluate counter
  const errorDisplay = findByTestAttr(wrapper, 'error-display');
  expect(errorDisplay.length).toBe(1);
})

it('error message clears when increment counter is clicked', () => {
  const counter = 0;
  const isError = true;
  const wrapper = setup(null, { counter, isError });

  // Finding error display and evaluate if it exists before clicking increment
  let errorDisplay = findByTestAttr(wrapper, 'error-display');
  expect(errorDisplay.length).toBe(1);

  // Finding and clicking the increment button to unmount the error display
  const incrementButton = findByTestAttr(wrapper, 'increment-button');
  incrementButton.simulate('click');

  // Finding error display and evaluate if it exists after clicking increment
  errorDisplay = findByTestAttr(wrapper, 'error-display');
  expect(errorDisplay.length).toBe(0);
})
