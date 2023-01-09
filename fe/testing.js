const soap = require('soap');

const autorizacionComprobantesPruebasUrl = 'https://celcer.sri.gob.ec/comprobantes-electronicos-ws/AutorizacionComprobantesOffline?wsdl';

const xml_args2 = {
    claveAccesoComprobante: '0901202301010496192500110010010000005631122334415'
}

soap.createClient(autorizacionComprobantesPruebasUrl, {}, function(err, client) {
    client.autorizacionComprobante(xml_args2, function(err, result) {
        console.dir(result.RespuestaAutorizacionComprobante);
    });
});
