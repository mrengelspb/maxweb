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
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  handler: PropTypes.elementType,
  id: PropTypes.string,
};
