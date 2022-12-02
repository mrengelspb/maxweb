const mysql = require('mysql');
// HOST='192.168.0.208'
// USER='root'
// PASSWORD='Solucionespb3.'
// DATABASE='sch_spbmaxweb'
// PORT_DB=3306

const connection = mysql.createConnection({
    host:'192.168.0.208',
    user:'root',
    password:'Solucionespb3.',
    database:'sch_spbmaxweb',
    port: 3306
})

connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
  
    console.log('connected as id ' + connection.threadId);
  });

connection.query('CALL loginUser(?, ?)', ['admin_1', '1234'], (err, result, fields) => {
  if (err) {
    console.log(err);
    return;
  }
    console.log(result);
});
