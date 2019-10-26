// Libraries
import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, storeFactory } from 'test/utils';
import Input from '.';

/**
 * Factory function to create ShallowWrapper for the Input component.
 * @param {*} initialState - Initial state for this setup.
 * @return {ShallowWrapper}
 */
function setup(initialState = {}) {
  const store = storeFactory(initialState);
  const wrapper = shallow(<Input store={store} />).dive().dive();
  return wrapper;
}

describe('render', () => {
  describe('word has not been guessed', () => {
    it('renders the component without errors', () => {

    });

    it('renders input box', () => {
      
    });

    it('renders submit button', () => {
      
    });
  });

  describe('word has been guessed', () => {
    it('renders the component without errors', () => {

    });

    it('does renders input box', () => {
      
    });

    it('does renders submit button', () => {
      
    });
  })
});

describe('update state', () => {

});

