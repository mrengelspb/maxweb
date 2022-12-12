import React from 'react';

const Control = ({ formaPago, setFormaPago, handlerEmitir }) => {
  
  
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
      <label name="propina" id="propina">
        <input type="checkbox" name="propina" id="propina" />
         Propina del 10%
      </label>
      <button type="button" onClick={handlerEmitir}>Emitir factura</button>
    </div>
  )
}

const Table = ({ subTotal, discounts, subTotalNeto, subTotalSinImpuestos,
  subTotalConImpuestos, subTotalNoObjetoIva, subTotalExcentoIva, propina, ice, iva, total}) => {
  return (
    <div className="table--container">
      <div className="tabla--row">Subtotal: {subTotal}</div>
      <div className="tabla--row">Descuento: {discounts}</div>
      <div className="tabla--row">Subtotal Neto: {subTotalNeto}</div>
      <div className="tabla--row">Subtotal Con Impuestos: {subTotalConImpuestos}</div>
      <div className="tabla--row">Subtotal Sin Impuestos: {subTotalSinImpuestos}</div>
      <div className="tabla--row">Subtotal No Objeto Iva: {subTotalNoObjetoIva}</div>
      <div className="tabla--row">Subtotal Exento Iva: {subTotalExcentoIva}</div>
      <div className="tabla--row">Ice: {ice}</div>
      <div className="tabla--row">Iva 12%: {iva}</div>
      <div className="tabla--row">Propina: {propina}</div>
      <div className="tabla--row"><b>Valor Total: {total}</b></div>
    </div>
  )
}

const CamposAdicionales = ({ handlerEmitir, formaPago, setFormaPago, subTotal, discounts,
  subTotalNeto, subTotalSinImpuestos, subTotalConImpuestos, subTotalNoObjetoIva, subTotalExcentoIva, propina, ice, iva, total }) => {
  return (
    <div className="camposadicionales--container">
      <Control formaPago={formaPago} setFormaPago={setFormaPago} handlerEmitir={handlerEmitir} />
      <Table subTotal={subTotal} discounts={discounts} subTotalNeto={subTotalNeto} subTotalConImpuestos={subTotalConImpuestos}
      subTotalSinImpuestos={subTotalSinImpuestos} subTotalNoObjetoIva={subTotalNoObjetoIva}
      subTotalExcentoIva={subTotalExcentoIva} propina={propina} ice={ice} iva={iva} total={total} />
    </div>
  )
}

export default CamposAdicionales;
