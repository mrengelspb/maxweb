import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../Components/Header';
import SearchTicket from '../Components/SearchTicket';
import Clock from '../Components/Clock';
import TrafficLight from '../Components/TrafficLight';
import SearchTicketForm from '../Components/SearchTicketForm';
import AvailableParkings from '../Components/AvailableParkings';
import Tariff from '../Components/Tariff';
import '../styles/entry.css';

export default function Entry({ state, PATH_LOGIN, handlerNotification }) {  
  const [data, setData] = useState(null);
  const [tariff, setTariff] = useState('diurna');
  const [token, setToken] = useState(localStorage.getItem('token'));

  if (!token) return (<Navigate to={PATH_LOGIN} />);
  return (
    <>
      <Header handlerNotification={handlerNotification} />
      <div className="entry">
        <div className="entry--info">
          <SearchTicket setData={setData} handlerNotification={handlerNotification}  tariff={tariff} />
          <Clock />
        </div>
        <Tariff tariff={tariff} setTariff={setTariff} />
        <div className="entry--data">
          <TrafficLight />
          <SearchTicketForm data={data} handlerNotification={handlerNotification} />
          <AvailableParkings />
        </div>
      </div>
    </>
  );
}
