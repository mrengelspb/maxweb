const { InterfaceDatabase } = require('../interface/controller/Database.js');
const mysql = require('mysql');

class DBMysql extends InterfaceDatabase {

  constructor(config) {
    super();
    this.connection = mysql.createConnection(config);
  }

  query(sql, account) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, [account.userName, account.password], (err, results) => {
        if (err)
          return reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = { DBMysql };
