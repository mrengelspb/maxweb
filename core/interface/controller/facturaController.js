// const Factura = require('../../Entities/factura.js');

class FacturaController {
    constructor(){

    }

    getClientData(DB, args){
        return DB.query('CALL getClientData(?)', args);
    }
}

module.exports = FacturaController;
