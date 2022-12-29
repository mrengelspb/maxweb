import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const SearchBar = ({car, setCar, handlerTable, handlerNotification}) => {
  const [id, setId] = useState(0);
  const token = sessionStorage.getItem('token');

  const handlerProduct = (ev) => {
    setId(ev.target.value);
  };

  useEffect((ev) => {
    handlerTable();
  }, [car]);

  const handlerSearchProduct = async (ev) => {
    ev.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/v1/producto/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          auth: token,
        },
      });

      if (response.ok && response.status === 200) {
        let data = await response.json();
        data = data[0];
        data.cantidad = 1;
        data.descuento = 0;
        data.total = 1 * data.valor_unitario;
        console.log(data);
        setCar([...car, data]);
        handlerNotification(response.statusText, response.status, 2000);
      } else {
        handlerNotification(response.statusText, response.status, 2000);
      }
    } catch (err) {
      handlerNotification(err.message, 500, 2000);
    }
  };
  
  return (
    <div className='searchbar--container'>
      <form onSubmit={handlerSearchProduct}>
        <label htmlFor="producto"></label>
        <input type="number" id="producto" onChange={handlerProduct} placeholder='Ingresar Producto'/>
        <button type="submit">Agregar</button>
        <Link to="/producto/insertar">Crear Producto</Link>
      </form>
    </div>
  )
}

export default SearchBar;