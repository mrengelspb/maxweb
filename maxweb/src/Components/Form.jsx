import React from 'react';
import PropTypes from 'prop-types';
import '../styles/form.css';

export default function Form({ children }) {
  return (
    <form className="form--content">
      {children}
    </form>
  );
}

Form.propTypes = {
  children: PropTypes.element.isRequired,
};
