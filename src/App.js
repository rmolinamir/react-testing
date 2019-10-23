import React, { Component } from 'react';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.incrementCounter = this.incrementCounter.bind(this)
    this.state = {
      counter: 0
    }
  }

  incrementCounter() {
    this.setState(state => ({
      counter: state.counter + 1
    }))
  }

  render() {
    const { counter } = this.state;
    return (
      <div className="App" data-test="component-app">
        <h1 data-test="counter-display">The count is: {counter}</h1>
        <button
          onClick={this.incrementCounter}
          data-test="increment-button"
        >
          Increment Counter
        </button>
      </div>
    );
  }
}
