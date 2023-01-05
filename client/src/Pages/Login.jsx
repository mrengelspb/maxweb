import React, { useState, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import  { Person, Lock } from 'react-bootstrap-icons';
import '../styles/login.css';

function Login({
  handlerNotification,
  HOST,
  PORT,
  PATH_LOGIN_API,
}) {
  const [token, setToken] = useState(sessionStorage.getItem('token'));
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const buttonRef = useRef(null);
  const passwordRef = useRef(null);

  const handlerUserName = (event) => {
    setUserName(event.target.value);
  };

  const handlerPassword = (event) => {
    setPassword(event.target.value);
  };

  const SubmitHandler = async (ev) => {
    if (ev.key == 'Enter' && ev.type === 'keydown') {
      const response = await fetch(`http://${HOST}:${PORT}${PATH_LOGIN_API}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName,
          password,
        }),
      });

      if (response.ok && response.status === 200) {
        const data = await response.json();
        handlerNotification(response.statusText, response.status, 5000);
        setTimeout(() => {
          sessionStorage.setItem('token', data.token);
          localStorage.setItem('parking', JSON.stringify(data.parking));
          setToken(data.token);
        }, 2000);
      } else if (!response.ok && response.status === 404) {
        handlerNotification(response.statusText, response.status, 1500);
      }
    }
  };

  const handlerKeyDownUserName = (ev) => {
    if (ev.key == 'Enter') {
      passwordRef.current.focus();
    }
  };

  const handlerKeyDownButton = (ev) => {
    if (ev.key == 'Enter') {
      buttonRef.current.focus();
    }
  };

  if (token) return (<Navigate to="/caja/abrir" />);
  return (
    <main className="login">
      <form className="login--form">
        <h1 className="login--title">Iniciar Sesión</h1>
        <div className='login--wrapperInput'>
          <Person width={16} color={"gray"}/>
          <input className="login--input" onKeyDown={handlerKeyDownUserName} type="text" value={userName} onChange={handlerUserName} />
        </div>
        <div className='login--wrapperInput'>
          <Lock width={16} color={"gray"}/>
          <input className="login--input" ref={passwordRef} onKeyDown={SubmitHandler} type="password" value={password} onChange={handlerPassword} />
        </div>
        {/* <button type="button" ref={buttonRef} onKeyDown={SubmitHandler} onClick={SubmitHandler}>Ingresar</button> */}
      </form>
    </main>
  );
}

export default Login;

Login.propTypes = {
  handlerNotification: PropTypes.func.isRequired,
  HOST: PropTypes.string.isRequired,
  PORT: PropTypes.number.isRequired,
  PATH_LOGIN_API: PropTypes.string.isRequired,
};
