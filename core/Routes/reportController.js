const express = require('express');
const { dbmysql } = require('../data_providers/DBMysql.js');
const ReportController = express.Router();
const ReportInteractor = require('../Use_Cases/ReportInteractor.js');
const jsreport = require('@jsreport/jsreport-core')();
const Excel = require('exceljs');
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
    const reportInteractor = new ReportInteractor(dbmysql);
    const report = await reportInteractor.getReportTickets(1, since, to, parking, 0);
    if (report == 404) {
        res.status(report).send();
    } else if (report === 500) {
        res.status(report).send();
    } else {
        const template = fs.readFileSync("./Report/ticket_template.html");
        jsreport.init().then(() => {
            return jsreport.render({
                template: {
                    content: template.toString(),
                    engine: 'handlebars',
                    recipe: 'chrome-pdf'
                },
                data: {
                    since: since,
                    to: to,
                    parkin: parking,
                }
            }).then((resp) => {
                fs.writeFileSync("./Report/ticket.pdf", resp.content);
             });
        }).catch((e) => {
            console.error(e);
        });

        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet("Tickets");
        worksheet.columns = [
            {header: "Nombre", key: "nombre", width: 10},         
            {header: "Apellido", key: "apellido", width: 20},          
        ]

        worksheet.addRow({id: 1, nombre: 'Jose', apellido: 'Valdiviezo'});
        worksheet.addRow({id: 1, nombre: 'Mateo', apellido: 'Rengel'});

        await workbook.xlsx.writeFile('./Report/ticket.xlsx');

        res.send({
            since: report.since,
            to: report.to,
            parking: report.parking,
            data: report.data
        });
    }
});

module.exports = ReportController;
