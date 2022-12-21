const { User } = require('../Entities/User.js');

class Login {
  account (DB, account) {
    const user = new User(account.userName, account.password);
    return DB.query('CALL pa_op_loginUser(?, ?)', [user.userName, user.password]);
  }
}

module.exports = Login;