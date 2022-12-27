const express = require('express');
const facturaController = express.Router();
const { dbmysql } = require('../data_providers/DBMysql.js');
const jwt = require('jsonwebtoken');
const FacturaController = require('../interface/controller/facturaController.js');
const Factura = require('../Entities/Factura.js');
const XmlGenerate = require('../Xml.js');
const fs = require('fs');
const SignedXml = require('xml-crypto').SignedXml;
const p12 = require('p12-pem');
const soap = require('soap');
const base64 = require('base-64');
const jsonxml = require('jsontoxml');
require('dotenv').config();

facturaController.use((req, res, next) => {
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

facturaController.post('api/v1/factura/datos', (req, res, next) => {
  const { identification_number } = req.body;
  const facturaController = new FacturaController();
  const result = facturaController.getClientData(dbmysql, [identification_number]);
  result
    .then((response) => {
      res.status(200).send(JSON.parse(JSON.stringify(response[0])));
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({message: err.message}); 
    });
})

facturaController.post('/api/v1/factura/consumidor/final', (req, res, next) => {
  res.send({ msg: "Workin in Implementation !"});
});

facturaController.post('/api/v1/factura/emision', (req, res, next) => {
  let code = "";
  
  const {
    ambiente_codigo, emision_codigo,
    numero_serie, identification_number, id_fe_emisoragret,
    date, tipo_comprobante, razon_social, lista_productos, subTotal,
    discounts, subTotalNeto, subTotalConImpuestos, subTotalSinImpuestos,
    subTotalNoObjetoIva, subTotalExcentoIva, ice, iva, propina, total, comercial_name,
    codigo_punto_emision, dir_establecimiento_matriz, numero_RUC, address, contribuyente_especial,
    obligado_a_llevar_contabilidad, ID, codDoc, addressI, estab, formaPago, client, time, timeLimit,
    identType
  } = req.body;
  
  const factura = new Factura(ambiente_codigo, emision_codigo, numero_serie,
    identification_number, id_fe_emisoragret, date, tipo_comprobante);
    
    const query = factura.getNumeroComprobante(dbmysql);
    query
    .then((response) => {
      response = JSON.parse(JSON.stringify(response[0][0]));
      
      code = factura.generar_codigo(response.state);

      const zeroPad = (num, places) => String(num).padStart(places, '0');
      const secuencial = zeroPad(parseInt(response.state) + 1, 9)
      const args = [tipo_comprobante, ambiente_codigo, numero_serie, emision_codigo, code.slice(-1), 11223344,
        date, 0, 0, 0, 0, 0, date, identification_number, razon_social, secuencial, id_fe_emisoragret,
        subTotal, discounts, subTotalNeto, subTotalConImpuestos, subTotalSinImpuestos, subTotalNoObjetoIva,
        subTotalExcentoIva, ice, iva, propina, total, code];

      const result = dbmysql.query('CALL pa_lsri_insertFactura(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', args);
      
      result
        .then(async (r) => {
          // agente  de retencion
          const xml = XmlGenerate(lista_productos, ambiente_codigo, emision_codigo,
            razon_social, comercial_name, numero_RUC, code, codDoc, estab, codigo_punto_emision,
            secuencial, dir_establecimiento_matriz, "0", contribuyente_especial, date, address,
            obligado_a_llevar_contabilidad, identType, client, ID, addressI, subTotalNeto, discounts,
            propina, time, timeLimit, total, formaPago, iva);

          fs.writeFileSync('./factura.xml', xml);
          const contenido_p12 = fs.readFileSync('./mateo_rengel.p12');
          const comprobante = factura.firmarComprobante(contenido_p12, 'Gasper1baby', xml);

          fs.writeFileSync("signed.xml", comprobante);

          const toBytes = (string) => Array.from(Buffer.from(string, 'utf8'));


          let xml_data = fs.readFileSync("./signed.xml");
          
          const xml_arg = 
          '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ec="http://ec.gob.sri.ws.recepcion">'
          + '<soapenv:Header/>' +
          '<soapenv:Body>' +
            '<ec:validarComprobante>' +
              '<xml>' + base64.encode(xml_data) + '</xml>' +
              '</ec:validarComprobante>' +
            '</soapenv:Body>' +
          '</soapenv:Envelope>';

          const recepcionComprobantesPruebasUrl = 'https://celcer.sri.gob.ec/comprobantes-electronicos-ws/RecepcionComprobantesOffline?wsdl';
          const autorizacionComprobantesPruebasUrl = 'https://celcer.sri.gob.ec/comprobantes-electronicos-ws/AutorizacionComprobantesOffline?wsdl';

          const ClientRecepcion = await soap.createClientAsync(recepcionComprobantesPruebasUrl);
          const responseRecepcion = await ClientRecepcion.validarComprobanteAsync(xml_arg);

          const xml_args2 = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ec="http://ec.gob.sri.ws.autorizacion">'
          + '<soapenv:Header/>' +
            '<soapenv:Body>' +
              '<ec:autorizacionComprobante>' +
                '<claveAccesoComprobante>' + code + '</claveAccesoComprobante>' +
              '</ec:autorizacionComprobante>' +
            '</soapenv:Body>' +
            '</soapenv:Envelope>';

          if (responseRecepcion[0].RespuestaRecepcionComprobante.estado === "RECIBIDA") {
            const ClientAutorizacion = await soap.createClientAsync(autorizacionComprobantesPruebasUrl);
            const responseAutorizacion = await ClientAutorizacion.autorizacionComprobanteAsync(xml_args2);
  
            res.send({ responseRecepcion, responseAutorizacion });
          }
        })
        .catch((err) => {
          console.log({err: err.message, err});
        })
   })
    .catch((err) => { err.message, err});
});

module.exports = facturaController;
