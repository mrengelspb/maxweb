const soap = require('soap');
const fs = require('fs');
const base64 = require('base-64');

let xml_data = fs.readFileSync("./signed.xml");

async function service() {
    let code = "2112202201999999999900110010010000005011122334412"; // Por favor verificar que sea el mismo que el archivo signel.xml
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

        console.dir({ responseRecepcion, responseAutorizacion });
    }
}
          
service();