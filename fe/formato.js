const validator = require('xsd-schema-validator');
const fs = require('fs');


const xml = fs.readFileSync('../core/signed.xml');

validator.validateXML(xml.toString(), '../core/factura_V2.1.0.xsd', function(err, result) {
    console.log(result.valid);
    console.dir(err);
    }
);
