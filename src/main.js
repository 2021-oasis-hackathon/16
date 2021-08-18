var db = require('../db');
var template = require('../template.js');
var qs = require('querystring');
var fs = require('fs');
var sanitizeHtml = require('sanitize-html');

// Fetch the items from the JSON file
// function loadItems() {
//   return fetch('../data/data.json')
//     .then(response => response.json())
//     .then(json => json.items);
// }

// Update the list with the given items
function displayItems(items) {
  const container = document.querySelector('.items');
  container.innerHTML = items.map(item => createHTMLString(item)).join('');
}

exports.home = function(request, response){
  db.query(`SELECT * FROM topic`, function(error,topics) {
      var title = 'Welcome';
      var description = 'Hello, Node.js';
      var list = template.list(topics);
      var html = template.HTML(title, list,
        `<h2>${title}</h2>${description}`,
        `<a href="/create">create</a>`
      );
      response.writeHead(200);
      response.end(html);
});
}

// Create HTML list item from the given data item
function createHTMLString(item) {
  return `
    <li class="item"><br>
      <span class="item__nickname">${item.닉네임}</span><br><br>
      <span class="item__description">${item.학교}<br>${item.전공}<br>${item.관심분야}</span>
    </li>
    `;
}

// main
// loadItems()
//   .then(items => {
//     displayItems(items);
//     // setEventListeners(items);
//   })
//   .catch(console.log); // error msg
