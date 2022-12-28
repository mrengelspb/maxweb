import React, { useState } from 'react';
import { Search, Trash } from 'react-bootstrap-icons';

export default function SearchTicket({ setTicket, handlerNotification, tariff }) {
  const [ID_ticket, setIdTicket] = useState('');
  const token = sessionStorage.getItem('token');

  const handlerIdTicket = (ev) => {
    setIdTicket(ev.target.value);
  }
  const handlerSearchTicket = async (ev) => {
    ev.preventDefault();
    const parking = JSON.parse(localStorage.getItem('parking'));
    try {
      const response = await fetch(`http://localhost:3000/api/v1/ticket/${ID_ticket}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          auth: token,
        },
        body: JSON.stringify({
          ID_parking: parking.ID_parking,
          typeTariff: tariff,
        }),
      });
      if (response.ok && response.status === 200) {
        const data = await response.json();
        console.log(data);
        if (data.state === "2") {
          handlerNotification("Ticket Finalizado !", 500, 2000);
        } else {
          setTicket(data);
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
  }

  const handlerReset = () => {
    const inputHTML = document.getElementById('searchTicket--input');
    inputHTML.value = '';
  }

  return (
    <div>
      <form method='post' onSubmit={handlerSearchTicket}>
        <label htmlFor="ticket">
          Buscar Ticket:
          <input type="number" id="searchTicket--input"  className="searchTicket--input" value={ID_ticket} onChange={handlerIdTicket} />
          <button type="submit" >
            <Search />
          </button>
          <button type="button" onClick={handlerReset}>
            <Trash />
          </button>
        </label>
      </form>
    </div>
  );
}
