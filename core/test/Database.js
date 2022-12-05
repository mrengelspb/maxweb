const mysql = require('mysql');


class Mysql {
  constructor({ host, user, password, database, port }) {
    this.host = host,
      this.user = user,
      this.password = password,
      this.database = database,
      this.port = port

    this.connection = mysql.createConnection({
      host: this.host,
      user: this.user,
      password: this.password,
      database: this.database,
      port: this.port
    });
  }

  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, results) => {
        if (err)
          return reject(err);
        resolve(results);
      })
    })
  }
}
