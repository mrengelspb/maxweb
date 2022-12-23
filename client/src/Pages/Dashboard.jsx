import React, { useEffect, useState } from 'react';
import { Person, Tools } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import Title from '../Components/Title';
import Action from '../Components/Action';
import Header from '../Components/Header';
import '../styles/dashboard.css';

export default function Dashboard({ state, setState, PATH_LOGIN, handlerNotification }) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  if (!token) return (<Navigate to={PATH_LOGIN} />);
  return (
    <>
      <Header state={state} handlerNotification={handlerNotification} />
      <div className="dashboard">
        <Title text="Panel de Control" />

        <div className="dashboard--container">
          <div className="dashboard--tag">
            <span>C</span>
            <span>U</span>
            <span>E</span>
            <span>N</span>
            <span>T</span>
            <span>A</span>
          </div>
          <div className="dashboard--content">
            <Action text="Crear">
              <Person size="50" />
            </Action>
            <Action text="Modificar/Eliminar">
              <Tools size="50" />
            </Action>
          </div>
        </div>
      </div>
    </>
  );
}

Dashboard.propTypes = {
  state: PropTypes.object,
  setState: PropTypes.func.isRequired,
  PATH_LOGIN: PropTypes.string.isRequired,
  handlerNotification: PropTypes.func.isRequired,
};
