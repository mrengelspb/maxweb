const soap = require('soap');
const fs = require('fs');
const base64 = require('base-64');

let xml_data = fs.readFileSync("./signed.xml");

async function service() {
    console.log("point1")
    let code = "0401202301010496192500110010010000005181122334417"; // Por favor verificar que sea el mismo que el archivo signel.xml
    const xml_arg = {
        xml: base64.encode(xml_data.toString('utf-8'))
    }
    try {
        console.log("point2");
        const recepcionComprobantesPruebasUrl = 'https://celcer.sri.gob.ec/comprobantes-electronicos-ws/RecepcionComprobantesOffline?wsdl';
        const autorizacionComprobantesPruebasUrl = 'https://celcer.sri.gob.ec/comprobantes-electronicos-ws/AutorizacionComprobantesOffline?wsdl';

        const ClientRecepcion = await soap.createClientAsync(recepcionComprobantesPruebasUrl);
        const responseRecepcion = await ClientRecepcion.validarComprobanteAsync(xml_arg);
        console.log("point3", responseRecepcion);

        const xml_args2 = {
            claveAccesoComprobante: code
        }

        if (responseRecepcion[0].RespuestaRecepcionComprobante.estado === "RECIBIDA") {
            const ClientAutorizacion = await soap.createClientAsync(autorizacionComprobantesPruebasUrl);
            const responseAutorizacion = await ClientAutorizacion.autorizacionComprobanteAsync(xml_args2);
            console.dir({ responseRecepcion, responseAutorizacion });
        } else {
            console.dir({ responseRecepcion });
        }
    } catch (error) {
        console.dir(error);
    }

    
}
          
service();