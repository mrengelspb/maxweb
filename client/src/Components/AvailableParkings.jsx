import React, { useEffect } from 'react';
import '../styles/availableParkings.css';

export default function AvailableParkings({ places, handlerAvaliablePlace }) {

  useEffect(() => {
    const timer = setInterval(() => {
      handlerAvaliablePlace();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="availableParkings">
      <p>Parqueos Disponibles</p>
      <span className="availableParkings--counter">{places}</span>
    </div>
  );
}
