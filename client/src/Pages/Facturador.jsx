import React, { useEffect, useState, memo } from 'react';
import { Valentine } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Title from '../Components/Title';
import '../styles/facturador.css';

const Buscador = ({ ID, setID, client, setClient, addressI,
  setAddress, emailI, setEmail, phone, setPhone, today, setToday}) => {

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

  const handlerDate = (ev) => {
    setToday(ev.target.value);
  };

  const handlerSearchData = (ev) => {
    ev.preventDefault();
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
        console.log(response[0])
        setClient(`${first_last_name} ${second_last_name} ${first_name} ${second_name}`);
        setAddress(address);
        setEmail(email);
        setPhone(phone_number);
      })
      .catch((err) => console.log(err));
  };

  const handlerSave = (ev) => {
    ev.preventDefault();
    //guardar datos del usuario
  }

  return (
    <div className='buscador--container'>
        <Title text="Datos Personales" />
        <div>
          <div className="sliderContainer">
            <form onSubmit={handlerSearchData}>
              <div className="searchBarContainer">
                <input type="text" onChange={handlerId} placeholder="Ingresar Ruc o CI" />
                <button type="submit">Buscar</button>
                <input type="reset" value="Limpiar" />
              </div>
            </form>
            <form onSubmit={handlerSave}>
              <input id="date" placeholder="Fecha" value={today} onChange={handlerDate} type="date" />
              <input placeholder="Cliente" value={client} onChange={handlerClient} type="text" />
              <input placeholder="Dirrección" value={addressI} onChange={handlerAddress} type="text" />
              <input placeholder="Email" value={emailI} onChange={handlerEmail} type="email" />
              <input placeholder="Teléfono" value={phone} onChange={handlerPhone} type="text" />
              <button type="submit">Guardar</button>
            </form>
          </div>
        </div>
    </div>
  )
}

const SearchBar = ({car, setCar, handlerTable}) => {

  const [id, setId] = useState(0);

  const handlerProduct = (ev) => {
    setId(ev.target.value);
  };

  useEffect((ev) => {
    handlerTable();
  }, [car]);

  const handlerSearchProduct = (ev) => {
    
    ev.preventDefault();
    fetch(`http://localhost:3000/producto/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
          setCar([...car, res[0]]);
      })
      .catch((err) => {
        console.log({ message: err.message, err });
      });
  };


  return (
    <div className='searchbar--container'>
      <form onSubmit={handlerSearchProduct}>
        <label htmlFor="producto"></label>
        <input type="" id="producto" onChange={handlerProduct} placeholder='Ingresar Producto'/>
        <button type="submit">Agregar</button>
        <Link to="/producto/insertar">Crear Producto</Link>
      </form>
    </div>
  )
}

const Row = ({ item }) => {

  const [total, setTotal] = useState(0);
  const [cantidad, setCantidad] = useState(1);
  const [descuento, setDescuento] = useState(0);

  const handlerCantidad = (ev) => {
    setCantidad(ev.target.value);
    setTotal(total * cantidad);
  };

  const handlerDescuento = (ev) => {
    setDescuento(ev.target.value);
  };

  return (
    <div className='listproducts--row'>
      <div className="listproducts--item">{item[0]['nombre_producto/servicio']}</div>
      <div className="listproducts--item">
        <input type="number" className='item--cantidad' min="0" value={cantidad} onChange={handlerCantidad}/>
      </div>
      <div className="listproducts--item">{item[0].valor_unitario}</div>
      <div className="listproducts--item">
        <input type="number" className='item--descuento' value={descuento} onChange={handlerDescuento} min="0" />
      </div>
      <div className="listproducts--item">{item[0]['Porcentaje de IVA']}</div>
      <div className="listproducts--item">{item[0].valor_unitario * cantidad}</div>
    </div>
  )
};

const ListProducts = ({ car }) => {

  const list = [];

  for (const item of car) {
    const MemoRow = memo(Row);
    list.push(<MemoRow key={item[0].id_fe_infoProductos} item={item} />);
  }

  return (
    <div className="listproducts--container">
      <div className="listproducts--list">
        <div className="listproducts--header">
          <div className="listproducts--column">Descripcion</div>
          <div className="listproducts--column">Cantidad</div>
          <div className="listproducts--column">Valor Unitario</div>
          <div className="listproducts--column">Descuento</div>
          <div className="listproducts--column">Iva</div>
          <div className="listproducts--column">Total</div>
        </div>
        <div className="listproducts--body">
          {list}
        </div>
      </div>
    </div>
  )
}

const Productos = ({ car, setCar, handlerTable}) => {

  return(
    <div className='product--container'>
      <SearchBar car={car} setCar={setCar} handlerTable={handlerTable} />
      <ListProducts car={car}  />
    </div>
  )
};


const Control = ({ formaPago, setFormaPago }) => {

  const handlerFormaPago = (ev) => {
    setFormaPago(ev.target.value);
  };

  return (
    <div>
      <select id="pay" name="pay" value={formaPago} onChange={handlerFormaPago}>
                    <optgroup label="Forma de pago" />
                    <option value="cash">Efectivo</option>
                    <option value="electronic">Dinero electrónico</option>
                    <option value="credit">Tarjeta de crédito</option>
                    <option value="others">Otros</option>
                  </select>
      <button type="button">Emitir factura</button>
    </div>
  )
}

const Table = ({ subtotal, discounts }) => {
  return (
    <div className="table--container">
      <div className="tabla--row">Subtotal: {subtotal}</div>
      <div className="tabla--row">Descuento: {discounts}</div>
      <div className="tabla--row">Subtotal Neto: 0</div>
      <div className="tabla--row">Subtotal Con Impuestos: 0</div>
      <div className="tabla--row">Subtotal Sin Impuestos: 0</div>
      <div className="tabla--row">Subtotal No Objeto Iva: 0</div>
      <div className="tabla--row">Subtotal No Objeto Iva: 0</div>
      <div className="tabla--row">Subtotal Exento Iva: 0</div>
      <div className="tabla--row">Ice: 0</div>
      <div className="tabla--row">Iva 12%: 0</div>
      <div className="tabla--row">Propina: 0</div>
      <div className="tabla--row"><b>Valor Total: 0</b></div>
    </div>
  )
}

const CamposAdicionales = ({ formaPago, setFormaPago, subtotal, discounts}) => {
  return(
    <div className="camposadicionales--container">
      <Control formaPago={formaPago} setFormaPago={setFormaPago}/>
      <Table subtotal={subtotal} discounts={discounts}/>
    </div>
  )
}

const Facturador = () => {

  const [car, setCar] = useState([]);
  const [formaPago, setFormaPago] = useState();
  const [ID, setID] = useState('');
  const [client, setClient] = useState('');
  const [addressI, setAddress] = useState('');
  const [emailI, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  let [subtotal, setSubTotal] = useState(0);
  let [discounts, setDiscounts] = useState(0);
  const [today, setToday] = useState(new Date().toISOString().substring(0, 10));

  const handlerTable = () => {
    const body_container = document.getElementsByClassName('listproducts--body');
    const products = body_container[0].childNodes;
    let totalByItem = 0;
    let disc = 0;
    for (let i = 0; i < products.length; i++) {
      let value =  parseFloat(products[i].childNodes[5].textContent);
      totalByItem += value;
      disc += (value / (100 + parseFloat(products[i].childNodes[3].value)));
    }
    setSubTotal(totalByItem);
    setDiscounts(disc);
  };

  return (
    <>  
      <Header />
      <div className='facturador--container'>
        <Buscador ID={ID} setID={setID} client={client} setClient={setClient} addressI={addressI} setAddress={setAddress} emailI={emailI}
        setEmail={setEmail} phone={phone} setPhone={setPhone} today={today} setToday={setToday} />
        <hr />
        <Productos car={car} setCar={setCar} handlerTable={handlerTable}/>
        <hr />
        <CamposAdicionales formaPago={formaPago} setFormaPago={setFormaPago} subtotal={subtotal} discounts={discounts}/>
      </div>
    </>

  )
}

export default Facturador;
