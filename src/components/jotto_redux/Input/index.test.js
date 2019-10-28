// Libraries
import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, storeFactory } from 'test/utils';
import Input, { Input as UnconnectedInput } from '.';

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
    let wrapper;
    beforeEach(() => {
      const initialState = { success: false };
      wrapper = setup(initialState);
    });

    it('renders the component without errors', () => {
      const component = findByTestAttr(wrapper, 'component-input');
      expect(component.length).toBe(1);
    });

    it('renders input box', () => {
      const inputBox = findByTestAttr(wrapper, 'input-box');
      expect(inputBox.length).toBe(1);
    });

    it('renders submit button', () => {
      const submitButton = findByTestAttr(wrapper, 'submit-button');
      expect(submitButton.length).toBe(1);
    });

    it('renders give up button', () => {
      const giveUpButton = findByTestAttr(wrapper, 'give-up-button');
      expect(giveUpButton.length).toBe(1);
    });
  });

  describe('word has been guessed', () => {
    let wrapper;
    beforeEach(() => {
      const initialState = { success: true };
      wrapper = setup(initialState);
    })
    it('renders the component without errors', () => {
      const component = findByTestAttr(wrapper, 'component-input');
      expect(component.length).toBe(1);

    });

    it('does not renders input box', () => {
      const inputBox = findByTestAttr(wrapper, 'input-box');
      expect(inputBox.length).toBe(0);
    });

    it('does not renders submit button', () => {
      const submitButton = findByTestAttr(wrapper, 'submit-button');
      expect(submitButton.length).toBe(0);
    });

    it('does not renders give up button', () => {
      const giveUpButton = findByTestAttr(wrapper, 'give-up-button');
      expect(giveUpButton.length).toBe(0);
    });
  });
});

describe('redux props', () => {
  it('has success piece of state as prop', () => {
    const success = true;
    const wrapper = setup({ success });
    const { success: successProp } = wrapper.instance().props;
    expect(successProp).toBe(success);  
  });

  it('`guessWord` action creator is a function prop', () => {
    const wrapper = setup();
    const { guessWord: guessWordProp } = wrapper.instance().props;
    expect(guessWordProp).toBeInstanceOf(Function);
  });
});

describe('if currentGuess is an empty string', () => {
  let guessWordMock;
  let wrapper;
  beforeEach(() => {
    // Setting up mock & props for `guessWord`
    guessWordMock = jest.fn();
    const props = {
      guessWord: guessWordMock,
      success: false,
    }
    wrapper = shallow(<UnconnectedInput {...props} />);

    // Add state value to input box
    wrapper.setState({ currentGuess: '' });

    // Find button and simulate click
    const submitButton = findByTestAttr(wrapper, 'submit-button');

    // Simulate the event
    submitButton.simulate('click', { preventDefault() {} });
  });

  it('does not calls `guessWord` action creator', () => {
    // Check if the mock did not run
    const getSecretWordCallCount = guessWordMock.mock.calls.length;
    expect(getSecretWordCallCount).toBe(0);
  });
});

describe('`guessWord` action creator call', () => {
  let guessWordMock;
  let wrapper;
  const guessedWord = "train";
  beforeEach(() => {
    // Setting up mock & props for `guessWord`
    guessWordMock = jest.fn();
    const props = {
      guessWord: guessWordMock,
      success: false,
    }
    wrapper = shallow(<UnconnectedInput {...props} />);

    // Add state value to input box
    wrapper.setState({ currentGuess: guessedWord });

    // Find button and simulate click
    const submitButton = findByTestAttr(wrapper, 'submit-button');

    // Simulate the event
    submitButton.simulate('click', { preventDefault() {} });
  });

  it('calls `guessWord` when the submit button is pressed', () => {
    // Check if the mock ran
    const getSecretWordCallCount = guessWordMock.mock.calls.length;
    expect(getSecretWordCallCount).toBe(1);
  });

  it('calls `guessWord` with input value as argument', () => {
    console.log('guessWordMock.mock.calls', guessWordMock.mock.calls)
    // guessWordMock.mock.calls returns [[any]] - [['']]
    const guessWordArg = guessWordMock.mock.calls[0][0];
    expect(guessWordArg).toBe(guessedWord);
  });

  it('input box state clears on submit', () => {
    expect(wrapper.state('currentGuess')).toBe('');
  });
});

describe('`giveUp` action creator call', () => {
  let giveUpGameMock;
  let wrapper;
  const guessedWord = "train";
  beforeEach(() => {
    // Setting up mock & props for `guessWord`
    giveUpGameMock = jest.fn();
    const props = {
      giveUpGame: giveUpGameMock,
      giveUp: false,
    }
    wrapper = shallow(<UnconnectedInput {...props} />);

    // Add state value to input box
    wrapper.setState({ currentGuess: guessedWord });

    // Find button and simulate click
    const giveUpButton = findByTestAttr(wrapper, 'give-up-button');

    // Simulate the event
    giveUpButton.simulate('click', { preventDefault() {} });

    wrapper.setProps({ giveUp: true });
  });

  it('calls `giveUp` when the give up button is pressed', () => {
    expect(giveUpGameMock.mock.calls.length).toBe(1);
  });

  it('form box unmounts', () => {
    const form = findByTestAttr(wrapper, 'form-box');
    expect(form.length).toBe(0);
  });
});
