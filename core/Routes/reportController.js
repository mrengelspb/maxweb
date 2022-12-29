const express = require('express');
const ReportController = express.Router();
const { dbmysql } = require('../data_providers/DBMysql.js');
const ReportInteractor = require('../Use_Cases/ReportInteractor.js');
const jwt = require('jsonwebtoken');
const fs = require('fs');

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

ReportController.post('/api/v1/informes/ticket', async (req, res, next) => {
    const { since, to, parking } = req.body;
    console.log(since, to, parking)
    const reportInteractor = new ReportInteractor(dbmysql);
    const report = await reportInteractor.getReportTickets(1, since, to, parking, 0);
    if (report == 400) {
        res.status(report).send();
    } else if (report === 500) {
        res.status(report).send();
    } else {
        res.send({
            since: report.since,
            to: report.to,
            parking: report.parking,
            data: report.data
        });
    }
});

module.exports = ReportController;
