import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Title from '../Components/Title';
import Form from '../Components/Form';
import Input from '../Components/Input';
import Modal from '../Components/Modal';
// import xml from '../xml.js';
import '../styles/operator.css';
import '../styles/action.css';


export default function Operador() {
  return (
    <div>
      <ModalButton action="Finalizar" />
      <ModalButton action="Imprimir Ticket" />
      <ModalButton action="Imprimir Factura" />
    </div>
  );
}

const ModalButton = ({ action }) => {

  const [ID, setID] = useState();
  const [client, setClient] = useState();
  const [address, setAddress] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [formaPago, setFormaPago] = useState();

  const handlerId = (ev) => {
    setID(ev.target.value);
  }

  const handlerClient = (ev) => {
    setClient(ev.target.value);
  }

  const handlerAddress = (ev) => {
    setAddress(ev.target.value);
  }

  const handlerEmail = (ev) => {
    setEmail(ev.target.value);
  }

  const handlerFormaPago = (ev) => {
    setFormaPago(ev.target.value);
  }
    
  const handlerSearchBarSlider = () => {
    const btnFinalClient = document.getElementsByClassName('btnFinalClient');
    btnFinalClient[0].classList.toggle('hidden');
    const sliderContainer = document.getElementsByClassName('sliderContainer');
    sliderContainer[0].classList.toggle('hidden');
  }

  const handlerOpenModal = (ev) => {
    const modal = ev.target.previousSibling;
    modal.classList.add('active');
  }

  const handlerEmitir = (ev) => {
    ev.preventDefault();
    fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/xml'
      },
      body: xml
    })
  }

  const handlerSearchData = (ev) => {
    fetch('http://localhost:3000/factura_con_datos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        identification_number: ID
      })
    }).then(response => response.json())
      .then((response) => {
        response = response[0]
        setClient(`${response.first_last_name} ${response.second_last_name} ${response.first_name} ${response.second_name}`);
        setAddress(response.address);
        setEmail(response.email);
        setPhone(response.phone_number);
        console.log(response)
      })
      .catch((err) => console.log(err));
  }

  if (action === 'Finalizar') {
    return (
      <>
        <Modal>
          <Form handlerSubmit={handlerEmitir}>
            <Title text="Finalizar Operación" />
            <div>
              <button type="button" onClick={(ev) => handlerSearchBarSlider(ev)}>Factura con Datos</button>
              <div className="sliderContainer hidden">
                <div className="searchBarContainer">
                  <input type="text" onChange={handlerId} placeholder="Ingresar Ruc o CI" />
                  <button type="button" onClick={handlerSearchData}>Buscar</button>
                  <input type="reset" value="Limpiar" />
                </div>
                <Input placeholder="Fecha" type="date" />
                <Input placeholder="Cliente" value={client} onChange={handlerClient} type="text" />
                <Input placeholder="Dirrección" value={address} onChange={handlerAddress} type="text" />
                <Input placeholder="Email" value={email} onClick={handlerEmail} type="email" />
                <Input placeholder="Teléfono" value={phone} onclick={handlerPhone} type="text" />  
                <label htmlFor="pay">
                  Eligue una forma de pago:
                  <select id="pay" name="pay" value={formaPago} onChange={handlerFormaPago}>
                    <optgroup label="Forma de pago" />
                    <option value="cash">Efectivo</option>
                    <option value="electronic">Dinero electrónico</option>
                    <option value="credit">Tarjeta de crédito</option>
                    <option value="others">Otros</option>
                  </select>
                </label>
                <button className="submit" type="button">Emitir</button>
              </div>
            </div>
            <button className="btnFinalClient" type="button">Consumidor Final</button>
          </Form>
        </Modal>
        <button className="action" type="button" onClick={handlerOpenModal}>{action}</button>
      </>
    );
  } if (action === 'Imprimir Ticket') {
    return (
      <>
        <Modal isOpen className="modal">
          <div>
            <h1>Imprimir Ticket</h1>
          </div>
        </Modal>
        <button className="action" type="button" onClick={handlerOpenModal}>{action}</button>
      </>
    );
  } if (action === 'Imprimir Factura') {
    return (
      <>
        <Modal isOpen className="modal">
          <div>
            <h1>Imprimir Factura</h1>
          </div>
        </Modal>
        <button className="action" type="button" onClick={handlerOpenModal}>{action}</button>
      </>
    );
  }
}

ModalButton.propTypes = {
  action: PropTypes.string.isRequired,
};
