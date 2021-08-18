var express = require('express');
var router = express.Router();
var template = require(__dirname + '/../template.js');
 
module.exports = router;
router.get('/', function(request, response) { 
    var title = 'Welcome';
    var description = 'Hello, Node.js';
    var list = template.list(request.list);
    var html = template.HTML(title, list,
      `
      <h2>${title}</h2>${description}
      <img src="/images/coding.jpg" style="width:300px; display:block; margin-top:10px;">
      `,
      `<a href="/topic/create">create</a>`
    ); 
    //response.sendFile(__dirname,'../index.html');
    response.send(html);
  });
   