import React from 'react';
import ReactDOM from 'react-dom/client';
import { ModalProvider } from "react-modal-hook";
import  Modal from 'react-modal';
import App from './App';
import './index.css';

Modal.setAppElement('#root');
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ModalProvider>
      <App/>
    </ModalProvider>
  </React.StrictMode>
);
