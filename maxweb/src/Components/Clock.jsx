import React, { useState, useEffect } from 'react';
import '../styles/clock.css';

export default function Clock() {
  const [date, setDate] = useState(new Date());

  function refreshClock() {
    setDate(new Date());
  }

  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanUp() {
      clearInterval(timerId);
    };
  }, []);

  return (
    <div className="clock">
      {date.toLocaleTimeString()}
    </div>
  );
}
