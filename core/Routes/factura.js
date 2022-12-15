const express = require('express');
const factura = express.Router();
const { dbmysql } = require('../data_providers/DBMysql.js');
const FacturaController = require('../interface/controller/facturaController.js');
const Factura = require('../Entities/Factura.js');
const XmlGenerate = require('../Xml.js');
const fs = require('fs');
const SignedXml = require('xml-crypto').SignedXml;
const p12 = require('p12-pem');
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
          fs.writeFile('./factura.xml', xml, (content, err) => {
            if (err) {
              console.err(err);
              throw new Error(err);
            }
            console.log("File written successfully !");
          });

          let {pemKey, pemCertificate, commonName} = p12.getPemFromP12('./firma_electronica.p12',  'Gasper1baby');
          let pemKey2 = pemKey.slice(0, 31) + "\n" + pemKey.slice(31);
          pemKey2 = pemKey.slice(0, pemKey2.length - 30) + "\n" + pemKey.slice(pemKey2.length - 30);
          
          var xml2 = "<library>" +
                      "<book>" +
                        "<name>Harry Potter</name>" +
                      "</book>" +
                    "</library>"
        
          var sig = new SignedXml()
          sig.addReference("//*[local-name(.)='book']");
          sig.signingKey = fs.readFileSync("./ex3.pem");
          console.log(sig.signingKey);

          sig.computeSignature(xml2)
          fs.writeFileSync("signed2.xml", sig.getSignedXml())



          // const signedXml = new SignedXml();
          // signedXml.addReference("//*[local-name(.)='infoAdicional']",["http://www.w3.org/2000/09/xmldsig#enveloped-signature"]);
          // signedXml.signingKey = pemKey2;
          // signedXml.computeSignature(xml, {
          //   prefix: 'ds'
          // });

          // fs.writeFileSync("signed.xml", signedXml.getSignedXml());

          res.status(200).send(JSON.parse(JSON.stringify({
            code: code,
            state: r,
            xml: xml
          })));
        })
        .catch((err) => {
          console.log({err: err.message, err});
        })
   })
    .catch((err) => { err.message, err});
});

module.exports = factura;
