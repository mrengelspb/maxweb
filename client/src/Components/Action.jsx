import React from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';
import Create from './Create';
import Eliminar from './Eliminar';
import '../styles/action.css';

export default function Action({ children, text }) {
  const handlerOpenModal = (ev) => {
    if (ev.target.localName === 'button') {
      const modal = ev.target.previousSibling;
      modal.classList.add('active');
    }
    if (ev.target.localName === 'p' || ev.target.localName === 'svg') {
      const modal = ev.target.parentNode.previousSibling;
      modal.classList.add('active');
    }
  };

  return (
    <>
      { text === 'Crear'
        ? <Modal><Create /></Modal>
        : <Modal><Eliminar /></Modal> }
      <button className="action" type="button" onClick={handlerOpenModal}>
        {children}
        <p>{text}</p>
      </button>
    </>
  );
}

Action.propTypes = {
  children: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
};
