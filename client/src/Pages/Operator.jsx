import React from 'react';
import PropTypes from 'prop-types';
import Title from '../Components/Title';
import Form from '../Components/Form';
import Input from '../Components/Input';
import Modal from '../Components/Modal';
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
  function handleSearchBarSlider() {
    const searchBarContainer = document.getElementsByClassName('searchBarContainer');
    const btnFinalClient = document.getElementsByClassName('btnFinalClient');
    searchBarContainer[0].classList.toggle('hidden');
    btnFinalClient[0].classList.toggle('hidden');
    if (searchBarContainer[0].classList.contains('hidden')) {
      const searchSliderContainer = document.getElementsByClassName('sliderContainer');
      searchSliderContainer[0].classList.add('hidden');
    }
  }

  const handleSliderContainer = () => {
    const searchSliderContainer = document.getElementsByClassName('sliderContainer');
    searchSliderContainer[0].classList.toggle('hidden');
  }

  const handlerOpenModal = (ev) => {
    const modal = ev.target.previousSibling;  
    modal.classList.add('active')
  }

    if (action === 'Finalizar') {
      return (
        <>
          <Modal>
            <Form>
              <Title text="Finalizar Operación" />
              <div>
                <button type="button" onClick={(ev) => handleSearchBarSlider(ev)}>Factura con Datos</button>
                <div className="searchBarContainer hidden">
                  <input type="text" placeholder="Ingresar Ruc o CI" />
                  <button type="button" onClick={(ev) => handleSliderContainer(ev)}>Buscar</button>
                  <input type="reset" value="Limpiar" />
                </div>
                <div className="sliderContainer hidden">
                  <Input placeholder="Fecha" type="date" />
                  <Input placeholder="Cliente" type="text" />
                  <Input placeholder="Dirrección" type="text" />
                  <Input placeholder="Email" type="email" />
                  <Input placeholder="Teléfono" type="text" />  
                  <label htmlFor="pay">
                    Eligue una forma de pago:
                    <select id="pay" name="pay">
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
