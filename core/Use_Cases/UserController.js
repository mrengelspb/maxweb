const { User } = require('../Entities/User.js');

class UserController {
  async loginAccount (Db, account) {
    const response = await Db.login([account.userName, account.password]);
    console.log(response);
    try {
      if (response[0].length == 0) {
        throw new Error(`Http error: ${response}`);
      }
      const data = await response[0].json();
      console.log(data);
      return new User(data.userName, data.password);
    } catch (error) {
      console.error(`Message Error: ${error}`);
    }
  }
}

module.exports = UserController;