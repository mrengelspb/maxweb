const express = require('express');
const { Login } = require('../../Use_Cases/LoginUser');
const entry_route = express.Router();
const { dbmysql } = require('../../data_providers/DBMysql.js');
const Admin = require('../../Use_Cases/Admin.js');
const Operator = require('../../Use_Cases/Operator.js');
const Supervisor = require('../../Use_Cases/Supervisor.js');
const { User } = require('../../Entities/User');

entry_route.get('/ingreso', (req, res, next) => {
  const {ID_ticket} = req.body;
  if (req.session.data) {
    let user = null;
    switch (req.session.data[0].level_access) {
      case "admin":
          user = new Admin();
        break;
      case "operator":
          user = new Operator();
        break;
      case "supervisor":
          user = new Supervisor();
        break;
    }
    const result = user.search(dbmysql, ID_ticket);
    result.then((data) => {
      res.send(JSON.parse(JSON.stringify(data[0])));
    });
  } else {
    res.send({message: "Please Sign Up !"});
  }
});


entry_route.put("/ingreso", (req, res, next) => {
  if (req.session.data) {
    const args = [
      req.body.in,
      req.body.out,
      req.body.total
    ]
    let user = null;
    switch (req.session.data[0].level_access) {
      case "admin":
          user = new Admin();
        break;
      case "operator":
          user = new Operator();
        break;
      case "supervisor":
          user = new Supervisor();
        break;
    }
    const result = user.finalize(dbmysql, args)
    result.then((data) => {
      res.send(JSON.parse(JSON.stringify(data[0])));
    }).catch((err) => {
      res.send({message: err.message});
    })
  } else {
    res.send({message: "Please Sign Up !"});
  }
});

module.exports = entry_route;
