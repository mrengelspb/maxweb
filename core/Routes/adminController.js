const express = require('express');
const adminController = express.Router();
const { dbmysql } = require('../data_providers/DBMysql.js');
const AdminController = require('../interface/controller/AdminController.js');
const fs = require('fs');
const jwt = require('jsonwebtoken');

adminController.use((req, res, next) => {
  const authHeader = req.headers["auth"];
  const token = authHeader;
  if (token == null) return res.sendStatus(403);
  const privateKey = fs.readFileSync('./token.txt');
  jwt.verify(token, privateKey, (err, user) => {
     if (err) return res.sendStatus(404);
     req.user = user;
     next();
  });
});

adminController.post('/api/v1/admin', (req, res, next) => {
  const data = req.body;
  const adminController = new AdminController();
  const today = new Date();
  const isoFormat = today.toISOString();
  const timestamp = isoFormat.slice(0, 10) + " " + isoFormat.slice(11, 19);
  const age = today.getFullYear() - new Date(data.BirthDate).getFullYear();
  const args = [
    data.IdentificationNumber,
    data.FirstName,
    data.SecondFirstName,
    data.LastName,
    data.SecondLastName,
    data.Email,
    data.BirthDate,
    data.PhoneNumber,
    data.Address,
    age,
    data.UserName,
    timestamp,
    data.Password,
    data.Role
  ]
  const result = adminController.create(dbmysql, args);
  result.then(data => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send({message: err.message});
  })
});

module.exports = adminController;
