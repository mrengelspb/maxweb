var base64 = require('base-64');
var utf8 = require('utf8');
var soap = require('soap');
var url = 'https://celcer.sri.gob.ec/comprobantes-electronicos-ws/RecepcionComprobantesOffline?wsdl';
const fs = require('fs');


const xml = fs.readFileSync('./factura.xml');

var bytes = utf8.encode(xml);
var encoded = base64.encode(bytes);
var args = {
    xml: encoded,
    targetNSAlias: 'tns',
    targetNamespace: 'http://ec.gob.sri.ws.recepcion'
};

soap.createClient(url, {}, function(err, client) {
    let describe = client.describe();
    console.dir(describe.RecepcionComprobantesOfflineService.RecepcionComprobantesOfflinePort.validarComprobante)
    client.validarComprobante(args, function(err, result) {
        console.dir(err)
        console.dir(result);
    });
});