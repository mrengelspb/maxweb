import React, { useState } from 'react';
import Title from './Title';

function Create() {

  const [UserName, setUserName] = useState('');
  const [Password, setPassword] = useState('');
  const [FirstName, setFirstName] = useState('');
  const [SecondFirstName, setSecondFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [SecondLastName, setSecondLastName] = useState('');
  const [IdentificationNumber, setIdentificationNumber] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [Address, setAddress] = useState('');
  const [Email, setEmail] = useState('');
  const [BirthDate, setBirthDate] = useState('');
  const [Role, setRole] = useState('');
  const token = localStorage.getItem('token');


  const handleNewUser = (ev) => {
    ev.preventDefault();
    fetch('http://localhost:3000/api/v1/admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        auth: token,
      },
      body: JSON.stringify({
        IdentificationNumber,
        FirstName,
        SecondFirstName,
        LastName,
        SecondLastName,
        PhoneNumber,
        Address,
        Email,
        BirthDate,
        UserName,
        Role,
        Password
      }),
    })
      .then((response => response.json()))
      .then((res => console.log(res)))
      .catch((err) => {
        console.log(err);
      });
  }

  const handleInputUserName = (ev) => { setUserName(ev.target.value); };
  const handleInputPassword = (ev) => { setPassword(ev.target.value) };
  const handleInputFirstName = (ev) => { setFirstName(ev.target.value) };
  const handleInputSecondFirstName = (ev) => { setSecondFirstName(ev.target.value) };
  const handleInputLastName = (ev) => { setLastName(ev.target.value) };
  const handleInputSecondLastName = (ev) => { setSecondLastName(ev.target.value) };
  const handleInputIdentificationNumber = (ev) => { setIdentificationNumber(ev.target.value) };
  const handleInputPhoneNumber = (ev) => { setPhoneNumber(ev.target.value) };
  const handleInputAddress = (ev) => { setAddress(ev.target.value) };
  const handleInputEmail = (ev) => { setEmail(ev.target.value) };
  const handleInputBirthDate = (ev) => { setBirthDate(ev.target.value) };
  const handleInputRole = (ev) => { setRole(ev.target.value) };

  return (
    <form method='post' onSubmit={handleNewUser}>
      <Title text="Crear Cuenta" />
      <input id="userName" className="form--input" placeholder="Nombre Usuario" type="text" value={UserName} onChange={handleInputUserName} />
      <input id="password" className="form--input" placeholder="Contraseña" type="password" value={Password} onChange={handleInputPassword} />
      <hr />
      <input id="firstName" className="form--input" placeholder="Primer Nombre" type="text" value={FirstName} onChange={handleInputFirstName} />
      <input id="secondFirstName" className="form--input" placeholder="Segundo Nombre" type="text" value={SecondFirstName} onChange={handleInputSecondFirstName} />
      <input id="lastName" className="form--input" placeholder="Primer Apellido" type="text" value={LastName} onChange={handleInputLastName} />
      <input id="secondLastName" className="form--input" placeholder="Segundo Apellido" type="text" value={SecondLastName} onChange={handleInputSecondLastName} />
      <input id="identificationNumber" className="form--input" placeholder="Número de identificación" type="number" value={IdentificationNumber} onChange={handleInputIdentificationNumber} />
      <input id="phoneNumber" className="form--input" placeholder="Teléfono" type="text" value={PhoneNumber} onChange={handleInputPhoneNumber} />
      <input id="adress" className="form--input" placeholder="Dirreción" type="text" value={Address} onChange={handleInputAddress} />
      <input id="email" className="form--input" placeholder="Email" type="text" value={Email} onChange={handleInputEmail} />
      <label htmlFor="birthDate">
        Fecha de Nacimiento:
        <input id="birthDate" htmlFor="birth_date" type="date" value={BirthDate} onChange={handleInputBirthDate} />
      </label>
      <label htmlFor="role">
        Eligue un Rol:
        <select id="role" name="rol" value={Role} onChange={handleInputRole}>
          <optgroup label="Rol" />
          <option value="admin">Admin</option>
          <option value="supervisor">Supervisor</option>
          <option value="operador">Operador</option>
        </select>
      </label>
      <button type="submit">Crear Cuenta</button>
    </form>
  )
}

export default Create;