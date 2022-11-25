import React from 'react';
import '../styles/header.css';
import { List, XLg, PersonCircle } from 'react-bootstrap-icons';

export default function Header() {
  function handleOpenMenu() {
    const menu = document.getElementsByClassName('header--menu');
    menu[0].classList.remove('hidden');
  }

  function handleCloseMenu() {
    const menu = document.getElementsByClassName('header--menu');
    menu[0].classList.add('hidden');
  }

  return (
    <header className="header">
      <button type="button" onClick={() => handleOpenMenu()} className="header--icon">
        <List size={32} />
      </button>

      <div className="header--menu">
        <button type="button" onClick={() => handleCloseMenu()} className="header--menu__close">
          <XLg size={30} />
        </button>
        <nav className="header--nav">
          <ul className="nav--list">
            <li className="nav--header nav--item">
              <div className="menu--icon">
                <PersonCircle size={32} />
              </div>
              <p className="menu--text">Bienvenido Nombre, Rol</p>
            </li>
            <li className="nav--item">Menu 1</li>
            <li className="nav--item">Menu 2</li>
            <li className="nav--item">Menu 3</li>
            <li className="nav--item">Menu 4</li>
            <li className="nav--item">Menu 5</li>
          </ul>
        </nav>
      </div>

    </header>
  );
}
