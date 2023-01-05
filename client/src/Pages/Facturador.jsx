import React, { useState } from 'react';
import Header from '../Components/Header';
import Buscador from '../Components/Buscador';
import Productos from '../Components/Productos';
import CamposAdicionales from '../Components/CamposAdicionales';
import '../styles/facturador.css';
import { Navigate } from 'react-router-dom';

const Facturador = ({ state, PATH_LOGIN, handlerNotification }) => {

  const [car, setCar] = useState([]);
  const [formaPago, setFormaPago] = useState('01');
  const [ID, setID] = useState('');
  const [client, setClient] = useState('');
  const [addressI, setAddress] = useState('');
  const [emailI, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [total, setTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [subTotalNeto, setSubTotalNeto] = useState(0);
  const [subTotalConImpuestos, setSubTotalConImpuestos] = useState(0);
  const [subTotalSinImpuestos, setSubTotalSinImpuestos] = useState(0);
  const [subTotalNoObjetoIva, setSubTotalNoObjetoIva] = useState(0);
  const [subTotalExcentoIva, setSubTotalExcentoIva] = useState(0);
  const [propina, setPropina] = useState(0);
  const [ice, setIce] = useState(0);
  const [iva, setIva] = useState(0);
  const [discounts, setDiscounts] = useState(0);
  const [today, setToday] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState(0);
  const [timeLimit, setTimeLimit] = useState('Dias');
  const [identType, setIdentType] = useState('04');
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [emit, setEmit] = useState(false);
  const parking = JSON.parse(localStorage.getItem('parking'));

  const handlerTable = () => { 
    let totalByItem = 0;
    let disc = 0;
    for (let i = 0; i < car.length; i++) {
      disc += (car[i].total * car[i].descuento) / 100;
      totalByItem += car[i].total;
    }
    setSubTotal(parseFloat(totalByItem - disc).toFixed(2));
    setDiscounts(parseFloat(disc).toFixed(2));
    setSubTotalNeto(parseFloat(totalByItem - disc).toFixed(2));
    setSubTotalConImpuestos(parseFloat((totalByItem - disc) + ((totalByItem - disc) * 12 / 100)).toFixed(2));
    setSubTotalSinImpuestos(totalByItem);
    setIva(parseFloat((totalByItem - disc) * 12 / 100).toFixed(2));
    setTotal(parseFloat((totalByItem - disc) + ((totalByItem - disc) * 12 / 100)).toFixed(2));
  };

  const handlerTime = (ev) => {
    setTime(ev.target.value);
  };

  const handlerTimeLimit = (ev) => {
    setTimeLimit(ev.target.value);
  };

  const handlerPropina = (ev) => {
    setPropina(ev.target.value);
  };

  const handlerEmitir = async (ev) => {
    console.log(identType);
    ev.preventDefault();
    const a_today = today.split("-"); 
    const response = await fetch('http://localhost:3000/api/v1/factura/emision', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        auth: token
      },
      body: JSON.stringify({
        ambiente_codigo: parking.Ambiente_Codigo,
        emision_codigo: parking.Emision_codigo,
        numero_serie: parking.serial_number,
        identification_number: parking.numero_RUC,
        id_fe_emisoragret: parking.id_fe_emisoragret,
        dir_establecimiento_matriz: parking.dir_establecimiento_matriz,
        contribuyente_especial: parking.contribuyente_especial,
        obligado_a_llevar_contabilidad: parking.obligado_a_llevar_contabilidad,
        numero_RUC: parking.numero_RUC,
        razon_social: parking.razon_social,
        comercial_name: parking.nombre_comercial,
        codigo_punto_emision: parking.codigo_punto_emision,
        address: parking.address,
        codDoc: formaPago,
        estab: parking.estab,
        date: `${a_today[2]}/${a_today[1]}/${a_today[0]}`,
        tipo_comprobante: '01',
        lista_productos: car,
        total,
        subTotal,
        subTotalNeto,
        subTotalConImpuestos,
        subTotalSinImpuestos,
        subTotalNoObjetoIva,
        subTotalExcentoIva,
        propina,
        ice,
        iva,
        discounts,
        ID,
        client,
        emailI,
        addressI,
        phone,
        formaPago,
        time,
        timeLimit,
        identType
      }),
    });

      if (response.status == 200) {
        const data = await response.json();
        setEmit(true);
        console.log(data);
      }
  };

  if (emit) return (<Navigate to="/ingreso" />);
  if (!token) return (<Navigate to={PATH_LOGIN} />);
  return (
    <>  
      <Header handlerNotification={handlerNotification} />
      <div className='facturador--container'>
        <Buscador handlerNotification={handlerNotification} ID={ID} setID={setID} client={client} setClient={setClient} addressI={addressI} setAddress={setAddress} emailI={emailI}
        setEmail={setEmail} phone={phone} setPhone={setPhone} today={today} setToday={setToday} identType={identType} setIdentType={setIdentType}/>
        <hr />
        <Productos handlerNotification={handlerNotification} car={car} setCar={setCar} handlerTable={handlerTable}/>
        <hr />
        <CamposAdicionales time={time} timeLimit={timeLimit} handlerTime={handlerTime} handlerTimeLimit={handlerTimeLimit}
        handlerEmitir={handlerEmitir} formaPago={formaPago} setFormaPago={setFormaPago} subTotal={subTotal}
        discounts={discounts} subTotalNeto={subTotalNeto} subTotalConImpuestos={subTotalConImpuestos} 
        subTotalSinImpuestos={subTotalSinImpuestos} subTotalNoObjetoIva={subTotalNoObjetoIva} 
        subTotalExcentoIva={subTotalExcentoIva} propina={propina} handlerPropina={handlerPropina} ice={ice} iva={iva} total={total}/>
      </div>
    </>
  );
} 

export default Facturador;
