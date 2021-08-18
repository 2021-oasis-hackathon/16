// var fs = require('fs');
// var ejs = require('ejs');
// const { response } = require('express');

module.exports = {
    HTML:function(sanitizedTitle, list, body, control){
      // var mainFage = fs.readFileSync('index.html', 'utf8');
      // var page = ejs.render(mainFage, {
      //   title:"MainPage",
      // });
      //  return response.send(page);`
      return `
      <!doctype html>
      <html>
      <head>
        <title>WEB1 - ${sanitizedTitle}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">OASIS MOLE!</a></h1>
        ${list}
        ${control}
        ${body}
      </body>
      </html>
      `;
    },list:function(filelist){
      var list = '<ul>';
      var i = 0;
      while(i < filelist.length){
        list = list + `<li><a href="/topic/${filelist[i]}">${filelist[i]}</a></li>`;
        i = i + 1;
      }
      list = list+'</ul>';
      return list;
    }
  }