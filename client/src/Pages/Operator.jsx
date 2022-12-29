import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import Header from '../Components/Header';
import Modal from '../Components/Modal';
import '../styles/operator.css';
import '../styles/action.css';

export default function Operador({
  state, PATH_LOGIN, handlerNotification,
}) {
  const [token, setToken] = useState(sessionStorage.getItem('token'));
  const [action, setAction] = useState('');

  if (!token) return (<Navigate to={PATH_LOGIN} />);
  if (action === 'Finalizar') return (<Navigate to="/facturador"  replace={true}/>);
  return (
    <div>
      <Header handlerNotification={handlerNotification} />
      <ModalButton action="Finalizar" setAction={setAction} state={state} />
      <ModalButton action="Imprimir Ticket" state={state} />
      <ModalButton action="Imprimir Factura" state={state} />
    </div>
  );
}

Operador.propTypes = {
  state: PropTypes.object,
  PATH_LOGIN: PropTypes.string.isRequired,
};

function ModalButton({ action, state, setAction}) {

  const handlerFacturar = () => {
    setAction(action);
  };

  const handlerOpenModal = (ev) => {
    const modal = ev.target.previousSibling;
    modal.classList.add('active');
  };

  if (action === 'Finalizar') {
    return (
      <button type="button" className="" onClick={handlerFacturar}>Facturar</button>
    );
  } if (action === 'Imprimir Ticket') {
    return (
      <>
        <Modal isOpen className="modal">
          <div>
            <h1>Imprimir Ticket</h1>
          </div>
        </Modal>
        <button className="action" type="button" onClick={handlerOpenModal}>{action}</button>
      </>
    );
  } if (action === 'Imprimir Factura') {
    return (
      <>
        <Modal isOpen className="modal">
          <div>
            <h1>Imprimir Factura</h1>
          </div>
        </Modal>
        <button className="action" type="button" onClick={handlerOpenModal}>{action}</button>
      </>
    );
  }
}

ModalButton.propTypes = {
  action: PropTypes.string.isRequired,
  state: PropTypes.object,
};
