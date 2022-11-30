import React from 'react';
import PropTypes from 'prop-types';
import '../styles/form.css';

export default function Form({ method, handlerSubmit, children }) {
  return (
    <form method={method} className="form--content" onSubmit={handlerSubmit}>
      {children}
    </form>
  );
}

Form.propTypes = {
  children: PropTypes.element.isRequired,
};
