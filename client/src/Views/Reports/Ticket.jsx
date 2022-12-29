import React, { useEffect, useState } from "react";
import './styles/ticket.css';

export default function ({ handlerNotification }) {

  const bodyTable = [];
  const [tickets, setTickets] = useState([]);
  const [since, setSince] = useState(new Date().toISOString().split("T")[0]);
  const [to, setTo] = useState(new Date().toISOString().split("T")[0]);
  const parking = JSON.parse(localStorage.getItem('parking'));
  const token = sessionStorage.getItem('token');

  const handlerTickerReport = async (ev) => {
    console.log(parking);
    ev.preventDefault();
    const response = await fetch('http://localhost:3000/api/v1/informes/ticket', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        auth: token,
      },
      body: JSON.stringify({
        since: since + " 00:00:00",
        to: to + " 23:59:59",
        parking: parking.ID_parking
      }),
    });
    if (response.ok && response.status === 200) {
      const data = await response.json();
      console.log(data);
      setTickets(data);
      handlerNotification(response.statusText, response.status, 2000);
    } else {
      handlerNotification(response.statusText, response.status, 2000);
    }
  };

  const handlerSince = (ev) => { setSince(ev.target.value); console.log(ev.target.value) };
  const handlerTo = (ev) => { console.log(ev.target.value); setTo(ev.target.value) };

  useEffect(() => {
    for (const ticket of tickets) {
      bodyTable.push(
        <>
          <tr>
            <td>{ticket.ID_ticket}</td>
          </tr>
        </>
      )
    }
  }, [tickets]);

  return (
    <>
      <div className="ticketReport--container">
        <header>
          <form method="POST" onSubmit={handlerTickerReport}>
            <label htmlFor="since">Desde: </label>
            <input type="date" name="since" id="since" value={since} onChange={handlerSince} />
            <label htmlFor="to">Hasta: </label>
            <input type="date" name="to" id="to" value={to} onChange={handlerTo} />
            <button type="submit">Buscar</button>
          </form>

          <button type="button">Export PDF</button>
          <button type="button">Export Excel </button>
        </header>
        <div className="ticketReport--body">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Ticket Id</th>
                <th>State</th>
                <th>Campo 3</th>
              </tr>
            </thead>
            <tbody>
              {bodyTable}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
};
