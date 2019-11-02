// Libraries
import React from 'react';
import PropTypes from 'prop-types';

export default function LanguagePicker(props) {
  const { setLanguage } = props;
  const languages = [
    { code: 'en', symbol: '🇺🇸' },
    { code: 'emoji', symbol: '😊' },
  ];

  const languaeIcons = languages.map(lang => (
    <span
      data-test="language-icon"
      key={lang.code}
      onClick={() => setLanguage(lang.code)}
    >
      {lang.symbol}
    </span>
  ));

  return (
    <div data-test="component-language-picker">
      {languaeIcons}
    </div>
  );
}

LanguagePicker.propTypes = {
  setLanguage: PropTypes.func.isRequired,
}
