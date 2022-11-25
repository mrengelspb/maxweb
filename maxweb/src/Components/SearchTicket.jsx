import React from 'react';
import { Search, Trash } from 'react-bootstrap-icons';

export default function SearchTicket() {
  return (
    <div>
      <form>
        <label htmlFor="ticket">
          Buscar Ticket:
          <input type="text" />
          <button type="button">
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
