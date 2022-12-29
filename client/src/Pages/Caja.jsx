import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import { Navigate } from 'react-router-dom';
import '../styles/caja.css';

function Caja({ state, handlerNotification}) {

  const [boxStatus, setBoxStatus] = useState(false);
  const parking = JSON.parse(localStorage.getItem('parking'));
  const token = sessionStorage.getItem('token');
  const [_totalBox, setTotalBox] = useState(0);
  const [box, setBox] = useState({
    '_01C': 0,
    '_05C': 0,
    '_10C': 0,
    '_25C': 0,
    '_50C': 0,
    '_100C': 0,
    '_1B': 0,
    '_2B': 0,
    '_5B': 0,
    '_10B': 0,
    '_20B': 0,
    '_50B': 0,
    '_100B': 0,
    '_numberCheques': 0,
    '_totalCheques': 0,
  });

  const handlerBox = (ev) => {
    box[ev.target.name] = parseInt(ev.target.value);
    setBox({...box});
  }

  useEffect(() => {
      const total01C = box['_01C'] * 0.01;
      const total05C = box['_05C'] * 0.05;
      const total10C = box['_10C'] * 0.10;
      const total25C = box['_25C'] * 0.25;
      const total50C = box['_50C'] * 0.50;
      const total100C = box['_100C'] * 1;
      const total1B = box['_1B'] * 1;
      const total2B = box['_2B'] * 2;
      const total5B = box['_5B'] * 5;
      const total10B = box['_10B'] * 10;
      const total20B = box['_20B'] * 20;
      const total50B = box['_50B'] * 50;
      const total100B = box['_100B'] * 100;
      const totalCheques = box['_totalCheques'];
      const sum = total01C + total05C + total10C + total25C + total50C + total100C
      + total1B + total2B +  total5B + total10B + total20B + total50B + total100B + totalCheques;
      setTotalBox(parseFloat(sum.toFixed(2)));
  }, [box]);

  const handlerOpeningBox = async (ev) => {
    ev.preventDefault();
    const response  = await fetch('http://localhost:3000/api/v1/caja/abrir', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        auth: token
      },
      body: JSON.stringify({
        cliente: parking.idOperador,
        sitio: parking.ID_parking,
        tipo: 'parking',
        valor_sistema: _totalBox,
        valor_ingresado: _totalBox,
        _01C: box['_01C'],
        _05C: box['_05C'],
        _10C: box['_10C'],
        _25C: box['_25C'],
        _50C: box['_50C'],
        _100C: box['_100C'],
        _1B: box['_1B'],
        _2B: box['_2B'],
        _5B: box['_5B'],
        _10B: box['_10B'],
        _20B: box['_20B'],
        _50B: box['_50B'],
        _100B: box['_100B'],
        nCheques: box['_numberCheques'],
        tCheques: box['_totalCheques'],
      }),
    });
    console.log(response);
    if (response.ok && response.status === 200) {
      const data = await response.json();
      handlerNotification(response.statusText, response.status, 2000);
      setBoxStatus(true);
      console.log(data);
    } else {
      handlerNotification(response.statusText, response.status, 2000);
    }

  }

  const handlerReset = (ev) => {
    setBox({
      '_01C': 0,
      '_05C': 0,
      '_10C': 0,
      '_25C': 0,
      '_50C': 0,
      '_100C': 0,
      '_1B': 0,
      '_2B': 0,
      '_5B': 0,
      '_10B': 0,
      '_20B': 0,
      '_50B': 0,
      '_100B': 0,
      '_numberCheques': 0,
      '_totalCheques': 0,
  
    });
  };

  if (!token) return (<Navigate to="/" />);
  if (boxStatus) return (<Navigate to="/ingreso" />);
  return (<>
    <Header handlerNotification={handlerNotification} />
    <div className="caja--container">
      <form className="caja--form" onSubmit={ handlerOpeningBox }>
        <label htmlFor="01C">
          01C: <input type="number" name="_01C" id="01C" value={box['_01C']} onChange={handlerBox} />
        </label>
        <br />
        <label htmlFor="05C">
          05C: <input type="number" name="_05C" id="05C" value={box['_05C']} onChange={handlerBox} />
        </label>
        <br />
        <label htmlFor="10C">
          10C: <input type="number" name="_10C" id="10C" value={box['_10C']} onChange={handlerBox} />
        </label>
        <br />
        <label htmlFor="25C">
          25C: <input type="number" name="_25C" id="25C" value={box['_25C']} onChange={handlerBox} />
        </label>
        <br />
        <label htmlFor="50C">
          50C: <input type="number" name="_50C" id="50C" value={box['_50C']} onChange={handlerBox} />
        </label>
        <br />
        <label htmlFor="100C">
          100C: <input type="number" name="_100C" id="100C" value={box['_100C']} onChange={handlerBox} />
        </label>
        <br />
        <label htmlFor="1B">
          1B: <input type="number" name="_1B" id="1B" value={box['_1B']} onChange={handlerBox} />
        </label>
        <br />
        <label htmlFor="2B">
          2B: <input type="number" name="_2B" id="2B" value={box['_2B']} onChange={handlerBox} />
        </label>
        <br />
        <label htmlFor="5B">
          5B: <input type="number" name="_5B" id="5B" value={box['_5B']} onChange={handlerBox} />
        </label>
        <br />
        <label htmlFor="10B">
          10B: <input type="number" name="_10B" id="10B" value={box['_10B']} onChange={handlerBox} />
        </label>
        <br />
        <label htmlFor="20B">
          20B: <input type="number" name="_20B" id="20B" value={box['_20B']} onChange={handlerBox} />
        </label>
        <br />
        <label htmlFor="50B">
          50B: <input type="number" name="_50B" id="50B" value={box['_50B']} onChange={handlerBox} />
        </label>
        <br />
        <label htmlFor="100B">
          100B: <input type="number" name="_100B" id="100B" value={box['_100B']} onChange={handlerBox} />
        </label>
        <br />
        <label htmlFor="nCheques">
          N. Cheques: <input type="number" name="_numberCheques" id="nCheques" value={box['_numberCheques']} onChange={handlerBox} />
        </label>
        <br />
        <label htmlFor="tCheques">
          Total en Cheques: <input type="number" name="_totalCheques" id="tCheques" value={box['_totalCheques']} onChange={handlerBox} />
        </label>
        <br />
        <label htmlFor="cTotal">
          Total Apertura Caja <input type="number" name="cTotal" id="cTotal" value={_totalBox} readOnly />
        </label>

        <div className="caja--actions">
          <input type="reset" value="Limpiar" onClick={handlerReset} />
          <button type="submit">Aperturar Caja</button>
        </div>
      </form>
    </div>
  </>)
};

export default Caja;
