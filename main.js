//var http = require('http');
var express = require('express');
var app = express();
var url = require('url');
var fs = require('fs');
var ejs = require('ejs');
var topic = require('./lib/topic');
var aguthor = require('./lib/author');
 
app.get = ('/', function(request,response) {
  console.log("start");
  response.writeHead(200,{"Content-Type": "text/html"}); 
  customReadFile("index.html");
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
});

// app.use('/',express.static(__dirname+ 'index.html'));

//     var _url = request.url;
//     var queryData = url.parse(_url, true).query;
//     var pathname = url.parse(_url, true).pathname;
//     if(pathname === '/'){
//       if(queryData.id === undefined){
//         topic.home(request, response);
//       } else {
//         topic.page(request, response);
//       }
//     } else if(pathname === '/create'){
//       topic.create(request, response);
//     } else if(pathname === '/community'){
//       topic.community(request, response);
//     } else if(pathname === '/update'){
//       topic.update(request, response);
//     } else if(pathname === '/update_process'){
//       topic.update_process(request, response);
//     } else if(pathname === '/delete_process'){
//       topic.delete_process(request, response);
//     } else if(pathname === '/author'){
//       author.home(request, response);
//     } else if(pathname === '/author/community'){
//       author.community(request, response);
//     } else if(pathname === '/author/update'){
//       author.update(request, response);
//     } else if(pathname === '/author/update_process'){
//       author.update_process(request, response);
//     } else if(pathname === '/author/delete_process'){
//       author.delete_process(request, response);
//     } else {
//       response.writeHead(404);
//       response.end('Not found');
//     }
// }));

// // 서버가 읽을 수 있도록 HTML 의 위치 정의
// app.set('views', __dirname + '/views'); 
// // 서버가 HTML 렌더링을 할 때, EJS엔진을 사용 설정
// app.set('view engine', 'ejs');
// app.engine('html', require('ejs').renderFile);


//app.listen(3000);
