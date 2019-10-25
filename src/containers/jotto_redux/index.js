// Libraries
import React, { Component } from 'react';

// Components
import Congrats from 'component/jotto_redux/Congrats';
import GuessedWords from 'component/jotto_redux/GuessedWords';

export default class App extends Component {
  render() {
    return (
      <div className="App" data-test="component-app">
        <h1>Jotto</h1>
        <Congrats success={true} />
        <GuessedWords guessedWords={[
          {
            guessedWord: 'train',
            letterMatchCount: 3,
          }
        ]} />
      </div>
    );
  }
}
