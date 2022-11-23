import React, { Component } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Operador from './Pages/Operador';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/admin" element={<Dashboard />} />
            <Route exact path="/operador" element={<Operador />} />
            <Route path="*" element={<h1>Page No Found Error 404</h1>} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
