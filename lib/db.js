var mysql = require('mysql');
var db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'vip0818^^!',
    database:'oasis'
  });
  db.connect();
  module.exports = db;      // 외부에서 쓸 수 있게.
