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

boxController.post('/api/v1/caja/abrir', async (req, res, next) => {
  const { cliente, sitio, tipo, valor_sistema, valor_ingresado, _01C, _05C, _10C, _25C, _50C, _100C,
    _1B, _2B, _5B, _10B, _20B, _50B, _100B, nCheques, tCheques } = req.body;

  const boxInteractor = new BoxInteractor();
  const result = await boxInteractor.createLog(dbmysql, [cliente, sitio, tipo, valor_sistema, valor_ingresado, _01C, _05C, _10C, _25C, _50C,
    _100C, _1B, _2B, _5B, _10B, _20B, _50B, _100B, nCheques, tCheques]);
  res.send(result);
});

module.exports = boxController;
