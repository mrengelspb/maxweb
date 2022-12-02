const express = require('express');
const login_route = express.Router();
const { dbmysql } = require('../data_providers/DBMysql.js');
const Login = require('../Use_Cases/LoginUser.js');

login_route.post('/', (req, res, next) => {
  const account = req.body;
  const login = new Login();
  const result = login.account(dbmysql, account);
  result.then(data => {
    const info = JSON.parse(JSON.stringify(data[0]));
    req.session.data = info;  
    if (info.length == 0) {
      res.status(404).send({message: "User not Found !"});
    } else {
      res.status(200).send(info);
    }
  }).catch((err) => {
    res.status(404).send({ message: err.message });
  });
});

module.exports = login_route;
