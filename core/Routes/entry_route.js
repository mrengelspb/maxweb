const express = require('express');
const { Login } = require('../Use_Cases/Login');
const entry_route = express.Router();
const { dbmysql } = require('../data_providers/DBMysql.js');
const Admin = require('../Use_Cases/Admin.js');
const Operator = require('../Use_Cases/Operator.js');
const Supervisor = require('../Use_Cases/Supervisor.js');
const User = require('../Entities/User');
const Tariff = require('../Tariff');

entry_route.post('/api/v1/ticket/:id', async (req, res, next) => {
  const { id } = req.params;
  const { ID_parking } = req.body;
  let user = new Admin();
  const response =  await user.search(dbmysql, id);
  const data = JSON.parse(JSON.stringify(response[0][0]));
  const start = new Date(data.in);
  const end = new Date();
  data.out = end.toISOString();

  let time = Math.round(((end - start)/1000)/60);
  const tariff = new Tariff(dbmysql, ID_parking)
  let uploadTariffs = await tariff.uploadTariffs();
  if (uploadTariffs) {
    var total =  tariff.calculateTotal(time, "diurna");
  } else {
    console.log("Error cargando tarifas...!")
  }

  if (data.length === 0) {
    res.status(404).send();
  } else {
    res.status(200).send({ ...data, time, total });
  }
});


entry_route.put("/api/v1/ticket/ingreso", (req, res, next) => {
    const args = [
      req.body.ID_ticket,
      req.body.out,
      req.body.total,
      req.body.state,
      req.body.min_used
    ]
    let user = new Admin();
    const result = user.finalize(dbmysql, args)
    result.then((data) => {
      res.send(JSON.parse(JSON.stringify(data)));
    }).catch((err) => {
      res.send({message: err.message});
    })
});

module.exports = entry_route;
