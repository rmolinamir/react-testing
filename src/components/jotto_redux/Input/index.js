// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Actions
import { guessWord } from 'actions';

const INPUT_NAME = 'guess-word-input';

export class Input extends Component {
  constructor(props) {
    super(props);

    // Initiaize state
    this.state = {
      currentGuess: null,
    };

    // Binding this for class methods
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnChange(event) {
    event.preventDefault();
    this.setState({
      currentGuess: event.target.value,
    })
  }

  handleOnSubmit(event) {
    event.preventDefault();
    const { currentGuess } = this.state;
    const { guessWord } = this.props;
    if (currentGuess && currentGuess.length) {
      guessWord(currentGuess);
    }
  }

  render() {
    const { currentGuess } = this.state;
    const { success } = this.props;
    const contents = !success && (
      <form className="form-inline">
        <input
          data-test="input-box"
          className="mb-2 mx-sm-3"
          type="text"
          placeholder="enter guess"
          name={INPUT_NAME}
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
});

const mapDispatchToProps = {
  guessWord,
}

export default connect(mapStateToProps, mapDispatchToProps)(Input);
