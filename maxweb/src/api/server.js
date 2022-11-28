const { DBMysql } = require('./data_provider/DBMysql.js');
const { Login } = require('./Use_Cases/LoginUser.js');
const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
const dbmysql = new DBMysql({
  host: process.env.HOST_DB,
  user: process.env.USER_DB,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.PORT_DB,
})

app.post("/", (req, res) => {
  const account = req.body;
  const login = new Login();
  login.account(dbmysql, account, res);
});

app.post("/ingreso", () => {

});

app.post("/admin", (req, res) => {
  
});

app.post("/operador", (req, res) => {

});

app.listen(process.env.PORT, () => {
  console.log(`Server listen in port ${process.env.PORT}`);
});