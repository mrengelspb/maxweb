const express = require('express');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const login_route = express.Router();
const { dbmysql } = require('../data_providers/DBMysql.js');
const Login = require('../Use_Cases/LoginUser.js');
const fs = require('fs');

login_route.post('/', (req, res, next) => {
  const account = req.body;
  const login = new Login();
  const result = login.account(dbmysql, account);
  result.then(data => {
    const info = JSON.parse(JSON.stringify(data[0]));
    if (info.length == 0) {
      res.status(404).send({message: "User not Found !"});
    } else {
      jwt.sign({id: info.ID_operador}, "MateoRengelSolucionesPlanB", (err, token) => {
        if (err) {
          res.status(400).send({msg : 'Error'});
        } else {
          res.send({token: token});
        }
      });
    }
  }).catch((err) => {
    res.status(404).send({ message: err.message });
  });
});

module.exports = login_route;
