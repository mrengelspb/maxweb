import React, { useEffect, useState } from 'react';
import { Search, Trash } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import TrafficLight from '../Components/TrafficLight';
import AvailableParkings from '../Components/AvailableParkings';
import Clock from '../Components/Clock';
import Tariff from '../Components/Tariff';
import '../styles/card.css';
import '../styles/searchTicketForm.css';

export default function Card({ caja, setCaja, handlerNotification }) {
  const [card, setCard] = useState('');
  const [ID_card, setIdCard] = useState('');
  const token = sessionStorage.getItem('token');
  const parking = JSON.parse(localStorage.getItem('parking'));
  const [places, setPlaces] = useState(parking.total_places);
  const [tariff, setTariff] = useState('diurna');
  const navigate = useNavigate();
  let In = '';
  let Out = '';
  let Time = '';
  let Total = '';

  const timeFormat = (time) => {
    let hours;
    let days;
    let minutes;

    days = Math.floor(time / (60 * 24));
    hours = Math.floor(((time /(60 * 24)) - days) * 24);
    minutes = Math.floor(((((time /(60 * 24)) - days) * 24) - hours) * 60);

    if (days < 10) {
      days = `0${days}`;
    }

    if (hours < 10) {
      hours = `0${hours}`;
    }

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    return `${days} dias ${hours} horas ${minutes} minutos`;
  };

  if (card) {
    In = card.in;
    Out = card.out;
    Time = timeFormat(card.time);
    Total = card.total;
  }

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

  const handlerUpdateCard = async (ev) => {
    ev.preventDefault();
    if (card === null) {
      handlerNotification('Campos vacios !', 500, 2000);
    } else {
      const response = await fetch('http://localhost:3000/api/v1/card/updated', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          auth: token,
        },
        body: JSON.stringify({
          id_card: card.code,
          out: Out,
          total: Total,
          state: 2,
          min_used: card.time,
        }),
      });
      if (response.ok && response.status === 200) {
        setCaja(caja + Total);
        handlerNotification(response.statusText, response.status, 3000);
        setCard(null);
        handlerAvaliablePlace();
        navigate('/facturador');
      } else {
        handlerNotification(response.statusText, response.status, 3000);
      }
    }
  };

  const handlerSearchCard = async (ev) => {
    ev.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/v1/card/${ID_card}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          auth: token,
        },
        body: JSON.stringify({
          ID_parking: parking.ID_parking,
          levelAccess: parking.levelAccess,
          typeTariff: tariff,
        }),
      });
      if (response.ok && response.status === 200) {
        const data = await response.json();
        console.log(data);
        if (data.state === 2) {
          handlerNotification('Card Finalizado !', 500, 2000);
        } else {
          setCard(data);
          const entryHTML = document.getElementById('entry--button');
          entryHTML.focus();
        }
      } else {
        handlerNotification(response.statusText, response.status, 3000);
      }
    } catch (error) {
      console.log(error);
      handlerNotification(error.message, 404, 3000);
    }
  };

  const handlerIdCard = (ev) => {
    setIdCard(ev.target.value);
  };

  const handlerReset = () => {
    const inputHTML = document.getElementById('searchCard--input');
    inputHTML.value = '';
  };

  useEffect(() => {
    const searchCardInput = document.getElementById('searchCard--input');
    searchCardInput.focus();
  }, []);

  return (
    <div className="searchCard--container">
      <h1>Control Tarjetas</h1>
      <div>
        <form method="post" onSubmit={handlerSearchCard}>
          <label htmlFor="ticket">
            Código:
            <input type="number" id="searchCard--input" className="searchCard--input" value={ID_card} onChange={handlerIdCard} />
            <button type="submit">
              <Search />
            </button>
            <button type="button" onClick={handlerReset}>
              <Trash />
            </button>
          </label>
        </form>
        <Clock />
        <Tariff tariff={tariff} setTariff={setTariff} />
      </div>
      <div className="card--main">
        <TrafficLight />
        <form className="searchTicketForm" onSubmit={handlerUpdateCard}>
          <label htmlFor="in">
            Ingreso:
            <input type="text" value={In} id="in" readOnly />
          </label>
          <label htmlFor="out">
            Salida:
            <input type="text" value={Out} id="out" readOnly />
          </label>
          <label htmlFor="time">
            Tiempo del servicio:
            <span id="time">{Time}</span>
          </label>
          <span>
            Total: $
            {Total}
          </span>
          <span />
          <button className="entry--button" id="entry--button" type="submit">Finalizar</button>
        </form>
        <AvailableParkings handlerAvaliablePlace={handlerAvaliablePlace} places={places} />
      </div>
    </div>
  );
}

Card.propTypes = {
  handlerNotification: PropTypes.func.isRequired,
  caja: PropTypes.number.isRequired,
  setCaja: PropTypes.func.isRequired,
};
