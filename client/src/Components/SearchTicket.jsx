import React, { useState } from 'react';
import { Search, Trash } from 'react-bootstrap-icons';

export default function SearchTicket({ setData, handlerNotification }) {
  const [ID_ticket, setIdTicket] = useState('');

  const handlerIdTicket = (ev) => {
    setIdTicket(ev.target.value);
  }
  const handlerSearchTicket = async (ev) => {
    ev.preventDefault();
    const parking = JSON.parse(localStorage.getItem('parking'));
    const response = await fetch(`http://localhost:3000/api/v1/ticket/${ID_ticket}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ID_parking: parking.ID_parking,
      }),
    });

    if (response.ok && response.status === 200) {
      const data = await response.json();
      setData(data);
    } else {
      handlerNotification(response.statusText, response.status, 3000);
    }
  }

  return (
    <div>
      <form method='post' onSubmit={handlerSearchTicket}>
        <label htmlFor="ticket">
          Buscar Ticket:
          <input type="text"  value={ID_ticket} onChange={handlerIdTicket} />
          <button type="submit" >
            <Search />
          </button>
          <button type="button">
            <Trash />
            <input type="reset" value="Limpiar" />
          </button>
        </label>
      </form>
    </div>
  );
}
