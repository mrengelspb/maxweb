import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Operator from './Pages/Operator';
import Entry from './Pages/Entry';
import './App.css';
import Product from './Pages/Product';

function App() {
  const [state, setState] = useState({});
  useEffect(() => {
    fetch('http://localhost:3000/factura/consultas')
      .then((response) => response.json())
      .then((response) => {
        setState(response[0][0]);
        console.log(response[0][0]);
      })
      .catch((err) => {
        console.log({ message: err.message, err });
      });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/admin" element={<Dashboard />} />
          <Route exact path="/operador" element={<Operator state={state} />} />
          <Route exact path="/ingreso" element={<Entry />} />
          <Route exact path="/producto" element={<Product />} />
          <Route path="*" element={<h1>Page No Found Error 404</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
