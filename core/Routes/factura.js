const express = require('express');
const factura = express.Router();
const { dbmysql } = require('../data_providers/DBMysql.js');
const FacturaController = require('../interface/controller/facturaController.js');
const Factura = require('../Entities/Factura.js');
require('dotenv').config();

factura.get("/factura/consultas", (req, res, next) => {
  const query = dbmysql.query('CALL pa_fe_consultas(?, ?)', [1, process.env.RUC]);
  query.then((response) => {
      res.status(200).send(JSON.parse(JSON.stringify(response)));
  })
  .catch((err) => {
      console.error(err);
  })
});

factura.post('/factura_con_datos', (req, res, next) => {
  const { identification_number } = req.body;
  const facturaController = new FacturaController();
  const result = facturaController.getClientData(dbmysql, [identification_number]);
  result
    .then((response) => {
      res.status(200).send(JSON.parse(JSON.stringify(response[0])));
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({message: err.message}); 
    })
})

factura.post('/factura/emitir', (req, res, next) => {
  let code = "";
  const { ambiente_codigo, emision_codigo, numero_serie,
    identification_number, id_fe_emisoragret, date, tipo_comprobante, razon_social } = req.body;
  const factura = new Factura(ambiente_codigo, emision_codigo, numero_serie,
    identification_number, id_fe_emisoragret, date, tipo_comprobante);
  const query = factura.getNumeroComprobante(dbmysql);
  query
    .then((response) => {
      response = JSON.parse(JSON.stringify(response[0][0]));
      code = factura.generar_codigo(response.state);
      const zeroPad = (num, places) => String(num).padStart(places, '0');
      console.log(parseInt(response.state) + 1);
      const result = dbmysql.query('CALL pa_lsri_insertFactura(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
      [tipo_comprobante, ambiente_codigo, numero_serie, emision_codigo, code.slice(-1), 11223344,
      date, 0, 0, 0, 0, 0, date, identification_number, razon_social, zeroPad(parseInt(response.state) + 1, 9), 0,
      id_fe_emisoragret]);
      result
        .then((r) => {
          res.status(200).send(JSON.parse(JSON.stringify({
            code: code,
            state: r
          })));
        })
        .catch((err) => {
          console.log({err: err.message, err});
        })
   })
    .catch((err) => { err.message, err}); 
});

module.exports = factura;