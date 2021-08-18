// Fetch the items from the JSON file
function loadItems() {
    return fetch('data/contest.json')
      .then(response => response.json())
      .then(json => json.items);
  }
  
  // Update the list with the given items
  function displayItems(items) {
    const container = document.querySelector('.items');
    container.innerHTML = items.map(item => createHTMLString(item)).join('');
  }
  
  // Create HTML list item from the given data item
  function createHTMLString(item) {
    return `
      <li class="item"><br>
        <span class="item__nickname">${item.제목}</span><br><br>
        <span class="item__description">${item.내용}</span>
      </li>
      `;
  }
  
  // main
  loadItems()
    .then(items => {
      displayItems(items);
    })
    .catch(console.log); // error msg