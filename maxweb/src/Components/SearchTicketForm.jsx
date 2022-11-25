import React from 'react';
import '../styles/searchTicketForm.css';

export default function SearchTicketForm() {
  return (
    <form className="searchTicketForm">
      <input type="text" placeholder="Ingreso" />
      <input type="text" placeholder="Salida" />
      <input type="text" placeholder="Tiempo" />
      <span>Total:</span>
      <span />
    </form>
  );
}
