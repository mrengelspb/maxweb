import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

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
        res = res[0][0];
        res.cantidad = 1;
        res.descuento = 0;
        res.total = 1 * res.valor_unitario;
          setCar([...car, res]);
      })
      .catch((err) => {
        console.log({ message: err.message, err });
      });
    
    return false;
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

export default SearchBar;