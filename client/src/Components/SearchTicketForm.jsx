import React, {useState} from 'react';
import '../styles/searchTicketForm.css';

export default function SearchTicketForm({data}) {

  let In = "";
  let Out = "";
  let Time = "";
  let Total = "";

  if (data) {
    In = data.in.replace("T", " ").slice(0, 19);
    Out = data.out.replace("T", " ").slice(0, 19);
    Time = data.time;
    Total = data.total;
  }
  
  const handlerUpdateTicket = (ev) => {
    ev.preventDefault();
    fetch('http://localhost:3000/api/v1/ticket/ingreso', {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ID_ticket: data.ID_ticket,
        out: Out,
        total: Total,
        state: 2,
        min_used: Time
      })
    })
      .then((response) => response.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  return (
    <form className="searchTicketForm" onSubmit={handlerUpdateTicket}>
      <input type="text" value={In} readOnly placeholder="Ingreso" />
      <input type="text" value={Out} readOnly placeholder="Salida" />
      <input type="text" value={Time} readOnly placeholder="Tiempo" />
      <span>Total:{Total}</span>
      <span />
      <button className="entry--button" type="submit">Finalizar</button>
    </form>
  );
}
