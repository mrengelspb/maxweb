// const Factura = require('../../Entities/factura.js');

class FacturaController {

    getClientData(DB, args){
        return DB.query('CALL pa_cl_getClientData(?, ?)', [1, args]);
    }
}

module.exports = FacturaController;
