var express = require('express');
var app = express();
 
app.get('/', function (req, res) {
    //res.send('Hello World!');
    res.sendFile(__dirname + '/app/index.html');
 });
 
 
var server = app.listen(3000, function () {
  console.log('load Success!');
});
