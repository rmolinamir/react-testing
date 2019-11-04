// Libraries
import checkProps from 'check-prop-types';
import { createStore, applyMiddleware } from 'redux';

// Dependencies
import rootReducer from 'reducers';
import { middlewares } from 'configureStore';

/**
 * Return ShallowWrapper containing node(s) with the given data-test value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within
 * @param {string} val - Value of data-test attribute for search.
 * @returns {ShallowWrapper}
 */
export function findByTestAttr(wrapper, val) {
  return wrapper.find(`[data-test="${val}"]`);
}

/**
 * Takes some expected props and see wether or not they would throw a warning.
 * The general idea is to give expected props to be good, and make sure they
 * do not throw a warning.
 * @param {React.Component} component - React component with propTypes property.
 * @param {object} conformingProps - Expected props object.
 * @returns {void}
 */
export function checkPropTypes(component, conformingProps) {
  const propError = checkProps(
    component.propTypes,
    conformingProps,
    'prop',
    component.name,
  );
  expect(propError).toBeUndefined();
}

/**
 * Create a testing store with imported reducers, middleware, and initial state.
 *  globals: rootReducer, middllewares
 * @param {object} initialState - Initial state for the store.
 * @function storeFactory
 * @returns {Store} - Redux Store
 */
export function storeFactory(initialState) {
  const createStoreWithMiddleware = applyMiddleware(...middlewares);
  return createStore(rootReducer, initialState, createStoreWithMiddleware);
}