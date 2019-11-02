// Libraries
import React from 'react';

// Dependencies
import languageContext from 'contexts/languageContext';
import stringsModule from 'helpers/strings/index'

/**
 * Functional react component for congrutulatory message.
 * @function
 * @param {object} - React.props
 * @returns {JSX.Element} - Rendered component (or null if `success` prop is `true`)
 */
export default function Congrats(props) {
  const { success } = props;
  const language = React.useContext(languageContext);
  if (success) {
    return (
      <div data-test="component-congrats" className="alert alert-success">
        <span data-test="congrats-message">
          {stringsModule.getStringByLanguage(language, 'congrats')}
        </span>
      </div>
    )
  }
  return (
    <div data-test="component-congrats" />
  );
}
