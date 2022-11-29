const express = require('express');
const login_route = express.Router();
const { dbmysql } = require('../../data_providers/DBMysql.js');
const Login = require('../../Use_Cases/LoginUser.js');

login_route.post('/', (req, res, next) => {
  const account = req.body;
  const login = new Login();
  const result = login.account(dbmysql, account);
  result.then(data => {
    req.session.data = JSON.parse(JSON.stringify(data[0]));
    res.send(JSON.parse(JSON.stringify(data[0])));
  }).catch((err) => {
    res.send({ message: err.message });
  });
});

module.exports = login_route;
