const express = require('express');
const jwt = require('jsonwebtoken');
const sessionController = express.Router();
const { dbmysql } = require('../data_providers/DBMysql.js');
const Login = require('../Use_Cases/Login.js');
const TokenGenerator = require('uuid-token-generator');
const fs = require('fs');
const session = require('express-session');

sessionController.post('/api/v1/login', async (req, res, next) => {
  const account = req.body;
  const login = new Login();
  const user = await login.account(dbmysql, account);
  if (user === 404) {
    res.status(404).send({message: "User not Found !"});
  } else {
    const tokgen = new TokenGenerator(256, TokenGenerator.BASE62);
    // read privatekey from session
    const privateKey = tokgen.generate();
    fs.writeFileSync('./token.txt', privateKey);
    jwt.sign({id: user.identification}, privateKey, async (err, token) => {
      if (err) {
        res.status(400).send({msg : 'Error'});
      } else {
        const info_parking = await login.getDataBusiness(dbmysql, user.id_parking);
        res.status(200).send({ token: token, parking: {...info_parking, idOperador: user.idOperador} });
      }
    });
  }
});

sessionController.get('/api/v1/logout', (req, res, next) => {
  const authHeader = req.headers["auth"];
    jwt.sign(authHeader, "", { expiresIn: 1 } , (logout, err) => {
      if (logout) {
         res.send({msg : 'Has sido desconectado' });
      } else {
         res.send({msg:'Error', err});
      }
   });
});

module.exports = sessionController;
