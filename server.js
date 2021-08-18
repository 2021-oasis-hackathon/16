//router
var express = require('express');
var app = express();
var fs = require('fs');
var session = require('express-session');
var db = require('./db');
var bodyParser = require('body-parser');
var compression = require('compression');
var helmet = require('helmet');
 
var indexRouter = require('./routes/index');
var topicRouter = require('./routes/topic');
//const template = require('./template');
 
// app.set('views', __dirname + '/views'); // 서버가 읽을 수 있도록 HTML 의 위치를 정의해줍니다.
// app.set('view engine', 'ejs');          // 서버가 HTML 렌더링을 할 때, EJS엔진을 사용하도록 설정합니다. 출처: https://til0804.tistory.com/17 []
// app.engine('html', require('ejs').renderFile);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.get('*', function(request, response, next) {
   fs.readdir('./data', function(error, filelist ){
     request.list = filelist;
     next();
    });
 });
 
app.use('/', indexRouter);
app.use('/topic', topicRouter);
 
app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});
 
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});
 
app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
});