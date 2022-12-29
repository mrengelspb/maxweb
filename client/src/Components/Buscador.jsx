import React from 'react';
import Title from '../Components/Title';


const Buscador = ({ handlerNotification, ID, setID, client, setClient, addressI,
  setAddress, emailI, setEmail, phone, setPhone, today, setToday, identType, setIdentType }) => {

  const token = sessionStorage.getItem('token');

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

  const handlerSearchData = async (ev) => {
    if (ev) {
      ev.preventDefault();
    }
    const response = await fetch('http://localhost:3000/api/v1/factura/datos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        auth: token,
      },
      body: JSON.stringify({
        identification_number: ID,
      }),
    });

    if (response.ok && response.status == 200) {
      const data = await response.json();
      const {
        first_last_name, second_last_name,
        first_name, second_name, address,
        email, phone_number,
      } = data[0];
        
      setClient(`${first_last_name} ${second_last_name} ${first_name} ${second_name}`);
      setAddress(address);
      setEmail(email);
      setPhone(phone_number);
      handlerNotification(response.statusText, response.status, 2000);
    } else {
      handlerNotification(response.statusText, response.status, 2000);
    }
  }

  const handlerSave = (ev) => {
    ev.preventDefault();
    //guardar datos del usuario
  };

  const handleKeyDown = (ev) => {
    if (ev.key == 'Enter') {
      handlerSearchData();
    }
  };

  const handlerIdentType = (ev) => {
    console.log(ev.target.value);
    setIdentType(ev.target.value);
  };

  return (
    <div className='buscador--container'>
      <Title text="Datos Personales" />
      <div>
        <div className="sliderContainer">
          <form onSubmit={handlerSearchData}>
            <div className="searchBarContainer">
              <input type="text" onKeyDown={handleKeyDown} onChange={handlerId} placeholder="Ingresar Ruc o CI" />
              <select id="tipo_identificacion" value={identType} onChange={handlerIdentType}>I                <option value="04">RUC</option>
                <option value="04">RUC</option>
                <option value="05">CEDULA</option>
                <option value="06">PASAPORTE</option>
                <option value="07">VENTACONSFINAL</option>
                <option value="08">IDENTEXTERIOR</option>
              </select>
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

export default Buscador;
