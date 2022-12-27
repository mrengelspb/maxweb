import React from 'react';
import '../styles/availableParkings.css';

export default function AvailableParkings() {
  const parking = JSON.parse(localStorage.getItem('parking'));
  return (
    <div className="availableParkings">
      <p>Parqueos Disponibles</p>
      <span className="availableParkings--counter">{parking.total_places}</span>
    </div>
  );
}
