import React, { useEffect, useState } from 'react';
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
  const [ticket, setTicket] = useState(null);
  const [paper, setPaper] = useState(false);
  const [tariff, setTariff] = useState('diurna');
  const [token, setToken] = useState(sessionStorage.getItem('token'));
  const parking = JSON.parse(localStorage.getItem('parking'));
  const [places, setPlaces] = useState(parking.total_places);

  const handlerAvaliablePlace = async () => {
    const response = await fetch('http://localhost:3000/api/v1/espacios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        auth: token,
      },
      body: JSON.stringify({
        ID_parking: parking.ID_parking,
      }),
    });
    if (response.ok && response.status === 200) {
      const data = await response.json();
      setPlaces(parking.total_places - data.result);
    }
  };
  if (paper) return (<Navigate to="/operador" />);
  if (!token) return (<Navigate to={PATH_LOGIN} />);
  return (
    <>
    <Header handlerNotification={handlerNotification} />
      <div className="entry">
        <div className="entry--info">
          <SearchTicket setTicket={setTicket} handlerNotification={handlerNotification}  tariff={tariff} />
          <Clock />
        </div>
        <Tariff tariff={tariff} setTariff={setTariff} />
        <div className="entry--data">
          <TrafficLight />
          <SearchTicketForm setPaper={setPaper} handlerAvaliablePlace={handlerAvaliablePlace} ticket={ticket} setTicket={setTicket} handlerNotification={handlerNotification} />
          <AvailableParkings handlerAvaliablePlace={handlerAvaliablePlace} places={places} />
        </div>
      </div>
    </>
  );
}
