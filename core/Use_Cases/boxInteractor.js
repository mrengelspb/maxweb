const Box = require('../Entities/Box.js');

class BoxInteractor {
  async createLog (DB, args) {
    let response = await DB.query('CALL pa_lo_insertlogopeardor(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);', args);
    return response;
  }
}

module.exports = BoxInteractor;