import React, { useEffect, useState } from "react";
const download = require('downloadjs');
import './styles/report.css';

export default function Report({ handlerNotification }) {

  const bodyTable = [];
  const headerTable = [];
  const [report, setReport] = useState({});
  const [tickets, setTickets] = useState([]);
  const [type, setType] = useState('ticket/in');
  const [since, setSince] = useState(new Date().toISOString().split("T")[0]);
  const [to, setTo] = useState(new Date().toISOString().split("T")[0]);
  const parking = JSON.parse(localStorage.getItem('parking'));
  const token = sessionStorage.getItem('token');

  const handlerTicketIn = (ev) => {
    setType(ev.target.value);
  };

  const handlerTickerReport = async (ev) => {
    ev.preventDefault();
    const response = await fetch(`http://localhost:3000/api/v1/report/${type}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        auth: token,
      },
      body: JSON.stringify({
        since: since.replaceAll("-", "/") + " 00:00:00",
        to: to.replaceAll("-", "/") + " 23:59:59",
        id_parking: parking.ID_parking,
        name_parking: parking.nombre_comercial,
        address_parking: parking.address,
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

  const handlerExportPDF = async (ev) => {
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


  const handlerExportExcel = async (ev) => {
    console.log(ev.target.value);
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

  // fix unique key value
  if (tickets.length !== 0) {
    headerTable.push(
      <tr>
        {
          tickets.fields.map((f, index) => {
            return (<th key={index}>{f}</th>)
          })
        }
      </tr>
    );

    for (let row of tickets.body) {
      bodyTable.push(
        <tr>
          { row.map((v, index) => {
            return (<td key={index + 1}>{v}</td>);
          })}
        </tr>
      )
    }
  }
  

  return (
    <>
      <div className="Report--container">
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
        <div className="Report--body">
          <div className="Report--table">
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
          <div className="Report--type">
            <div>
              <input type="radio" name="report" id="ticket/in" value="ticket/in" checked={type === "ticket/in"} onChange={handlerTicketIn} />
              <label htmlFor="ticket/in">Ticket Ingresos</label>
            </div>
            <div>
              <input type="radio" name="report" id="ticket/out" value="ticket/out" checked={type === "ticket/out"} onChange={handlerTicketIn} />
              <label htmlFor="ticket/out">Ticket Salidas</label>
            </div>
            <div>
              <input type="radio" name="report" id="card/in" value="card/in" checked={type === "card/in"} onChange={handlerTicketIn} />
              <label htmlFor="card/in">Tarjetas Ingresos</label>
            </div>
            <div>
              <input type="radio" name="report" id="card/out" value="card/out" checked={type === "card/out"} onChange={handlerTicketIn} />
              <label htmlFor="card/out">Tarjetas Salidas</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};
