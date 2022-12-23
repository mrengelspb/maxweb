const express = require('express');
const { Login } = require('../Use_Cases/Login');
const entryController = express.Router();
const { dbmysql } = require('../data_providers/DBMysql.js');
const Admin = require('../Use_Cases/Admin.js');
const Operator = require('../Use_Cases/Operator.js');
const Supervisor = require('../Use_Cases/Supervisor.js');
const User = require('../Entities/User');
const Tariff = require('../Tariff');
const fs = require('fs');
const jwt = require('jsonwebtoken');

entryController.use((req, res, next) => {
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

entryController.post('/api/v1/ticket/:id', async (req, res, next) => {
  const { id } = req.params;
  const { ID_parking, typeTariff } = req.body;

  let user = new Admin();
  const response =  await user.search(dbmysql, id);

  console.log(response);
  const data = JSON.parse(JSON.stringify(response[0]));

  if (data.length === 0) {
    res.status(404).send();
  } else {
    let total;

    const start = new Date(data[0].in);
    data[0].in = start.toLocaleString();
    const end = new Date();
    data[0].out = end.toLocaleString();

    let time = Math.round(((end - start)/1000)/60);
    const tariff = new Tariff(dbmysql, ID_parking)

    let uploadTariffs = await tariff.uploadTariffs();
    
    if (uploadTariffs) {
      total = tariff.calculateTotal(time, typeTariff);
    } else {
      console.log("Error cargando tarifas...!")
    }

    res.status(200).send({ ...data[0], time, total });
  }
});


entryController.put("/api/v1/ticket/ingreso", (req, res, next) => {
    const args = [
      req.body.ID_ticket,
      new Date(req.body.out).toISOString().replace("T", " ").split(".")[0],
      req.body.state,
      req.body.min_used,
      req.body.total,
    ]
    let user = new Admin();
    const result = user.finalize(dbmysql, args)
    result.then((data) => {
      res.status(200).send(JSON.parse(JSON.stringify(data)));
    }).catch((err) => {
      res.status(404).send({err, message: err.message});
    })
});

module.exports = entryController;
