import React from 'react';
import ReactModal from 'react-modal';
import { useModal } from 'react-modal-hook';
import PropTypes from 'prop-types';
import Form from './Form';
import Title from './Title';
import Input from './Input';
import '../styles/action.css';

export default function Action({ children, text }) {
  const [showModal, hideModal] = useModal(() => {
    if (text === 'Crear') {
      return (
        <ReactModal isOpen className="modal">
          <Form>
            <button className="close" type="button" onClick={hideModal}>Close</button>
            <Title text="Crear Cuenta" />
            <Input placeholder="Nombre Usuario" type="text" />
            <Input placeholder="Contraseña" type="password" />
            <hr />
            <Input placeholder="Nombres" type="text" />
            <Input placeholder="Apellidos" type="text" />
            <Input placeholder="Teléfono" type="text" />
            <Input placeholder="Dirreción" type="text" />
            <Input placeholder="Email" type="text" />
            <label htmlFor="rol">
              Eligue un Rol:
              <select id="rol" name="rol">
                <optgroup label="Rol" />
                <option value="admin">Admin</option>
                <option value="supervisor">Supervisor</option>
                <option value="operador">Operador</option>
              </select>
            </label>
            <button type="submit">Crear Cuenta</button>
          </Form>
        </ReactModal>
      );
    } if (text === 'Modificar/Eliminar') {
      return (
        <ReactModal isOpen className="modal">
          <div>
            <button className="close" type="button" onClick={hideModal}>Close</button>
            <h1>Modal content Modificar/Eliminar</h1>
          </div>
        </ReactModal>
      );
    }
  });

  return (
    <button className="action" type="button" onClick={showModal}>
      {children}
      <p>{text}</p>
    </button>
  );
}

Action.propTypes = {
  children: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
};
