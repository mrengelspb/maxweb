const { Account } = require('../Entities/Account.js');

class AccountInteractor {
  login ({DB, userName, password}) {
    const account = new Account(userName, password);
    return DB.query('CALL loginUser(?, ?)', [account.userName, account.password]);
  }
}

module.exports = AccountInteractor;
