import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/header.css';
import { List, XLg, PersonCircle } from 'react-bootstrap-icons';

export default function Header({ handlerNotification }) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const handleOpenMenu = () => {
    const menu = document.getElementsByClassName('header--menu');
    menu[0].classList.remove('hidden');
  }

  const handleCloseMenu = () => {
    const menu = document.getElementsByClassName('header--menu');
    menu[0].classList.add('hidden');
  }

  const handlerCloseSession = async () => {
    const response = await fetch('http://localhost:3000/api/v1/logout', {
      method: 'GET',
      headers: {
        auth: token
      }
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.removeItem('token');
      localStorage.removeItem('parking');
      handlerNotification(data.msg, response.status, 2000);
      location.reload();
    } else {
      handlerNotification("Error Vuelva a intentar !", 404, 2000);
    }
  }

  return (
    <header className="header">
      <button type="button" onClick={() => handleOpenMenu()} className="header--icon">
        <List size={32} />
      </button>

      <div className="header--menu hidden">
        <button type="button" onClick={() => handleCloseMenu()} className="header--menu__close">
          <XLg size={30} />
        </button>
        <nav className="header--nav">
          <ul className="nav--list">
            <li className="nav--header nav--item">
              <div className="menu--icon">
                <PersonCircle size={32} />
              </div>
              <p className="menu--text">Bienvenido User, role</p>
            </li>
            <li className="nav--item">Menu 1</li>
            <li className="nav--item">Menu 2</li>
            <li className="nav--item">Menu 3</li>
            <li className="nav--item">Menu 4</li>
            <li className="nav--item">
              <button type="button" onClick= {handlerCloseSession}>Terminar Session</button>
            </li>
          </ul>
        </nav>
      </div>

    </header>
  );
}

Header.propTypes = {
  handlerNotification: PropTypes.func.isRequired,
};
