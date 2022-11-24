import React from 'react';
import PropTypes from 'prop-types';

export default function Button({ text }) {
  return (<button type="submit">{text}</button>);
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
};
