// Libraries
import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.handleCounter = this.handleCounter.bind(this);
    this.incrementCounter = this.incrementCounter.bind(this);
    this.decrementCounter = this.decrementCounter.bind(this);
    this.state = {
      counter: 0,
      isError: false,
    }
  }

  /**
   * Executes setState of the new counter.
   * The counter will never be less than 0, but if it  is, display an error message.
   * Remove error message if the user clicks increment button again.
   * @param {number} num - number type paramenter which will be added to the counter.
   */
  handleCounter(num) {
    this.setState(state => {
      const newCounter = state.counter + num;
      const isError = newCounter < 0;
      return {
        // newCounter cannot be negative
        counter: Math.max(newCounter, 0),
        isError,
      };
    });
  }

  incrementCounter() {
    this.handleCounter(+1)
  }

  decrementCounter() {
    this.handleCounter(-1)
  }

  render() {
    const { counter, isError } = this.state;
    return (
      <div className="App" data-test="component-app">
        <h1 data-test="counter-display">The count is: {counter}</h1>
        {isError && (
          <h1
            data-test="error-display"
            style={{
              color: 'rgb(225, 35, 35)',
            }}
          >
            The counter cannot go below zero! Click the increment button to clear the error.
          </h1>
        )}
        <button
          onClick={this.incrementCounter}
          data-test="increment-button"
        >
          Increment Counter
        </button>
        <button
          onClick={this.decrementCounter}
          data-test="decrement-button"
        >
          Decrement Counter
        </button>
      </div>
    );
  }
}
