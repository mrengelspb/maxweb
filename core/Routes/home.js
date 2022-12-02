const express = require('express');
const home = express.Router();
const { dbmysql } = require('../Repository/DBMysql.js');
const AccountInteractor = require('../Application/AccountInteractor.js');

home.post('/', (req, res, next) => {
  const {userName, password} = req.body;
  const accountInteractor = new AccountInteractor();
  const response = accountInteractor.login({DB:dbmysql, userName, password});

  response.then(data => {
    const info = JSON.parse(JSON.stringify(data));
    if (info.length == 0) {
      res.status(404).send({message: "Account not Found !"});
    } else {
      res.status(200).send(info);
    }
  }).catch((err) => {
    res.status(404).send({ message: err.message });
  });
});

module.exports = home;
