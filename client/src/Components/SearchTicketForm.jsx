import React, { useState } from 'react';
import '../styles/searchTicketForm.css';

export default function SearchTicketForm({ ticket, setTicket, handlerNotification, handlerAvaliablePlace }) {

  let In = '';
  let Out = '';
  let Time = '';
  let Total = '';
  const token = sessionStorage.getItem('token');

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

  if (ticket) {
    In = ticket.in;
    Out = ticket.out;
    Time = timeFormat(ticket.time);
    Total = ticket.total;
  }

  const handlerUpdateTicket = async (ev) => {
    ev.preventDefault();
    if (ticket === null) {
      handlerNotification("Campos vacios !", 500, 2000);
    } else {
      const response = await fetch('http://localhost:3000/api/v1/ticket/ingreso', {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          auth: token,
        },
        body: JSON.stringify({
          ID_ticket: ticket.ID_ticket,
          out: Out,
          total: Total,
          state: 2,
          min_used: ticket.time,
        })
      });
      if (response.ok && response.status === 200){
        const data = await response.json();
        handlerNotification(response.statusText, response.status, 3000);
        setTicket(null);
        handlerAvaliablePlace();
      } else {
        const data = await response.json();
        handlerNotification(response.statusText, response.status, 3000);
      }
    }
  }

  return (
    <form className="searchTicketForm" onSubmit={handlerUpdateTicket}>
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
      <span>Total: ${Total}</span>
      <span />
      <button className="entry--button" id="entry--button" type="submit">Finalizar</button>
    </form>
  );
}
