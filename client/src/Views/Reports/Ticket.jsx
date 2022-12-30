import React, { useEffect, useState } from "react";
const download = require('downloadjs');
import './styles/ticket.css';

export default function ({ handlerNotification }) {

  const bodyTable = [];
  const headerTable = [];
  const [tickets, setTickets] = useState([]);
  const [report, setReport] = useState({});
  const [since, setSince] = useState(new Date().toISOString().split("T")[0]);
  const [to, setTo] = useState(new Date().toISOString().split("T")[0]);
  const parking = JSON.parse(localStorage.getItem('parking'));
  const token = sessionStorage.getItem('token');

  const handlerTickerReport = async (ev) => {
    ev.preventDefault();
    const response = await fetch('http://localhost:3000/api/v1/informes/ticket', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        auth: token,
      },
      body: JSON.stringify({
        since: since.replaceAll("-", "/") + " 00:00:00",
        to: to.replaceAll("-", "/") + " 23:59:59",
        parking: parking.ID_parking
      }),
    });
    if (response.ok && response.status === 200) {
      const data = await response.json();
      setReport(data);
      setTickets(data.data);
      handlerNotification(response.statusText, response.status, 2000);
    } else {
      handlerNotification(response.statusText, response.status, 2000);
    }
  };

  const handlerExportPDF = async () => {
    const response = await fetch('http://localhost:3000/api/v1/download/informe/pdf/ticket', {
      method: 'GET',
      headers: {
        auth: token,
      },
    });
    console.log(response);
    if (response.ok && response.status) {
      const data = await response.blob();
      download(data, 'ticket.pdf');
    } else {
      console.log(response);
    }
  };


  const handlerExportExcel = async () => {
    const response = await fetch('http://localhost:3000/api/v1/download/informe/excel/ticket', {
      method: 'GET',
      headers: {
        auth: token,
      },
    });
    if (response.ok && response.status) {
      const data = await response.blob();
      download(data, 'ticket.xlsx');
    } else {
      console.log(response);
    }
  };


  const handlerSince = (ev) => { setSince(ev.target.value); };
  const handlerTo = (ev) => { setTo(ev.target.value) };

  if (tickets.length !== 0) {
    const key = Object.keys(tickets[0]);
    console.log(key);
    headerTable.push(
      <tr key={key[1]}>
        <th>#</th>
        <th>{key[0]}</th>
        <th>{key[11]}</th>
        <th>{key[1]}</th>
        <th>{key[2]}</th>
        <th>{key[6]}</th>
        <th>{key[3]}</th>
        <th>{key[8]}</th>
        <th>{key[9]}</th>
      </tr>
    );
  }

  for (const ticket of tickets) {
    bodyTable.push(
      <tr key={ticket.ID_ticket}>
        <td>{tickets.indexOf(ticket) + 1}</td>
        <td>{ticket.ID_ticket}</td>
        <td>{ticket.ID_operator}</td>
        <td>{ticket.in}</td>
        <td>{ticket.out}</td>     
        <td>{ticket.state}</td>     
        <td>{ticket.expiration_date}</td>    
        <td>{ticket.minutes_used}</td>
        <td>{ticket.value_pay}</td>
      </tr>
    )
  }

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

          <button type="button" onClick={handlerExportPDF}>Export PDF</button>
          <button type="button" onClick={handlerExportExcel}>Export Excel </button>
        </header>
        <div className="ticketReport--body">
          { tickets.length === 0 ?
            <h1>Aqui podras ver tu reporte !</h1>
            :
            <table>
              <thead>
                { headerTable }
              </thead>
              <tbody>
                { bodyTable }
              </tbody>
            </table>
          }
        </div>
      </div>
    </>
  )
};
