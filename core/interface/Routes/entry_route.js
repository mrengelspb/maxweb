const express = require('express');
const { Login } = require('../../Use_Cases/LoginUser');
const entry_route = express.Router();
const { dbmysql } = require('../../data_providers/DBMysql.js');
const Admin = require('../../Use_Cases/Admin.js');
const Operator = require('../../Use_Cases/Operator.js');
const Supervisor = require('../../Use_Cases/Supervisor.js');
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
