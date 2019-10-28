// Libraries
import React from 'react';
import { shallow } from 'enzyme';

// Dependencies
import { findByTestAttr, storeFactory } from 'test/utils';

// Components
import GiveUpMessage, { GiveUpMessage as UnconnectedGiveUpMessage } from '.';

const initialState = {
  secretWord: 'train',
  giveUp: false,
};

/**
 * Factory function to create a ShallowWrapper for the GiveUpMessage component
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @return {ShallowWrapper}
 */
function setup(state = {}) {
  const store = storeFactory(state);
  const wrapper = shallow(<GiveUpMessage store={store} />).dive().dive();
  return wrapper;
}

describe('redux props', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup(initialState);
  });

  it('has `giveUp` piece of state as a prop', () => {
    const { giveUp: giveUpProp } = wrapper.instance().props;
    expect(giveUpProp).toBe(initialState.giveUp);
  });

  it('has `secretWord` piece of state as a prop', () => {
    const { secretWord: secretWordProp } = wrapper.instance().props;
    expect(secretWordProp).toBe(initialState.secretWord);
  });

  it('has `getNewWord` action creatore as a prop', () => {
    const { getNewWord } = wrapper.instance().props;
    expect(getNewWord).toBeInstanceOf(Function);
  });
});

describe('when `giveUp` prop is `false`', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup(initialState);
  });

  it('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-give-up-message');
    expect(component.length).toBe(1);
  });

  it('does not renders text', () => {
    const component = findByTestAttr(wrapper, 'component-give-up-message');
    expect(component.text()).toBe('');
  });

  it('does not renders the "new word" button', () => {
    const component = findByTestAttr(wrapper, 'new-word-button');
    expect(component.length).toBe(0);
  });
});

describe('when `giveUp` prop is `true`', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({ giveUp: true });
  });

  it('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-give-up-message');
    expect(component.length).toBe(1);
  });

  it('renders non-empty GiveUpMessage message', () => {
    const message = findByTestAttr(wrapper, 'give-up-message');
    expect(message.text().length).not.toBe(0);
  });

  it('renders the "new word" button', () => {
    const component = findByTestAttr(wrapper, 'new-word-button');
    expect(component.length).toBe(1);
  });
});

describe('when the new word button is pressed', () => {
  let wrapper;
  let getNewWordMock;
  beforeEach(() => {
    // Set up 
    getNewWordMock = jest.fn();
    const props = {
      getNewWord: getNewWordMock,
      giveUp: true,
    };
  
    // Set up unconnected component with getNewWordMock as the getSecretWord prop
    wrapper = shallow(<UnconnectedGiveUpMessage {...props} />);

    // Set a new secret word
    const newWord = findByTestAttr(wrapper, 'new-word-button');
    newWord.simulate('click');
    wrapper.setProps({ ...props, giveUp: false });
  });

  it('calls the `getSecretWord` action creator', () => {
    const getSecretWordCallCount = getNewWordMock.mock.calls.length;
    expect(getSecretWordCallCount).toBe(1);
  });

  it('does not renders text', () => {
    const component = findByTestAttr(wrapper, 'component-give-up-message');
    expect(component.text()).toBe('');
  });

  it('does not renders the "new word" button', () => {
    const component = findByTestAttr(wrapper, 'new-word-button');
    expect(component.length).toBe(0);
  });

  // No need to test if the redux state variables `guessedWords`, `secretWord`, and
  // `giveUp` because these are tested in the integration test inside its actions
  // folder.
});