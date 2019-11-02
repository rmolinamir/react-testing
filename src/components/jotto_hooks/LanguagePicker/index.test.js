// Libraries
import React from 'react';
import { shallow } from 'enzyme';

// Dependencies
import { findByTestAttr, checkPropTypes } from 'test/utils';

// Components
import LanguagePicker from '.';

const setLanguageMock = jest.fn();

const expectedProps = {
  setLanguage: setLanguageMock,
};

function setup(props = expectedProps) {
  return shallow(<LanguagePicker {...props} />);
}

test('renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-language-picker');
  expect(component.exists()).toBe(true);
});

test('does not throw warning with expected props', () => {
  checkPropTypes(LanguagePicker, expectedProps);
});

test('renders non-zero language icons', () => {
  const wrapper = setup();
  const languageIcons = findByTestAttr(wrapper, 'language-icon');
  expect(languageIcons.length).toBeGreaterThan(0);
});

test('calls `setLanguage` prop upon click', () => {
  const wrapper = setup();
  const languageIcons = findByTestAttr(wrapper, 'language-icon');

  const firstIcon = languageIcons.first();
  firstIcon.simulate('click');

  expect(setLanguageMock).toHaveBeenCalled(); 
});
