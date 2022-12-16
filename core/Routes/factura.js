const express = require('express');
const factura = express.Router();
const { dbmysql } = require('../data_providers/DBMysql.js');
const FacturaController = require('../interface/controller/facturaController.js');
const Factura = require('../Entities/Factura.js');
const XmlGenerate = require('../Xml.js');
const fs = require('fs');
const SignedXml = require('xml-crypto').SignedXml;
const p12 = require('p12-pem');
const soap = require('soap');
const base64 = require('base-64');
require('dotenv').config();

factura.get("/factura/consultas", (req, res, next) => {
  const query = dbmysql.query('CALL pa_fe_consultas(?, ?)', [1, process.env.RUC]);
  query.then((response) => {
      res.status(200).send(JSON.parse(JSON.stringify(response)));
  })
  .catch((err) => {
      console.error(err);
  })
});

factura.post('/factura_con_datos', (req, res, next) => {
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
    })
})

factura.post('/factura/emitir', (req, res, next) => {
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

          let { pemKey, pemCertificate } = p12.getPemFromP12('./firma_electronica.p12',  'Gasper1baby');

          let pemKey2 = pemKey.slice(0, 31) + "\n" + pemKey.slice(31);
          pemKey2 = pemKey2.slice(0, pemKey2.length - 29) + "\n" + pemKey2.slice(pemKey2.length - 29);
          let pemCertificate2 = pemCertificate.slice(0, 27) + "\n" + pemCertificate.slice(27);
          pemCertificate2 = pemCertificate2.slice(0, pemCertificate2.length - 24) + "\n" + pemCertificate2.slice(pemCertificate.length - 24);

          fs.writeFileSync('./client_public.pem', pemCertificate2 + "\n" + pemKey2)
        
          const signedXml = new SignedXml();
          
          let pem = pemCertificate.slice(27, pemCertificate.length - 24) + "\n" + pemKey.slice(31, pemKey.length - 29);
          
          signedXml.keyInfoProvider = {
            getKeyInfo: function () {
              return "<X509Data><X509Certificate>" + pem + "</X509Certificate></X509Data>";
            }
          };
          signedXml.addReference("//*[local-name(.)='infoAdicional']",["http://www.w3.org/2000/09/xmldsig#enveloped-signature"]);
          const key = fs.readFileSync("./client_public.pem");
          signedXml.signingKey = key.toString();
         
          signedXml.computeSignature(xml, {
            prefix: 'ds'
          });
          
          fs.writeFileSync("signed.xml", signedXml.getSignedXml());

          const xml_data = fs.readFileSync("./signed.xml");

          const args = {
            xml: base64.encode(xml_data.toString().replaceAll("\n", ""))
            // targetNSAlias: "Recepcion",
            // targetNamespace: "https://celcer.sri.gob.ec/comprobantes-electronicos-ws/RecepcionComprobantesOffline?wsdl"
          };
          // const args = {claveAccesoComprobante: code};
          const url = 'https://celcer.sri.gob.ec/comprobantes-electronicos-ws/RecepcionComprobantesOffline?wsdl';
          const url2 = 'https://celcer.sri.gob.ec/comprobantes-electronicos-ws/AutorizacionComprobantesOffline?wsdl';

          soap.createClient(url, {}, function(err, client) {
            // res.send(client.describe())
              //client.autorizacionComprobante(args, function(err, result) {
              let describe = client.describe();
              client.validarComprobante(args, function(err, result) {
                if(err){
                  console.log(err);
                } 
                  res.send({result, describe})
              });
          });

        })
        .catch((err) => {
          console.log({err: err.message, err});
        })
   })
    .catch((err) => { err.message, err});
});

module.exports = factura;
