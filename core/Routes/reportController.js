const express = require('express');
const { dbmysql } = require('../data_providers/DBMysql.js');
const ReportController = express.Router();
const ReportInteractor = require('../Use_Cases/ReportInteractor.js');
const Pdfmake = require('pdfmake');
const Excel = require('exceljs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const e = require('express');

ReportController.use((req, res, next) => {
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

ReportController.post('/api/v1/report/:field/:type', async (req, res, next) => {
    const { since, to, id_parking, name_parking, address_parking } = req.body;
    const { field, type } = req.params;
    const reportInteractor = new ReportInteractor(dbmysql, Pdfmake, Excel);
    let state = -1;
    let action;
    if (field === "ticket") {
        action = 1;
    } else if (field === "card") {
        action = 2;
    } else if (field === 'box') {
        action = 3;
    } else if (field === 'paper') {
        action = 4;
    }
    if (type === 'in') {
        state = 0;
    } else if (type === 'out') {
        state = 2
    }
    
    const report = await reportInteractor.getReport(action, since, to, id_parking, state, field, type, name_parking, address_parking);
    if (report == 404) {
        res.status(report).send();
    } else if (report === 500) {
        res.status(report).send();
    } else {
        res.send({
            since: report.since,
            to: report.to,
            parking: report.parking,
            data: {
                fields: report.getHeader(),
                body: report.getBody(),
            }
        });
    }
});

module.exports = ReportController;
