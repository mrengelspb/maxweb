import React from 'react';
import PropTypes from 'prop-types';

export default function Title({ text }) {
  return (<h1 className="title">{text}</h1>);
}

Title.propTypes = {
  text: PropTypes.string.isRequired,
};
