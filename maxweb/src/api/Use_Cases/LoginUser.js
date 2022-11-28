import User from '../Entities/User.js';

export class Login {
  user (DB, account) {
    const user = new User(account.userName, account.password);
    DB.loginUser(user);
  }
}
