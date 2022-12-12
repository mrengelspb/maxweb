import React from 'react';
import ListProducts from './ListaProductos';
import SearchBar from './SearchBar';

const Productos = ({ car, setCar, handlerTable }) => {

  return (
    <div className='product--container'>
      <SearchBar car={car} setCar={setCar} handlerTable={handlerTable} />
      <ListProducts car={car} handlerTable={handlerTable} />
    </div>
  )
};

export default Productos;