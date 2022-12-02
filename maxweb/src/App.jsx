import React from 'react';
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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/admin" element={<Dashboard />} />
          <Route exact path="/operador" element={<Operator />} />
          <Route exact path="/ingreso" element={<Entry />} />
          <Route path="*" element={<h1>Page No Found Error 404</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
