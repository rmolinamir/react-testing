// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Actions
import { guessWord, giveUpGame } from 'actions';

export class Input extends Component {
  constructor(props) {
    super(props);

    // Initiaize state
    this.state = {
      currentGuess: '',
    };

    // Binding this for class methods
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleOnGiveUp = this.handleOnGiveUp.bind(this);
  }

  handleOnChange(event) {
    event.preventDefault();
    this.setState({
      currentGuess: event.target.value,
    });
  }

  handleOnSubmit(event) {
    event.preventDefault();
    const { currentGuess } = this.state;
    const { guessWord } = this.props;
    if (currentGuess && currentGuess.length) {
      this.setState({ currentGuess: '' }, () => {
        guessWord(currentGuess);
      });
    }
  }

  handleOnGiveUp(event) {
    event.preventDefault();
    const { giveUpGame } = this.props;
    giveUpGame();
  }

  /**
   * Render method. Conditionally renders `content` if `giveUp` or `success` is `true`.
   */
  render() {
    const { currentGuess } = this.state;
    const { success, giveUp } = this.props;
    const contents = (success || giveUp) ? null : (
      <form
        data-test="form-box"
        className="form-inline"
      >
        <input
          data-test="input-box"
          className="mb-2 mx-sm-3"
          type="text"
          placeholder="enter guess"
          value={currentGuess}
          onChange={this.handleOnChange}
        />
        <button
          data-test="submit-button"
          type="submit"
          className="btn btn-primary mb-2"
          onClick={this.handleOnSubmit}
        >
          Submit
        </button>
        <button
          data-test="give-up-button"
          type="submit"
          className="btn btn-danger ml-2 mb-2"
          onClick={this.handleOnGiveUp}
        >
          Give Up
        </button>
      </form>
    );
    return (
      <div data-test="component-input">
        {contents}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  success: state.success,
  giveUp: state.giveUp,
});

const mapDispatchToProps = {
  guessWord,
  giveUpGame,
}

export default connect(mapStateToProps, mapDispatchToProps)(Input);
