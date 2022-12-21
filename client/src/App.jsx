import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Operator from './Pages/Operator';
import Entry from './Pages/Entry';
import Product from './Pages/Product';
import Facturador from './Pages/Facturador';
import Notification from './Components/Notification';
import './App.css';

function App() {
  const [state, setState] = useState({});

  const handlerNotification = (text, status, time) => {
    const notification = document.getElementById('notification');
    notification.classList.remove('notification--container__hidden');
    if (status === 200) {
      notification.classList.add('notification--container__green');
    } else if (status === 404) {
      notification.classList.add('notification--container__red');
    }
    notification.classList.remove('notification--container__hidden');
    notification.textContent = text;
    setTimeout(() => {
      notification.classList.remove('notification--container__green');
      notification.classList.remove('notification--container__red');
      notification.classList.add('notification--container__hidden');
    }, time);
  };

  return (
    <div className="App">
      <Notification />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login handlerNotification={handlerNotification} />} />
          <Route exact path="/admin" element={<Dashboard setState={setState} state={state} />} />
          <Route exact path="/operador" element={<Operator state={state} />} />
          <Route exact path="/ingreso" element={<Entry />} />
          <Route exact path="/producto" element={<Product />} />
          <Route exact path="/facturador" element={<Facturador state={state} />} />
          <Route path="*" element={<h1>Page No Found Error 404</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
