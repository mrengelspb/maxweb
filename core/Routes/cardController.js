const express = require('express');
const cardController = express.Router();
const Tariff = require('../Tariff.js');
const CardInteractor = require('../Use_Cases/CardInteractor.js');
const { dbmysql } = require('../data_providers/DBMysql.js');
const fs = require('fs');
const jwt = require('jsonwebtoken');

cardController.use((req, res, next) => {
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

cardController.post('/api/v1/card/:id', async (req, res) => {
  const { id } = req.params;
  const { ID_parking, levelAccess, typeTariff } = req.body;

  let cardInteractor = new CardInteractor(dbmysql);
  const card =  await cardInteractor.searchCardById(id);

  if (card === 404) {
    res.status(404).send();
  } else if (card === 500) {
    res.status(500).send();
  } else {
    let total;

    const start = new Date(card.in);
    card.in = start.toLocaleString();
    const end = new Date();
    card.out = end.toLocaleString();

    let time = Math.round(((end - start)/1000)/60);
    const tariff = new Tariff(dbmysql, ID_parking)

    let uploadTariffs = await tariff.uploadTariffs();
    
    if (uploadTariffs) {
      total = tariff.calculateTotal(time, typeTariff);
    } else {
      console.log("Error cargando tarifas...!");
    }

    res.status(200).send({ ...card.info(), time, total });
  }
});

cardController.put('/api/v1/card/updated', async (req, res) => {
  Date.prototype.addMins = function(m) {
    this.setTime(this.getTime() + (m*60*1000));
    return this;
  } 
  const args = [
    req.body.id_card,
    new Date(req.body.out).toISOString().replace("T", " ").split(".")[0],
    req.body.state,
    req.body.min_used,
    req.body.total,
    new Date(req.body.out).addMins(10).toISOString().replace("T", " ").split(".")[0],
  ]
  let cardInteractor = new CardInteractor(dbmysql);
  const card =  await cardInteractor.updateCardById(args);

  if (card === 404) {
    res.status(404).send();
  } else if (card === 500) {
    res.status(500).send();
  } else {
    res.status(200).send(card);
  }
});

module.exports = cardController;
