import React from 'react';
import Header from '../Components/Header';
import SearchTicket from '../Components/SearchTicket';
import Clock from '../Components/Clock';
import TrafficLight from '../Components/TrafficLight';
import SearchTicketForm from '../Components/SearchTicketForm';
import AvailableParkings from '../Components/AvailableParkings';
import '../styles/entry.css';

export default function Entry() {
  return (
    <>
      <Header />
      <div className="entry">
        <div className="entry--info">
          <SearchTicket />
          <Clock />
        </div>
        <div className="entry--data">
          <TrafficLight />
          <SearchTicketForm />
          <AvailableParkings />
        </div>
        <button className="entry--button" type="button">Finalizar</button>
      </div>
    </>
  );
}
