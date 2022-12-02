import React, {useState} from 'react';
import Header from '../Components/Header';
import SearchTicket from '../Components/SearchTicket';
import Clock from '../Components/Clock';
import TrafficLight from '../Components/TrafficLight';
import SearchTicketForm from '../Components/SearchTicketForm';
import AvailableParkings from '../Components/AvailableParkings';
import '../styles/entry.css';

export default function Entry() {
  const [data, setData] = useState(null);

  return (
    <>
      <Header />
      <div className="entry">
        <div className="entry--info">
          <SearchTicket setData={setData} />
          <Clock />
        </div>
        <div className="entry--data">
          <TrafficLight />
          <SearchTicketForm data={data} />
          <AvailableParkings />
        </div>
      </div>
    </>
  );
}
