import React, { useEffect, useState } from 'react';
import { Person, Tools } from 'react-bootstrap-icons';
import Title from '../Components/Title';
import Action from '../Components/Action';
import Header from '../Components/Header';
import '../styles/dashboard.css';

export default function Dashboard() {
  const [state, setState] = useState({
    user_name: "Invitado",
    role: "Invitado"
  });

  useEffect(() => {
    fetch('http://localhost:3000/admin')
      .then((response) => response.json())
      .then((res) => {
        setState(res[0]);
      })
      .catch((err) => {
        console.log(err, err);
      }, []);
  });

  return (
    <>
      <Header state={state} />
      <div className="dashboard">
        <Title text="Panel de Control" />

        <div className="dashboard--container">
          <div className="dashboard--tag">
            <span>C</span>
            <span>U</span>
            <span>E</span>
            <span>N</span>
            <span>T</span>
            <span>A</span>
          </div>
          <div className="dashboard--content">
            <Action text="Crear">
              <Person size="50" />
            </Action>
            <Action text="Modificar/Eliminar">
              <Tools size="50" />
            </Action>
          </div>
        </div>
      </div>
    </>
  );
}
