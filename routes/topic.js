var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var sanitizeHtml = require('sanitize-html');
var template = require(__dirname + '/../template.js');
var db = require(__dirname + '/../db.js');

router.use(bodyParser.urlencoded({extended: false}))

//게시판 페이징

router.get("/pasing/:cur", function(req, res){
      //페이지당 게시물 수 : 한 페이지 당 10개 게시물
  var page_size = 10;
  //페이지의 갯수 : 1 ~ 10개 페이지
  var page_list_size = 10;
  //limit 변수
  var no = "";
  //전체 게시물의 숫자
  var totalPageCount = 0;

  var queryString = 'select count(*) as cnt from topic'
  db().query(queryString, function (error2, data) {
    if (error2) {
        console.log(error2 + "메인 화면 mysql 조회 실패");
        return
    }
    //전체 게시물의 숫자
    totalPageCount = data[0].cnt

    //현제 페이지
    var curPage = req.params.cur;

    console.log("현재 페이지 : " + curPage, "전체 페이지 : " + totalPageCount);


    //전체 페이지 갯수
    if (totalPageCount < 0) {
        totalPageCount = 0
    }

    var totalPage = Math.ceil(totalPageCount / page_size);// 전체 페이지수
    var totalSet = Math.ceil(totalPage / page_list_size); //전체 세트수
    var curSet = Math.ceil(curPage / page_list_size) // 현재 셋트 번호
    var startPage = ((curSet - 1) * 10) + 1 //현재 세트내 출력될 시작 페이지
    var endPage = (startPage + page_list_size) - 1; //현재 세트내 출력될 마지막 페이지


    //현재페이지가 0 보다 작으면
    if (curPage < 0) {
       no = 0
    } else {
        //0보다 크면 limit 함수에 들어갈 첫번째 인자 값 구하기
        no = (curPage - 1) * 10
    }

    console.log('[0] curPage : ' + curPage + ' | [1] page_list_size : ' + page_list_size + ' | [2] page_size : ' + page_size + ' | [3] totalPage : ' + totalPage + ' | [4] totalSet : ' + totalSet + ' | [5] curSet : ' + curSet + ' | [6] startPage : ' + startPage + ' | [7] endPage : ' + endPage)

    var result2 = {
        "curPage": curPage,
        "page_list_size": page_list_size,
        "page_size": page_size,
        "totalPage": totalPage,
        "totalSet": totalSet,
        "curSet": curSet,
        "startPage": startPage,
        "endPage": endPage
    };

    fs.readFile('list.html', 'utf-8', function (error, data) {

      if (error) {
          console.log("ejs오류" + error);
          return
      }
      console.log("몇번부터 몇번까지냐~~~~~~~" + no)
      
      var queryString = 'select * from topic order by id desc limit ?,?';
      db().query(queryString, [no, page_size], function (error, result) {
        if (error) {
            console.log("페이징 에러" + error);
            return
          }
          res.send(ejs.render(data, {
            data: result,
            pasing: result2
          }));
      });
    });
      
      
  })
})
module.exports = router
      
      
    //메인화면
    router.get("/main", function (req, res) {
    console.log("메인화면")
    //main 으로 들어오면 바로 페이징 처리
    res.redirect('/pasing/' + 1)
    
    });
    
    //삭제
    router.get("/delete/:id", function (req, res) {
    console.log("삭제 진행")
    
    db().query('delete from topic where id = ?', [req.params.id], function () {
    res.redirect('/main')
    });
    
    })
    //삽입 페이지
    router.get("/insert", function (req, res) {
    console.log("삽입 페이지 나와라")
    
    fs.readFile('insert.html', 'utf-8', function (error, data) {
    res.send(data)
    })
    
    })
    //삽입 포스터 데이터
    router.post("/insert", function (req, res) {
    console.log("삽입 포스트 데이터 진행")
    var body = req.body;
    db().query('insert into topic(id,title,created) values (?,?,?)', [body.name, body.num, body.section], function () {
    //응답
    res.redirect('/main');
    })
    
    })
    //수정 페이지
    router.get("/edit/:id", function (req, res) {
    console.log("수정 진행")
    
    fs.readFile('edit.html', 'utf-8', function (error, data) {
    db().query('select * from topic where id = ?', [req.params.id], function (error, result) {
    res.send(ejs.render(data, {
    data: result[0]
    }))
    })
    });
    
    })
    //수정 포스터 데이터
    router.post("/edit/:id", function (req, res) {
    console.log("수정 포스트 진행")
    var body = req.body;
    db().query('update topic set title = ?, description = ?, created = ? where id = ?',
    [body.name, body.num, body.section, req.params.id], function () {
    res.redirect('/main')
    })
    })
    
    
    //글상세보기
    router.get("/detail/:id", function (req, res) {
    console.log("수정 진행")
    
    fs.readFile('detail.html', 'utf-8', function (error, data) {
    db().query('select * from topic where id = ?', [req.params.id], function (error, result) {
    res.send(ejs.render(data, {
    data: result[0]
    }))
    })
    });
    
    
    })
    
  /*
    // db.query(`SELECT * FROM user`, function(error,users){
          var title = 'WEB - create';
          var list = template.list(request.list);
          var html = template.HTML(title, list,
      //       `<h2>${title}</h2>${description}`,
      //       `<a href="/create">create</a>`
      //     );
      `
        <form action="/user/create_process" method="post">
          <p><input type="text" name="title" placeholder="title"></p>
          <p>
            <textarea name="description" placeholder="description"></textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>
      `, '');
      // response.writeHead(200);
      // response.end(html);
      response.send(html);
    });
    
    router.post('/create_process', function(request, response){
      var post = request.body;
      var title = post.title;
      var description = post.description;
      fs.writeFile(`data/${title}`, description, 'utf8', function(err){
        response.redirect(`/user/${title}`);
      });
    });
    
    router.get('/update/:pageId', function(request, response){
      var filteredId = path.parse(request.params.pageId).base;
      fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
        var title = request.params.pageId;
        var list = template.list(request.list);
        var html = template.HTML(title, list,
          `
          <form action="/user/update_process" method="post">
            <input type="hidden" name="id" value="${title}">
            <p><input type="text" name="title" placeholder="title" value="${title}"></p>
            <p>
              <textarea name="description" placeholder="description">${description}</textarea>
            </p>
            <p>
              <input type="submit">
            </p>
          </form>
          `,
          `<a href="/user/create">create</a> <a href="/user/update/${title}">update</a>`
        );
        response.send(html);
      });
    });
    
    router.post('/update_process', function(request, response){
      var post = request.body;
      var id = post.id;
      var title = post.title;
      var description = post.description;
      fs.rename(`data/${id}`, `data/${title}`, function(error){
        fs.writeFile(`data/${title}`, description, 'utf8', function(err){
          response.redirect(`/user/${title}`);
        })
      });
    });
    
    router.post('/delete_process', function(request, response){
      var post = request.body;
      var id = post.id;
      var filteredId = path.parse(id).base;
      fs.unlink(`data/${filteredId}`, function(error){
        response.redirect('/');
      });
    });
    
    router.get('/:pageId', function(request, response, next) { 
      var filteredId = path.parse(request.params.pageId).base;
      fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
        if(err){
          next(err);
        } else {
          var title = request.params.pageId;
          var sanitizedTitle = sanitizeHtml(title);
          var sanitizedDescription = sanitizeHtml(description, {
            allowedTags:['h1']
          });
          var list = template.list(request.list);
          var html = template.HTML(sanitizedTitle, list,
            `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
            ` <a href="/user/create">create</a>
              <a href="/user/update/${sanitizedTitle}">update</a>
              <form action="/user/delete_process" method="post">
                <input type="hidden" name="id" value="${sanitizedTitle}">
                <input type="submit" value="delete">
              </form>`
          );
          response.send(html);
        }
      });
  });
  */

  module.exports = router;