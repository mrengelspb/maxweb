import React, {useState} from 'react';
import { Search, Trash } from 'react-bootstrap-icons';

export default function SearchTicket({setData}) {
  const [ID_ticket, setIdTicket] = useState('');

  const handlerIdTicket = (ev) => {
    setIdTicket(ev.target.value);
  }
  const handlerSearchTicket = (ev) => {
    ev.preventDefault();
    fetch('http://localhost:3000/ingreso', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ID_ticket,
      })
    })
      .then((response) => response.json())
      .then((res) => setData(res[0]))
      .catch((err) => {
        console.log(err);
      });
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
