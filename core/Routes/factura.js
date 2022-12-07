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
  const { ambiente_codigo, emision_codigo, numero_serie,
    identification_number, id_fe_emisoragret, date, tipo_comprobante } = req.body;
  const factura = new Factura(ambiente_codigo, emision_codigo, numero_serie,
    identification_number, id_fe_emisoragret, date, tipo_comprobante);
  factura.getNumeroComprobante(dbmysql);
  const code = factura.generar_codigo();
  res.status(200).send(JSON.parse(JSON.stringify({
    code: code
  })));
});

module.exports = factura;