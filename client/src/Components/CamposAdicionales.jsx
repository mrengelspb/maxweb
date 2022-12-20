import React from 'react';

const Control = ({propina, handlerPropina, time, timeLimit, handlerTime, handlerTimeLimit,
  formaPago, setFormaPago, handlerEmitir }) => {
  
  
  const handlerFormaPago = (ev) => {
    setFormaPago(ev.target.value);
  };

  return (
    <div>
      <select id="pay" name="pay" value={formaPago} onChange={handlerFormaPago}>
        <optgroup label="Forma de pago" />
        <option value="01">FACTURA</option>
        <option value="03">LIQUIDACIÓN DE COMPRA DE BIENES Y PRESTACIÓN DE SERVICIOS</option>
        <option value="04">NOTA DE CRÉDITO</option>
        <option value="05">NOTA DE DÉBITO</option>
        <option value="05">NOTA DE DÉBITO</option>
        <option value="06">GUÍA DE REMISIÓN</option>
        <option value="07">COMPROBANTE DE RETENCIÓN</option>
      </select>
      <input type="number" min="0" value={time} onChange={handlerTime}/>
      <select ip="timelimit" value={timeLimit} onChange={handlerTimeLimit}>
        <option value="dias">Dias</option>
        <option value="meses">Meses</option>
        <option value="años">Años</option>
      </select>
      <label name="propina" id="propina">
        <input type="number" name="propina" id="propina" value={propina} onChange={handlerPropina}/>
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

const CamposAdicionales = ({propina, handlerPropina, time, timeLimit, handlerTime, handlerTimeLimit, handlerEmitir, formaPago, setFormaPago, subTotal, discounts,
  subTotalNeto, subTotalSinImpuestos, subTotalConImpuestos, subTotalNoObjetoIva, subTotalExcentoIva, ice, iva, total }) => {
  return (
    <div className="camposadicionales--container">
      <Control time={time} timeLimit={timeLimit} handlerTime={handlerTime} handlerTimeLimit={handlerTimeLimit}
        formaPago={formaPago} setFormaPago={setFormaPago} handlerEmitir={handlerEmitir} propina={propina} handlerPropina={handlerPropina} />
      <Table subTotal={subTotal} discounts={discounts} subTotalNeto={subTotalNeto} subTotalConImpuestos={subTotalConImpuestos}
      subTotalSinImpuestos={subTotalSinImpuestos} subTotalNoObjetoIva={subTotalNoObjetoIva}
      subTotalExcentoIva={subTotalExcentoIva} propina={propina} ice={ice} iva={iva} total={total} />
    </div>
  )
}

export default CamposAdicionales;
