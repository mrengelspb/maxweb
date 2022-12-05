const express = require('express');
const factura = express.Router();
const { dbmysql } = require('../data_providers/DBMysql.js');
const FacturaController = require('../interface/controller/facturaController.js');

factura.post('/factura_con_datos', (req, res, next) => {
  const { identification_number } = req.body;
  const facturaController = new FacturaController();
  const result = facturaController.getClientData(dbmysql, [identification_number]);
  result
    .then((response) => {
      res.status(200).send(JSON.parse(JSON.stringify(response[0])));
    })
    .catch((err) => {
      res.status(400).send({message: err.message}); 
    })

})

module.exports = factura;