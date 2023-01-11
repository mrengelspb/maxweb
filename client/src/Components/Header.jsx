import React from 'react';
import { Power, PersonCircle } from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/header.css';

export default function Header() {
  const navigate = useNavigate();
  const handlerCloseSession = async () => {
    navigate('/caja/cerrar');
  };

  return (
    <header className="header">
      <img className="header--logo" src="/assets/logo.svg" alt="Your SVG" />

      <div className="menu--operador">
        <div className="header--home">
          <Link to="/admin">Admin</Link>
        </div>
        <PersonCircle className="operador--icon" size={32} color="white" />
        <p className="menu--text">Bienvenido User | role</p>
        <button className="menu--button" type="button" onClick={handlerCloseSession}>
          <Power size="32" color="white" />
        </button>
      </div>
    </header>
  );
}
