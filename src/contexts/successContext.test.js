// Libraries
import React from 'react';
import { shallow, mount } from 'enzyme';

// Dependencies
import successContext from './successContext';

// Functional component that calls useSuccess for our tests
function FunctionalComponent() {
  successContext.useSuccess();
  return <div />
}

it('useSuccess throws error whhen not wrapper in SuccessProvider', () => {
  expect(() => {
    shallow(<FunctionalComponent />);
  }).toThrow('useSuccess must be used within a SuccessProvider');
});

it('useSuccess does not throw error when wrapped in SuccessProvider', () => {
  expect(() => {
    mount(
      <successContext.SuccessProvider>
        <FunctionalComponent />
      </successContext.SuccessProvider>
    );
  }).not.toThrow('useSuccess must be used within a SuccessProvider');
});
