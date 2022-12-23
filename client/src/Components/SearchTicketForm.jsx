import React, {useState} from 'react';
import { Rss } from 'react-bootstrap-icons';
import '../styles/searchTicketForm.css';

export default function SearchTicketForm({ data, handlerNotification}) {

  let In = '';
  let Out = '';
  let Time = '';
  let Total = '';
  const token = localStorage.getItem('token');

  const timeFormat = (time) => {
    let hours;
    let days;
    let minutes;

    days = Math.floor(time / (60 * 24));
    hours = Math.floor(((time /(60 * 24)) - days) * 24);
    minutes = Math.floor(((((time /(60 * 24)) - days) * 24) - hours) * 60);

    if (days < 10) {
      days = "0" + days;
    }

    if (hours < 10) {
      hours = "0" + hours;
    }

    if (minutes < 10) {
      minutes = "0" + minutes; 
    }
    return `${days} dias ${hours} horas ${minutes} minutos`;
  }

  if (data) {
    In = data.in;
    Out = data.out;
    Time = timeFormat(data.time);
    Total = data.total;
  }
  
  const handlerUpdateTicket = async (ev) => {
    ev.preventDefault();
    const response = await fetch('http://localhost:3000/api/v1/ticket/ingreso', {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        auth: token,
      },
      body: JSON.stringify({
        ID_ticket: data.ID_ticket,
        out: Out,
        total: Total,
        state: 2,
        min_used: data.time,
      })
    });

    if (response.ok && response.status === 200){
      const data = await response.json();
      console.log(data);
      handlerNotification(response.statusText, response.status, 3000);
    } else {
      console.log(response);
      const data = await response.json();
      console.log(data);
      handlerNotification(response.statusText, response.status, 3000);
    }
  }

  return (
    <form className="searchTicketForm" onSubmit={handlerUpdateTicket}>
      <label htmlFor="">
        Ingreso:
        <input type="text" value={In} readOnly />
      </label>
      <label htmlFor="">
        Salida:
        <input type="text" value={Out} readOnly />
      </label>
      <label htmlFor="">
        Tiempo del servicio:
        <span>{Time}</span>
      </label>
      <span>Total: ${Total}</span>
      <span />
      <button className="entry--button" id="entry--button" type="submit">Finalizar</button>
    </form>
  );
}
