const express = require('express');
const boxController = express.Router();
const { dbmysql } = require('../data_providers/DBMysql.js');
const BoxInteractor = require('../Use_Cases/boxInteractor.js');
const jwt = require('jsonwebtoken');
const fs = require('fs');

boxController.use((req, res, next) => {
  const authHeader = req.headers["auth"];
  const token = authHeader;
  if (token == null) return res.sendStatus(403);
  const privateKey = fs.readFileSync('./token.txt');
  jwt.verify(token, privateKey, (err, user) => {
    if (err) return res.sendStatus(404);
    req.user = user;
    next();
  });
});

boxController.post('/api/v1/caja/registro/ingreso', async (req, res, next) => {
  const { cliente, sitio, valor_apertura, valor_sistema, valor_neto, fecha_apertura, _01C, _05C, _10C, _25C, _50C, _100C,
    _1B, _2B, _5B, _10B, _20B, _50B, _100B, nCheques, tCheques, type, id_operator } = req.body;

  const boxInteractor = new BoxInteractor();
  const result = await boxInteractor.createLog(dbmysql, [cliente, sitio, valor_apertura, valor_sistema,
    valor_neto, fecha_apertura, _01C, _05C, _10C, _25C, _50C,
    _100C, _1B, _2B, _5B, _10B, _20B, _50B, _100B, nCheques, tCheques, type, id_operator]);
  res.send(result);
});


boxController.post('/api/v1/caja/registro/actualizar', async (req, res, next) => {
  const { id_box, valor_cierre, valor_sistema, valor_neto, fecha_cierre, type } = req.body;

  const boxInteractor = new BoxInteractor();
  const result = await boxInteractor.updateLog(dbmysql, [id_box, valor_cierre, valor_sistema,
    fecha_cierre, valor_neto, type]);
  console.log(result);
  res.send(result);
})

module.exports = boxController;
