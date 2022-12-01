import React, {useState} from 'react';
import '../styles/searchTicketForm.css';

export default function SearchTicketForm({data}) {

  let In = "";
  let Out = "";
  let Time = "";
  let Total = "";

  if(data !== null) {
    In = data.in.replace("T", " ").slice(0, 19);
    const hoy = new Date();
    Out = hoy.toISOString().replace("T", " ").slice(0, 19);
    const start = new Date(In);
    const end = new Date(Out);
    Time = end.getMinutes() - start.getMinutes();
    // TO DO
    // Implementar tarifas para calcular el total
    Total = Time * 9;
  }

  const handlerUpdateTicket = (ev) => {
    ev.preventDefault();
    fetch('http://localhost:3000/ingreso', {
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
      <input type="text" value={In} placeholder="Ingreso" />
      <input type="text" value={Out} placeholder="Salida" />
      <input type="text" value={Time} placeholder="Tiempo" />
      <span>Total:{Total}</span>
      <span />
      <button className="entry--button" type="submit" >Finalizar</button>
    </form>
  );
}
