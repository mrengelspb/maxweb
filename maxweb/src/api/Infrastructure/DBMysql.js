const { InterfaceDatabase } = require('../interface/controller/Database.js.js.js');
const mysql = require('mysql');

class DBMysql extends InterfaceDatabase {

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
}

module.exports = {
  dbmysql: new DBMysql({
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT_DB,
  })
};
