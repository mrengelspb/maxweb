import React, {useState} from 'react';
import '../styles/modal.css';


function Modal({children}) {
  const handlerCloseModal = (ev) => {
    const modal = ev.target.parentNode.parentNode;
    modal.classList.remove('active');
  }

  return (
    <div className="modal">
      <div className="modal--container">
        <button className="close" type="button" onClick={handlerCloseModal}>Close</button>
       {children}
      </div>
    </div>
  )
}
export default Modal;