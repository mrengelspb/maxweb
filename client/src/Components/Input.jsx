import React from 'react';
import PropTypes from 'prop-types';
import '../styles/input.css';

export default function Input({
  placeholder, type, value, handler, id,
}) {
  return (
    <input
      className="form--input"
      type={type}
      id={id}
      name=""
      placeholder={placeholder}
      value={value}
      onChange={handler}
    />
  );
}

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handler: PropTypes.elementType.isRequired,
  id: PropTypes.string.isRequired,
};
