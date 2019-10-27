// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Actions
import { getSecretWord } from 'actions';

// Components
import Congrats from 'components/jotto_redux/Congrats';
import Input from 'components/jotto_redux/Input';
import GuessedWords from 'components/jotto_redux/GuessedWords';
import TotalGuesses from 'components/jotto_redux/TotalGuesses';

export class JottoRedux extends Component {
  componentDidMount() {
    const { getSecretWord } = this.props;
    getSecretWord();
  }

  render() {
    const { guessedWords, secretWord, success } = this.props;
    return (
      <div className="App" data-test="component-app">
        <h1>Jotto</h1>
        <div>The secret word is: {secretWord}</div>
        <Congrats success={success} />
        <Input />
        <TotalGuesses guessedWords={guessedWords} />
        <GuessedWords guessedWords={guessedWords} />
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
}

export default connect(mapStateToProps, mapDispatchToProps)(JottoRedux);
