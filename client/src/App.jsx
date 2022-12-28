import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Header from './Components/Header';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Operator from './Pages/Operator';
import Entry from './Pages/Entry';
import Product from './Pages/Product';
import Facturador from './Pages/Facturador';
import Notification from './Components/Notification';
import Caja from './Pages/Caja';
import './App.css';

function App() {
  const [state, setState] = useState({});
  const HOST = 'localhost';
  const PORT = 3000;
  const PATH_LOGIN = '/';
  const PATH_LOGIN_API = '/api/v1/login';

  const handlerNotification = (text, status, time) => {
    const notification = document.getElementById('notification');
    notification.classList.remove('notification--container__hidden');
    if (status === 200) {
      notification.classList.add('notification--container__green');
    } else if (status === 404) {
      notification.classList.add('notification--container__red');
    } else if (status === 403) {
      notification.classList.add('notification--container__orange');
    } else if (status === 500) {
      notification.classList.add('notification--container__yellow');
    }
    notification.classList.remove('notification--container__hidden');
    notification.textContent = text;
    setTimeout(() => {
      notification.classList.remove('notification--container__green');
      notification.classList.remove('notification--container__red');
      notification.classList.remove('notification--container__orange');
      notification.classList.remove('notification--container__yellow');
      notification.classList.add('notification--container__hidden');
    }, time);
  };

  return (
    <div className="App">
      <Notification />
      <BrowserRouter>
        <Header handlerNotification={handlerNotification} />
        <Routes>
          <Route exact path="/" element={<Login handlerNotification={handlerNotification} HOST={HOST} PORT={PORT} PATH_LOGIN={PATH_LOGIN} PATH_LOGIN_API={PATH_LOGIN_API} />} />
          <Route exact path="/admin" element={<Dashboard setState={setState} state={state} PATH_LOGIN={PATH_LOGIN} handlerNotification={handlerNotification} />} />
          <Route exact path="/operador" element={<Operator state={state} PATH_LOGIN={PATH_LOGIN} handlerNotification={handlerNotification} />} />
          <Route exact path="/ingreso" element={<Entry state={state} PATH_LOGIN={PATH_LOGIN} handlerNotification={handlerNotification} />} />
          <Route exact path="/producto" element={<Product PATH_LOGIN={PATH_LOGIN} handlerNotification={handlerNotification} />} />
          <Route exact path="/facturador" element={<Facturador state={state} PATH_LOGIN={PATH_LOGIN} handlerNotification={handlerNotification} />} />
          <Route exact path="/caja" element={<Caja state={state} handlerNotification={handlerNotification} />} />
          <Route path="*" element={<h1>Page No Found Error 404</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
