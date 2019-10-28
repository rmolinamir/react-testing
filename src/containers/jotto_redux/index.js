// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Actions
import { getSecretWord, setUserSecretWord } from 'actions';

// Components
import Congrats from 'components/jotto_redux/Congrats';
import GiveUpMessage from 'components/jotto_redux/GiveUpMessage';
import Input from 'components/jotto_redux/Input';
import GuessedWords from 'components/jotto_redux/GuessedWords';
import TotalGuesses from 'components/jotto_redux/TotalGuesses';

export class JottoRedux extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSettingUserSecretWord: false,
      userSecretWord: '',
    }

    this.handleEnterIsUserWordOnClick = this.handleEnterIsUserWordOnClick.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handlerUserWordOnSubmitClick = this.handlerUserWordOnSubmitClick.bind(this);
    this.handlerUserWordSubmit = this.handlerUserWordSubmit.bind(this);
  }

  componentDidMount() {
    const { getSecretWord } = this.props;
    getSecretWord();
  }

  handleEnterIsUserWordOnClick() {
    this.setState(({ isSettingUserSecretWord }) => ({
      isSettingUserSecretWord: !isSettingUserSecretWord,
    }));
  }

  handleOnChange(event) {
    event.preventDefault();
    this.setState({
      userSecretWord: event.target.value,
    });
  }

  handlerUserWordOnSubmitClick(event) {
    event.preventDefault();
    const { userSecretWord } = this.state;
    if (userSecretWord) this.handlerUserWordSubmit(userSecretWord);
  }

  handlerUserWordSubmit() {
    const { userSecretWord } = this.state;
    const { setUserSecretWord } = this.props;
    this.setState(
      { isSettingUserSecretWord: false },
      () => {
        setUserSecretWord(userSecretWord);
      }
    )
  }

  render() {
    const { guessedWords, secretWord } = this.props;
    const { isSettingUserSecretWord, userSecretWord } = this.state;
    
    if (isSettingUserSecretWord) {
      return (
        <div className="App" data-test="component-app">
          <h1>Jotto</h1>
          <div>Enter a secret word for someone else to guess:</div>
          <form
            data-test="secret-word-form"
            className="form-inline"
          >
            <input
              data-test="secret-word-input-box"
              className="mb-2 mx-sm-3"
              type="text"
              value={userSecretWord}
              onChange={this.handleOnChange}
            />
            <button
              data-test="secret-word-submit-button"
              type="submit"
              className="btn btn-primary mb-2"
              onClick={this.handlerUserWordOnSubmitClick}
            >
              Submit
            </button>
          </form>
        </div>
      );
    }

    return (
      <div data-test="component-app">
        <h1>Jotto</h1>
        <div>The secret word is: {secretWord}</div>
        <Congrats />
        <GiveUpMessage />
        <Input />
        <TotalGuesses guessedWords={guessedWords} />
        <GuessedWords guessedWords={guessedWords} />
        <button
          data-test="enter-secret-word-button"
          type="submit"
          className="btn btn-primary fixed-bottom container"
          onClick={this.handleEnterIsUserWordOnClick}
        >
          <span>Enter your own secret word</span>
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  guessedWords: state.guessedWords,
  secretWord: state.secretWord,
  success: state.success,
});

const mapDispatchToProps = {
  getSecretWord,
  setUserSecretWord,
}

export default connect(mapStateToProps, mapDispatchToProps)(JottoRedux);
