import React from 'react';
import Title from '../Components/Title';


const Buscador = ({ ID, setID, client, setClient, addressI,
  setAddress, emailI, setEmail, phone, setPhone, today, setToday, identType, setIdentType }) => {

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
    if (ev) {
      ev.preventDefault();
    }
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

  const handleKeyDown = (ev) => {
    if (ev.key == 'Enter') {
      handlerSearchData();
    }
  };

  const handlerIdentType = (ev) => {
    setIdentType(ev.target.value);
  }

  return (
    <div className='buscador--container'>
      <Title text="Datos Personales" />
      <div>
        <div className="sliderContainer">
          <form onSubmit={handlerSearchData}>
            <div className="searchBarContainer">
              <input type="text" onKeyDown={handleKeyDown} onChange={handlerId} placeholder="Ingresar Ruc o CI" />
              <select id="tipo_identificacion" value={identType} onChange={handlerIdentType}>I                <option value="04">RUC</option>
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
