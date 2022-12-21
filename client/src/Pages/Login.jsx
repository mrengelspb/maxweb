import React, { useEffect, useState } from 'react';
import { Navigate, redirect } from "react-router-dom";
import Title from '../Components/Title';
import Input from '../Components/Input';
import '../styles/login.css';

function Login({ handlerNotification }) {

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  
  // useEffect(() => {
  //   console.log(localStorage.getItem("token"));
  //   function loader() {
  //     if (localStorage.getItem("token") !== undefined) {
  //       return redirect("/admin");
  //     }
  //   }
  //   loader();
  // },[]);

  const handlerUserName = (event) => {
    setUserName(event.target.value);
  };

  const handlerPassword = (event) => {
    setPassword(event.target.value);
  };

  const SubmitHandler = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:3000/', {
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
        handlerNotification(response.statusText, response.status, 1500);
        setTimeout(() => {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        }, 2000);
    } else if (!response.ok && response.status === 404) {
      handlerNotification(response.statusText, response.status, 1500); 
    }
  };


  if (token) {
    return (<Navigate to="/admin" replace={true}/>)
  } else {
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
}

export default Login;
