const express = require('express');
const { Login } = require('../../Aplication/Login');
const entry_route = express.Router();
const { dbmysql } = require('../../Infrastructure/DBMysql.js');
const Admin = require('../../Aplication/Admin.js');
const Operator = require('../../Aplication/Operator.js');
const Supervisor = require('../../Aplication/Supervisor.js');
const { User } = require('../../Entities/User');

entry_route.post('/ingreso', (req, res, next) => {
  const {ID_ticket} = req.body;
    let user = new Admin();
    const result = user.search(dbmysql, ID_ticket);
    result.then((data) => {
      res.send(JSON.parse(JSON.stringify(data[0])));
    });
});


entry_route.put("/ingreso", (req, res, next) => {
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
