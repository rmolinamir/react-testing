// Libraries
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Functional react component for congrutulatory message.
 * @function
 * @param {object} - React.props
 * @returns {JSX.Element} - Rendered component (or null if `success` prop is `true`)
 */
export default function Congrats(props){
  const { success } = props;
  if (success) {
    return (
      <div data-test="component-congrats">
        <span data-test="congrats-message">
          Congratulations! You guessed the word!
        </span>
      </div>
    )
  }
  return (
    <div data-test="component-congrats" />
  );
}

Congrats.propTypes = {
  success: PropTypes.bool,
}
