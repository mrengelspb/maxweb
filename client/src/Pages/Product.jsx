import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const Product = ({ handlerNotification }) => {
  const [id, setId] = useState("");
  const [des, setDes] = useState("");
  const [cost, setCost] = useState("");
  const [token, setToken] = useState(sessionStorage.getItem("token"));

  const handlerDes = (ev) => {
    setDes(ev.target.value);
  };
  const handlerCost = (ev) => {
    setCost(ev.target.value);
  };
  const handlerId = (ev) => {
    setId(ev.target.value);
  };
  
  const handlerCreateProduct = (ev) => {
    ev.preventDefault();
    fetch('http://localhost:3000/api/v1/producto', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        auth: token,
      },
      body: JSON.stringify({
        description: des,
        cost,
      }),
    })
      .then((response => response.json()))
      .then((res => console.log(res)))
      .catch((err) => {
        console.log(err);
      });
  }

  const handlerSearchProduct = (ev) => {
    ev.preventDefault();
    fetch(`http://localhost:3000/api/v1/producto/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        auth: token,
      },
    })
      .then((response => response.json()))
      .then((res => console.log(res)))
      .catch((err) => {
        console.log(err);
      });
  }

  if (!token) return (<Navigate to={PATH_LOGIN} />);
  return (
    <>
      <div className="product--container">
        <div className="product--register">
          <form onSubmit={handlerCreateProduct}>
            <input type="text" placeholder="Descripción" value={des} onChange={handlerDes}/>
            <input type="text" placeholder="Precio" value={cost} onChange={handlerCost}/>
            <button type="submit">Agregar Producto</button>
          </form>
        </div>
        <div className="product--search">
          <form onSubmit={handlerSearchProduct}>
            <input type="text" placeholder='Ingresar codigo del producto' value={id} onChange={handlerId}/>
            <button type='submit'>Buscar</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Product;
