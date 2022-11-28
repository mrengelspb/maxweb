const { User } = require('../Entities/User.js');

class Login {
  account (DB, account, res) {
    const user = new User(account.userName, account.password);
    DB.loginUser(user, res);
  }
}

module.exports = {
  Login
};