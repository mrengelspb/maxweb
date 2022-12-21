import React, { useEffect, useState } from 'react';
import { Person, Tools } from 'react-bootstrap-icons';
import Title from '../Components/Title';
import Action from '../Components/Action';
import Header from '../Components/Header';
import '../styles/dashboard.css';
import { Navigate } from 'react-router-dom';

export default function Dashboard({ state, setState}) {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    async function consultas() {
      const response = await fetch('http://localhost:3000/factura/consultas', {
        method: 'GET',
        headers: {
          'auth': token
        }
      });
      console.log(response);
      if (response.ok && response.status === 200) {
        const data = await response.json();
        console.log(data);
        setState(data[0][0]);
      } else {
        console.error('Los datos no se han cargado correctamente!')
      }
    }
    consultas();

    fetch('http://localhost:3000/admin')
      .then((response) => response.json())
      .then((res) => {
        setState(res[0]);
      })
      .catch((err) => {
        console.log(err, err);
      });
  }, []);

  if (!token) {
    return (<Navigate to="/" />);
  } else {
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
}
