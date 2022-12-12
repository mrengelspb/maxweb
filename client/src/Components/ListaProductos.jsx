import React, { useState, memo } from "react";

const Row = ({ item, handlerTable }) => {

  const [total, setTotal] = useState(0);
  const [cantidad, setCantidad] = useState(1);
  const [descuento, setDescuento] = useState(0);

  const handlerCantidad = (ev) => {
    setCantidad(ev.target.value);
    item.cantidad = ev.target.value;
    item.total = item.valor_unitario * item.cantidad;
    setTotal(total * item.cantidad || cantidad);
    handlerTable();
  };

  const handlerDescuento = (ev) => {
    setDescuento(ev.target.value);
    item.descuento = ev.target.value;
    handlerTable();
  };

  return (
    <div className='listproducts--row'>
      <div className="listproducts--item">{item['nombre_producto/servicio']}</div>
      <div className="listproducts--item">
        <input type="number" className='item--cantidad' min="0" value={item.cantidad || cantidad} onChange={handlerCantidad}/>
      </div>
      <div className="listproducts--item">{item.valor_unitario}</div>
      <div className="listproducts--item">
        <input type="number" className='item--descuento' value={item.descuento || descuento} onChange={handlerDescuento} min="0" />
      </div>
      <div className="listproducts--item">{item.valor_unitario * (item.cantidad || cantidad)}</div>
      <div className="listproducts--item">{item['Porcentaje de IVA']}</div>
    </div>
  )
};


const ListProducts = ({ car, handlerTable }) => {

  const list = [];

  for (const item of car) {
    const MemoRow = memo(Row);
    list.push(<MemoRow key={item.id_fe_infoProductos} item={item}
      handlerTable={handlerTable} />);
  }

  return (
    <div className="listproducts--container">
      <div className="listproducts--list">
        <div className="listproducts--header">
          <div className="listproducts--column">Descripcion</div>
          <div className="listproducts--column">Cantidad</div>
          <div className="listproducts--column">Valor Unitario</div>
          <div className="listproducts--column">Descuento</div>
          <div className="listproducts--column">Total</div>
          <div className="listproducts--column">Iva</div>
        </div>
        <div className="listproducts--body">
          {list}
        </div>
      </div>
    </div>
  )
}

export default ListProducts;
