import React from 'react';
import { List, XLg, PersonCircle } from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/header.css';

export default function Header() {
  const handleOpenMenu = () => {
    const menu = document.getElementsByClassName('header--menu');
    menu[0].classList.remove('hidden');
  };

  const handleCloseMenu = () => {
    const menu = document.getElementsByClassName('header--menu');
    menu[0].classList.add('hidden');
  };

  const navigate = useNavigate();
  const handlerCloseSession = async () => {
    navigate('/caja/cerrar');
  };

  return (
    <header className="header">
      <button type="button" onClick={() => handleOpenMenu()} className="header--icon">
        <List size="32" color="white" />
      </button>

      <img className="header--logo" src="/assets/logo.svg" alt="Your SVG" />

      <div className="header--menu hidden">
        <button type="button" onClick={() => handleCloseMenu()} className="header--menu__close">
          <XLg size="30" color="white" />
        </button>
        <nav className="header--nav">
          <ul className="nav--list">
            <li className="nav--header nav--item">
              <div className="menu--icon">
                <PersonCircle size={32} />
              </div>
              <p className="menu--text">Bienvenido User, role</p>
            </li>
            <li className="nav--item">
              <Link to="/admin">Admin</Link>
            </li>
            <li className="nav--item">
              <Link to="/operador">Operador</Link>
            </li>
            <li className="nav--item">
              <Link to="/ingreso">Ingreso</Link>
            </li>
            <li className="nav--item">
              <Link to="/facturador">Facturador</Link>
            </li>
            <li className="nav--item">
              <button type="button" onClick={handlerCloseSession}>Terminar Session</button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
