const { InterfaceDatabase } = require('../interface/controller/Database.js');
const mysql = require('mysql');

class DBMysql extends InterfaceDatabase {

  constructor(config) {
    super();
    this.connection = mysql.createConnection(config);
  }

  loginUser(account) {
    this.connection.connect((err) => {
      if (err) {
        console.error('Error corresponding ' + err.stack);
        return;
      }
      console.log('connected as id ' + this.connection.threadId);
    });

    this.connection.query('CALL loginUser(?, ?)', [account.userName, account.password], (err, results, fields) => {
      if (err) {
        console.error(err.message);
      }
      console.log(results);
    });

    this.connection.end();
  }
}

module.exports = { DBMysql };