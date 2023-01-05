import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import { Person, Tools, CardList } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import Title from '../Components/Title';
import Action from '../Components/Action';
import '../styles/dashboard.css';

export default function Dashboard({ setIsOpenBox, isOpenBox, PATH_LOGIN, handlerNotification }) {
  const [token, setToken] = useState(sessionStorage.getItem('token'));
  const [reportTicket, setReportTicket] = useState(false); 
  const handlerReportTickets = () => {
    setReportTicket(true);
  };

  if (reportTicket) return (<Navigate to="/informes/ticket" />)
  if (!token) return (<Navigate to={PATH_LOGIN} />);
  return (
    <>
      <Header setIsOpenBox={setIsOpenBox} isOpenBox={isOpenBox} handlerNotification={handlerNotification} />
      <div className="dashboard">
        <Title text="Panel de Control" />

        <div className="dashboard--container">
          <div className="dashboard--content">
            <div className="dashboard--tag">
              <span>C</span>
              <span>U</span>
              <span>E</span>
              <span>N</span>
              <span>T</span>
              <span>A</span>
            </div>
            <div className="dashboard--actions">
              <Action text="Crear">
                <Person size="50" />
              </Action>
              <Action text="Modificar/Eliminar">
                <Tools size="50" />
              </Action>
            </div>
          </div>

          
          <div className="dashboard--content">
            <div className="dashboard--tag">
              <span>I</span>
              <span>N</span>
              <span>F</span>
              <span>O</span>
              <span>R</span>
              <span>M</span>
              <span>A</span>
              <span>C</span>
              <span>I</span>
              <span>O</span>
              <span>N</span>
            </div>
            <div className="dashboard--actions ">
              <div className="action--container">
                <button className="action--button" onClick={handlerReportTickets}>
                  <CardList size="50" />
                  <p>Tickets</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Dashboard.propTypes = {
  state: PropTypes.object,
  setState: PropTypes.func.isRequired,
  PATH_LOGIN: PropTypes.string.isRequired,
  handlerNotification: PropTypes.func.isRequired,
};
