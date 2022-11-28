const e = require('express');
const express = require('express');
const login_route = express.Router();
const { DBMysql } = require('../../data_provider/DBMysql.js');
const { Login } = require('../../Use_Cases/LoginUser.js');

const dbmysql = new DBMysql({
  host: process.env.HOST_DB,
  user: process.env.USER_DB,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.PORT_DB,
});

login_route.post('/', (req, res, next) => {
  const account = req.body;
  const login = new Login();
  const result = login.account(dbmysql, account);
  result.then(data => {
    res.send(JSON.parse(JSON.stringify(data[0])));
  });
  req.session.user_name = "Jose Luis";
});

module.exports = login_route;
