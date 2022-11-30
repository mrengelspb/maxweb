import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Title from '../Components/Title';
import Input from '../Components/Input';
import SignUp from '../Components/signUp_context';
import '../styles/login.css';

function Login({value}) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(value);

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
          setAuthenticated(true);
          navigate('/admin');
        }
        return response.json();
      })
      .catch((err) => {
        console.log(err, err.message);
      });
  };

  return (

    <main className="login">
      <form method="post" onSubmit={SubmitHandler}>
        <Title text="MawWellPOS" />
        <Input placeholder="Nombre de Usuario" type="text" value={userName} handler={handlerUserName} />
        <Input placeholder="Contraseña" type="password" value={password} handler={handlerPassword} />
        <button type="submit">Ingresar</button>
      </form>
    </main>
  );
}

Login.contextType = SignUp;

export default Login;
