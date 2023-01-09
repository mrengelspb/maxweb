const express = require('express');
const facturaController = express.Router();
const { dbmysql } = require('../data_providers/DBMysql.js');
const jwt = require('jsonwebtoken');
const FacturaController = require('../interface/controller/facturaController.js');
const Factura = require('../Entities/Factura.js');
const XmlGenerate = require('../Xml.js');
const fs = require('fs');
const validator = require('xsd-schema-validator');
const soap = require('soap');
const base64 = require('base-64');
const convert = require('xml-js');
const utf8 = require('utf8');
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

facturaController.post('/api/v1/factura/datos', async (req, res, next) => {
  const { identification_number } = req.body;
  const facturaController = new FacturaController();
  try {
    let response = await facturaController.getClientData(dbmysql, [identification_number]);
    response = JSON.parse(JSON.stringify(response[0]));
    if (response.length === 0) {
      res.status(404).send();
    } else {
      res.status(200).send(response);
    }
  } catch (err) {
    res.status(500).send({message: err.message}); 
  }
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
        date, 0, 0, 0, 0, 0, new Date(date).toISOString().replace("T", " ").split(".")[0], ID, client, secuencial, id_fe_emisoragret,
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

          fs.writeFileSync(`./Comprobantes/Generados/${code}.xml`, xml);

          const contenido_p12 = fs.readFileSync('./mateo_rengel.p12');
          const comprobante = factura.firmarComprobante(contenido_p12, 'Gasper1baby', xml);

          fs.writeFileSync(`./Comprobantes/Firmados/${code}.xml`, comprobante);
          let xml_data = fs.readFileSync(`./Comprobantes/Firmados/${code}.xml`, {encoding: 'utf8'});

          validator.validateXML(xml_data, './factura_V1.0.0.xsd', (err, result) => {
            if (err) {
              console.log(err);
            }
            if (result.valid) {
              console.log("Esquema exitoso...");
            }
          });

          const bytes = utf8.encode(xml_data);

          const xml_arg = {
            xml: base64.encode(bytes)
          } 

          const recepcionComprobantesPruebasUrl = 'https://celcer.sri.gob.ec/comprobantes-electronicos-ws/RecepcionComprobantesOffline?wsdl';
          const autorizacionComprobantesPruebasUrl = 'https://celcer.sri.gob.ec/comprobantes-electronicos-ws/AutorizacionComprobantesOffline?wsdl';

          const ClientRecepcion = await soap.createClientAsync(recepcionComprobantesPruebasUrl);
          const responseRecepcion = await ClientRecepcion.validarComprobanteAsync(xml_arg);
          const xml_args2 = {
            claveAccesoComprobante: code
          }

          const ClientAutorizacion = await soap.createClientAsync(autorizacionComprobantesPruebasUrl);
          const responseAutorizacion = await ClientAutorizacion.autorizacionComprobanteAsync(xml_args2);

          res.send({ responseRecepcion, responseAutorizacion, describe: ClientAutorizacion.describe() });
        })
        .catch((err) => {
          console.log({err: err.message, err});
        })
   })
    .catch((err) => { err.message, err});
});

module.exports = facturaController;
