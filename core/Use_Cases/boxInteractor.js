const Box = require('../Entities/Box.js');

class BoxInteractor {
  async createLog (DB, args) {
    let response = await DB.query('CALL pa_lo_insertlogbox(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);', args);
    return response;
  }
  async updateLog(DB, args) {
    let response = await DB.query('CALL pa_lo_updatelogbox(?,?,?,?,?,?);', args);
    console.log(response);
    return response;
  }
}

module.exports = BoxInteractor;
