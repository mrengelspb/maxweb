import React from 'react';
import '../styles/trafficLight.css';

export default function TrafficLight() {
  return (
    <div className="trafficLight">
      <p>Semáforo</p>
      <div className="circle circle__yellow" />
      <div className="circle circle__green" />
    </div>
  );
}
