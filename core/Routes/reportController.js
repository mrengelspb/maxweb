const express = require('express');
const { dbmysql } = require('../data_providers/DBMysql.js');
const ReportController = express.Router();
const ReportInteractor = require('../Use_Cases/ReportInteractor.js');
const { PDFDocument, StandardFonts, rgb, createPDFAcroFields } = require('pdf-lib');
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
    const reportInteractor = new ReportInteractor(dbmysql);
    console.log(req.params.type);
    if (field === 'ticket' && type === 'in') {
        const report = await reportInteractor.getReportTickets(1, since, to, id_parking, 0);
        if (report == 404) {
            res.status(report).send();
        } else if (report === 500) {
            res.status(report).send();
        } else {
            const keys = Object.keys(report.data[0]);
            console.log(keys);
            
            // PDF
            const pdfDoc = await PDFDocument.create();
            const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
            const page = pdfDoc.addPage();
            const { width, height } = page.getSize()
            page.drawText('Soluciones Plan B', {
                x: 50,
                y: height - 50,
                size: 32,
                font: timesRomanFont,
                color: rgb(0, 0, 0)
            });
            
            page.drawText(`Informe: Ticket - Ingreso`, {
                x: width - 220,
                y: height - 50,
                size: 16,
                font: timesRomanFont,
                color: rgb(0, 0, 0)
            });
    
            page.drawText(`${name_parking}`, {
                x: 50,
                y: height - 70,
                size: 14,
                font: timesRomanFont,
                color: rgb(0, 0, 0)
            });
    
            page.drawText(`${address_parking}`, {
                x: 50,
                y: height - 85,
                size: 14,
                font: timesRomanFont,
                color: rgb(0, 0, 0)
            });
    
            page.drawText(`Desde: ${since.split("T")[0]} , Hasta: ${to.split("T")[0]}`, {
                x: 50,
                y: height - 100,
                size: 12,
                font: timesRomanFont,
                color: rgb(0, 0, 0)
            });
    
            page.drawLine({
                start: {x: 50, y: height - 110},
                end: {x: width - 50, y: height - 110},
                thickness: 1,
                color: rgb(0, 0, 0),
                opacity: 1
            });

            const rows = report.data.length;
            // Header Table PDF
            const fields = ['Id', 'Codigo', 'Fecha Ingreso', 'Fecha Salida', 'Placa', 'Operador', 'Tiempo', 'Valor'];
            const colum_width = Math.floor((width - 100) / field.length);
            // cl-1
            page.drawRectangle({
                x: 50,
                y: height - 180,
                width: colum_width,
                height:30,
                borderWidth: 2,
                color: rgb(0, 0, 0),
                opacity: 0,
                borderOpacity: 1
            });
            
            page.drawText(fields[0], {
                x: 75,
                y: height - 170,
                size: 12,
                font: timesRomanFont,
                color: rgb(0, 0, 0)
            });
             // cl-2
             page.drawRectangle({
                x: 50 + colum_width,
                y: height - 180,
                width: colum_width,
                height:30,
                borderWidth: 2,
                color: rgb(0, 0, 0),
                opacity: 0,
                borderOpacity: 1
            });
            
            page.drawText(fields[1], {
                x: 75 + colum_width,
                y: height - 170,
                size: 12,
                font: timesRomanFont,
                color: rgb(0, 0, 0)
            });
            // cl-3
            page.drawRectangle({
                x: 50 + colum_width * 2,
                y: height - 180,
                width: colum_width,
                height:30,
                borderWidth: 2,
                color: rgb(0, 0, 0),
                opacity: 0,
                borderOpacity: 1
            });
            
            page.drawText(fields[2], {
                x: 75 + colum_width * 2,
                y: height - 170,
                size: 12,
                font: timesRomanFont,
                color: rgb(0, 0, 0)
            });

    
    
            const pdfBytes = await pdfDoc.save();
    
            fs.writeFileSync('./Report/ticket.pdf', pdfBytes);
    
    
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
                data: report.data
            });
        }
    }
    
});

module.exports = ReportController;
