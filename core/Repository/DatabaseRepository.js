const { InterfaceDatabase } = require('../interface/Database.js');
const mysql = require('mysql');

class DatabaseRepository extends InterfaceDatabase {

  constructor(config) {
    super();
    this.connection = mysql.createConnection(config);
  }

  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, results) => {
        if (err)
          return reject(err);
        resolve(results);
      });
    });
  }

  login(args) {
    return new Promise((resolve, reject) => {
      this.connection.connect();
      this.connection.query(`CALL pa_op_loginUser(?, ?)`, args, (err, results) => {
        if (err)
          return reject(err);
        resolve(results);
      });
      this.connection.end();
    });
  }
}

module.exports = {
  DatabaseRepository: new DatabaseRepository({
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT_DB,
  })
};
