import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Title from '../Components/Title';
import Form from '../Components/Form';
import Input from '../Components/Input';
import Modal from '../Components/Modal';
// import xml from '../xml.js';
import '../styles/operator.css';
import '../styles/action.css';

export default function Operador({
  state,
}) {
  return (
    <div>
      <ModalButton action="Finalizar" state={state} />
      <ModalButton action="Imprimir Ticket" />
      <ModalButton action="Imprimir Factura" />
    </div>
  );
}

Operador.propTypes = {
  state: PropTypes.object.isRequired,
};

function ModalButton({ action, state }) {
  const list = [];
  const [ID, setID] = useState();
  const [client, setClient] = useState();
  const [addressI, setAddress] = useState();
  const [emailI, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [formaPago, setFormaPago] = useState();
  const [car, setCar] = useState([]);
  const [id, setId] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [subTotal, setSubTotal] = useState(0);
  const [iva, setIva] = useState(0);
  const [total, setTotal] = useState(0);
  const [today, setToday] = useState(new Date().toISOString().substring(0, 10));

  useEffect(() => {
    const dateInput = document.getElementById('date');
    dateInput.value = today;
  }, []);

  useEffect(() => {
    let t = 0;
    /* Use array methods !!! */
    for (const item of car) {
      t += item[0].valor_unitario * item[1];
    }
    setSubTotal(t);
    setTotal(parseFloat(t * 1.12).toFixed(2));
    setIva(parseFloat((t * 1.12) - t).toFixed(2));
  }, [car]);

  const handlerDate = (ev) => {
    setToday(ev.target.value);
  };

  const handlerId = (ev) => {
    setID(ev.target.value);
  };

  const handlerClient = (ev) => {
    setClient(ev.target.value);
  };

  const handlerAddress = (ev) => {
    setAddress(ev.target.value);
  };

  const handlerEmail = (ev) => {
    setEmail(ev.target.value);
  };

  const handlerPhone = (ev) => {
    setPhone(ev.target.value);
  };

  const handlerFormaPago = (ev) => {
    setFormaPago(ev.target.value);
  };

  const handlerCantidad = (ev) => {
    setCantidad(ev.target.value);
  };

  const handlerSearchBarSlider = () => {
    const btnFinalClient = document.getElementsByClassName('btnFinalClient');
    btnFinalClient[0].classList.toggle('hidden');
    const sliderContainer = document.getElementsByClassName('sliderContainer');
    sliderContainer[0].classList.toggle('hidden');
  };

  const handlerOpenModal = (ev) => {
    const modal = ev.target.previousSibling;
    modal.classList.add('active');
  };

  const handlerEmitir = (ev) => {
    ev.preventDefault();

    fetch('http://localhost:3000/factura/emitir', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ambiente_codigo: state.Ambiente_Codigo,
        emision_codigo: state.Emision_codigo,
        numero_serie: state.serial_number,
        identification_number: ID,
        id_fe_emisoragret: state.id_fe_emisoragret,
        date: today,
        tipo_comprobante: "01",
      }),
    })
      .then((response) => response.json())
      .then((res) => console.log(res));
  };

  const handlerSearchData = () => {
    fetch('http://localhost:3000/factura_con_datos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identification_number: ID,
      }),
    }).then((response) => response.json())
      .then((response) => {
        const {
          first_last_name, second_last_name,
          first_name, second_name, address,
          email, phone_number,
        } = response[0];
        setClient(`${first_last_name} ${second_last_name} ${first_name} ${second_name}`);
        setAddress(address);
        setEmail(email);
        setPhone(phone_number);
      })
      .catch((err) => console.log(err));
  };

  const handlerSearch = (ev) => {
    ev.preventDefault();
    fetch(`http://localhost:3000/producto/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setCar([...car, [res[0], parseInt(cantidad)]]);
      })
      .catch((err) => {
        console.log({ message: err.message, err });
      });
  };

  const handlerProduct = (ev) => {
    setId(ev.target.value);
  };

  for (const item of car) {
    list.push(<li key={item[0].id_fe_listaProductos}>{item[0]['nombre_producto/servicio']}</li>);
  }

  if (action === 'Finalizar') {
    return (
      <>
        <Modal>

          <form onSubmit={handlerSearch}>
            <input type="number" placeholder="Id producto" onChange={handlerProduct} />
            <input type="number" value={cantidad} onChange={handlerCantidad} placeholder="Cantidad" />
            <button type="submit">Buscar</button>
            <ul>
              {list}
            </ul>
            <label>
              Sub Total:
              <input id="number" value={subTotal} onChange={() => {}} />
            </label>

            <label>
              Iva:
              <input id="number" value={iva} onChange={() => {}} />
            </label>

            <label>
              Total:
              <input id="number" value={total} onChange={() => {}} />
            </label>
          </form>

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
                <Input id="date" placeholder="Fecha" value={today} onChange={handlerDate} type="date" />
                <Input placeholder="Cliente" value={client} onChange={handlerClient} type="text" />
                <Input placeholder="Dirrección" value={addressI} onChange={handlerAddress} type="text" />
                <Input placeholder="Email" value={emailI} onClick={handlerEmail} type="email" />
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
                <button className="submit" type="submit">Emitir</button>
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
  state: PropTypes.object.isRequired,
};
