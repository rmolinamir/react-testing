// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Input extends Component {
  render() {
    const { success } = this.props;
    const contents = !success && (
      <form className="form-inline">
        <input
          data-test="input-box"
          className="mb-2 mx-sm-3"
          type="text"
          placeholder="enter guess"
        />
        <button
          data-test="submit-button"
          type="submit"
          className="btn btn-primary mb-2"
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

export default connect(mapStateToProps)(Input);
