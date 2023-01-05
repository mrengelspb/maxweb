const express = require('express');
const { dbmysql } = require('../data_providers/DBMysql.js');
const ReportController = express.Router();
const ReportInteractor = require('../Use_Cases/ReportInteractor.js');
const Pdfmake = require('pdfmake');
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

ReportController.post('/api/v1/report/:field/:type', async (req, res, next) => {
    const { since, to, id_parking, name_parking, address_parking } = req.body;
    const { field, type } = req.params;
    const reportInteractor = new ReportInteractor(dbmysql, Pdfmake);
    let state;
    if (type === 'in') {
        state = 0;
    } else if (type === 'out') {
        state = 2
    }
    if (field === 'ticket') {
        const report = await reportInteractor.getReportTickets(1, since, to, id_parking, state, field, type, name_parking, address_parking);
        if (report == 404) {
            res.status(report).send();
        } else if (report === 500) {
            res.status(report).send();
        } else {

            
            // EXCEL
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
                data: {
                    fields: report.getHeader(),
                    body: report.getBody(),
                }
            });
        }
    }
    
});

module.exports = ReportController;
