const User = require('../Entities/User.js');

class Login {
  async account (DB, account) {
    let response = await DB.query('CALL pa_op_loginUser(?, ?)', [account.userName, account.password]);
    response = JSON.parse(JSON.stringify(response[0][0]));
    if (response.length === 0) {
      return 404;
    }
    const user = new User(response);
    return user;
  }

  async getDataBusiness(DB, identification_number) {
    let response = await DB.query('CALL pa_fe_consultas(?, ?)', [1, identification_number]);
    response = JSON.parse(JSON.stringify(response[0][0]));
    if (response.length === 0) {
      return 404;
    }
    return response;
  }
}

module.exports = Login;
