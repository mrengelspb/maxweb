const express = require('express');
const productController = express.Router();
const { dbmysql } = require('../data_providers/DBMysql.js');
const { ProductInterator } = require('../Use_Cases/Product.js');
const fs = require('fs');
const jwt = require('jsonwebtoken');

productController.use((req, res, next) => {
  const authHeader = req.headers["auth"];
  const token = authHeader;
  if (token == null) return res.sendStatus(403);
  const privateKey = fs.readFileSync('./token.txt');
  console.log(privateKey);
  jwt.verify(token, privateKey, (err, user) => {
     if (err) return res.sendStatus(404);
     req.user = user;
     next();
  });
});

productController.get('/api/v1/producto/:id', (req, res, next) => {
  const { id } = req.params;
  const productInteractor = new ProductInterator();
  const result = productInteractor.getProduct(dbmysql, [id]);
  result
    .then((data) => {
      try {
        const json_data = JSON.parse(JSON.stringify(data));
        res.status(200).send(json_data);
      } catch (error) {
        res.status(500).send(JSON.parse({ message: error.message }))
      }
    })
    .catch((err) => {
      res.status(500).send(JSON.parse({
        message: err
      }));
    });
});

productController.post('api/v1/producto', (req, res, next) => {
  const { description, cost } = req.body;
  const productInteractor = new ProductInterator();
  const result = productInteractor.create(dbmysql, [description, cost]);
  result.then((data) => {
    res.status(200).send(JSON.parse(JSON.stringify(data[0])));
  })
    .catch((err) => {
      res.status(500).send({
        message: err.message
      });
    });
});


module.exports = productController;
