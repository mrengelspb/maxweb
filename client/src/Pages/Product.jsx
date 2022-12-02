import React, {useState} from 'react';
import Header from '../Components/Header';

const Product = () => {
  const [id, setId] = useState("");
  const [des, setDes] = useState("");
  const [cost, setCost] = useState("");

  const handlerDes = (ev) => {
    setDes(ev.target.value);
  }
  const handlerCost = (ev) => {
    setCost(ev.target.value);
  }

  const handlerId = (ev) => {
    setId(ev.target.value);
  }
  
  const handlerCreateProduct = (ev) => {
    ev.preventDefault();
    fetch('http://localhost:3000/producto', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: des,
        cost
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
    fetch(`http://localhost:3000/producto/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response => response.json()))
      .then((res => console.log(res)))
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Header></Header>
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
  )
}

export default Product;