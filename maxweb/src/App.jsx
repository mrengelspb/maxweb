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
import SignUp from './Components/signUp_context';
import './App.css';

function App() {
  const [authenticated, setAuthenticated] = useState(true);

  useEffect(() => {
    if (authenticated) {
      navigate('/admin');
    }
  }, []);

  return (
    <div className="App">
      <SignUp.Provider value={authenticated}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Login value={authenticated} />} />
            <Route exact path="/admin" element={<Dashboard />} />
            <Route exact path="/operador" element={<Operator />} />
            <Route exact path="/ingreso" element={<Entry />} />
            <Route path="*" element={<h1>Page No Found Error 404</h1>} />
          </Routes>
        </BrowserRouter>
      </SignUp.Provider>
    </div>
  );
}

export default App;
