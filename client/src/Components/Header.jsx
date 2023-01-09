import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/header.css';
import { List, XLg, PersonCircle } from 'react-bootstrap-icons';

export default function Header({ isOpenBox, setIsOpenBox, handlerNotification }) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [boxStatus, setBoxStatus] = useState(false);
  const [box, setBox] = useState(false);
  const handleOpenMenu = () => {
    const menu = document.getElementsByClassName('header--menu');
    menu[0].classList.remove('hidden');
  }

  const handleCloseMenu = () => {
    const menu = document.getElementsByClassName('header--menu');
    menu[0].classList.add('hidden');
  }

  const navigate = useNavigate();
  const handlerCloseSession = async () => {
    navigate("/caja/cerrar");
    // location.href = "/caja/cerrar";
    // const response = await fetch('http://localhost:3000/api/v1/logout', {
    //   method: 'GET',
    //   headers: {
    //     auth: token
    //   }
    // });

    // if (response.ok) {
    //   const data = await response.json();
    //   sessionStorage.removeItem('token');
    //   sessionStorage.removeItem('parking');
    //   handlerNotification(data.msg, response.status, 2000);
    //   location.reload();
    // } else {
    //   handlerNotification("Error Vuelva a intentar !", 404, 2000);
    // }
  }

  return (
    <header className="header">
      <button type="button" onClick={() => handleOpenMenu()} className="header--icon">
        <List size={32} color={"white"} />
      </button>

      <img className="header--logo" src="/assets/logo.svg" alt="Your SVG" />

      <div className="header--menu hidden">
        <button type="button" onClick={() => handleCloseMenu()} className="header--menu__close">
          <XLg size={30} color={"white"} />
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
              <Link to="/caja" >Caja</Link>
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
