// Libraries
import React from 'react';
import { mount } from 'enzyme';

// Dependencies
import { findByTestAttr } from 'test/utils';
import { languageStrings } from 'helpers/strings/index';

// Contexts
import languageContext from 'contexts/languageContext';
import successContext from 'contexts/successContext';

// Components
import Congrats from '.';

/**
 * Factory function to create a mountWrapper for the Congrats component
 * @function setup
 * @param {object} testValues - Context values specific to this setup.
 * @return {mountWrapper}
 */
function setup({ success = true, language = 'en' } = {}) {
  const wrapper = mount(
    <languageContext.Provider value={language}>
      <successContext.SuccessProvider value={[success, jest.fn()]}>
        <Congrats />
      </successContext.SuccessProvider>
    </languageContext.Provider>
  );
  return wrapper;
}

describe('when `success` prop is `false`', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({ success: false });
  });

  it('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-congrats');
    expect(component.length).toBe(1);
  });

  it('does not renders text', () => {
    const component = findByTestAttr(wrapper, 'component-congrats');
    expect(component.text()).toBe('');
  });

  it('does not renders the "new word" button', () => {
    const component = findByTestAttr(wrapper, 'new-word-button');
    expect(component.length).toBe(0);
  });
});

describe('when `success` prop is `true`', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({ success: true });
  });

  it('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-congrats');
    expect(component.length).toBe(1);
  });

  it('renders non-empty congrats message', () => {
    const message = findByTestAttr(wrapper, 'congrats-message');
    expect(message.text().length).not.toBe(0);
  });
});

describe('languagePicker', () => {
  test('correctly renders congrats string in english', () => {
    const wrapper = setup();
    expect(wrapper.text()).toBe(languageStrings.en.congrats);
  });

  test('correctly renders congrats string in emoji', () => {
    const wrapper = setup({ language: 'emoji' });
    expect(wrapper.text()).toBe(languageStrings.emoji.congrats);
  });
});