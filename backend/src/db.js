const mysql = require('mysql')
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'hrms',  //hrms_final
  multipleStatements: true
});


conn.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected!");
  });

module.exports=conn;