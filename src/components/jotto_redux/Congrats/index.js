// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Actions
import { getNewWord } from 'actions';

/**
 * Functional react component for congrutulatory message.
 * @function
 * @param {object} - React.props
 * @returns {JSX.Element} - Rendered component (or null if `success` prop is `true`)
 */
export class Congrats extends Component {
  render() {
    const { success, getNewWord } = this.props;
    if (success) {
      return (
        <div data-test="component-congrats" className="alert alert-success">
          <h2 data-test="congrats-message">
            Congratulations! You guessed the word!
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
      <div data-test="component-congrats" />
    );
  }
}

const mapStateToProps = state => ({
  secretWord: state.secretWord,
  success: state.success,
});

const mapDispatchToProps = {
  getNewWord,
};

export default connect(mapStateToProps, mapDispatchToProps)(Congrats);
