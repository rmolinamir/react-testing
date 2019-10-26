// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Input extends Component {
  render() {
    return (
      <div>
        <input />
      </div>
    )
  }
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(Input);
