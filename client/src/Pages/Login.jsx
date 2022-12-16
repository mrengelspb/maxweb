import React, { useState } from 'react';
import Title from '../Components/Title';
import Input from '../Components/Input';
import '../styles/login.css';

function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handlerUserName = (event) => {
    setUserName(event.target.value);
  };

  const handlerPassword = (event) => {
    setPassword(event.target.value);
  };

  const SubmitHandler = (event) => {
    event.preventDefault();
    fetch('http://localhost:3000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName,
        password,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          window.location.href = '/admin';
        } else {
          return response.json();
        }
      })
      .then((res) => console.log(res))
      .catch((err) => {
        setMessage(err.message);
        console.log(err, err.message);
      });
  };

  return (

    <main className="login">
      <form className="login--form" method="post" onSubmit={SubmitHandler}>
        <Title text="MawWellPOS" />
        <input className="login--input" placeholder="Nombre de Usuario" type="text" value={userName} onChange={handlerUserName} />
        <input className="login--input" placeholder="Contraseña" type="password" value={password} onChange={handlerPassword} />
        { message !== '' ?? <span className="login--infobox login--infobox__state" >{message}</span> }
        <button type="submit">Ingresar</button>
      </form>
    </main>
  );
}

export default Login;
