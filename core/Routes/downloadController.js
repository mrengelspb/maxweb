const express = require('express');
const path = require('path');
const downloadController = express.Router();

downloadController.get('/api/v1/download/informe/pdf/:file(*)', (req, res, next) => {
  const file = req.params.file;
  const fileLocation = path.join('./Report', file + ".pdf");
  res.setHeader('Content-disposition', 'attachment; filename=ticket.pdf');
  res.download(fileLocation, file);
});

downloadController.get('/api/v1/download/informe/excel/:file(*)', (req, res, next) => {
  const file = req.params.file;
  const fileLocation = path.join('./Report', file + ".xlsx");
  res.setHeader('Content-disposition', 'attachment; filename=ticket.xlsx');
  res.download(fileLocation, file);
});

module.exports = downloadController;
