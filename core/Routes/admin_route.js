const express = require('express');
const admin_route = express.Router();
const { dbmysql } = require('../data_providers/DBMysql.js');
const AdminController = require('../interface/controller/AdminController.js');

admin_route.get('/admin', (req, res, next) => {
  if (req.session.data) {
    res.send(req.session.data);
  } else {
    res.send({
      message: "Session not Found !"
    });
  }
});

admin_route.post('/admin', (req, res, next) => {
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

module.exports = admin_route;
