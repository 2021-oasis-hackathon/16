//모듈 임포트
var express = require('express');
var app = express();
var fs = require('fs');
var session = require('express-session');
var db = require('./db');
var morgan = require('morgan');           //로그 모듈
var bodyParser = require('body-parser');
var compression = require('compression');
var helmet = require('helmet');
 
//라우트로 분리
var indexRouter = require('./routes/index');
var topicRouter = require('./routes/topic');
//var userRouter = require('./routes/user.js');
 
app.set('views', __dirname + '/views'); // 서버가 읽을 수 있도록 HTML 의 위치를 정의
app.set('view engine', 'ejs');          // 서버가 HTML 렌더링을 할 때, EJS엔진을 사용하도록 설정
// app.engine('html', require('ejs').renderFile);

// 미들웨어 설정
app.use(express.static('public'));          
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(morgan('short'))

var productRouter = require('./routes/topic.js')
//app.use(userRouter)
app.use(productRouter)
 
/*
app.get('*', function(req, res, next) {
   fs.readdir('./data', function(error, filelist ){
     req.list = filelist;
     next();
    });
    res.render('list.ejs', {'list':req.list}, function(err,html) {
      if (err) {
        console.log(err)
      }
      res.end(html)
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
 */
app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
});