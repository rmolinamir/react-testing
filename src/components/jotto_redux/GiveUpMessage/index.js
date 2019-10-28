// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Actions
import { getNewWord } from 'actions';

/**
 * Functional react component for congrutulatory message.
 * @function
 * @param {object} - React.props
 * @returns {JSX.Element} - Rendered component (or null if `giveUp` prop is `true`)
 */
export class GiveUpMessage extends Component {
  render() {
    const { giveUp, secretWord, getNewWord } = this.props;
    if (giveUp) {
      return (
        <div data-test="component-give-up-message">
          <h2
            data-test="give-up-message"
            className="alert alert-danger"
          >
            The secret word was "{secretWord}"
            Better luck next time!
          </h2>
          <button
            data-test="new-word-button"
            className="btn btn-primary btn-filled"
            onClick={getNewWord}
          >
            New Word
          </button>
        </div>
      )
    }
    return (
      <div data-test="component-give-up-message" />
    );
  }
}

const mapStateToProps = state => ({
  giveUp: state.giveUp,
  secretWord: state.secretWord,
});

const mapDispatchToProps = {
  getNewWord,
};

export default connect(mapStateToProps, mapDispatchToProps)(GiveUpMessage);
