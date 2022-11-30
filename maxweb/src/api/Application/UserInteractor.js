const { User } = require('../Domain/User.js');

class UserInteractor {
  login (DB, account) {
    const data = DB.query('CALL loginUser(?, ?)', [account.userName, account.password]);
    data.
    user.signUp();
  }
}

module.exports = UserInteractor;