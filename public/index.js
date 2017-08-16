document.addEventListener("DOMContentLoaded", function() {
  loadItems();

  var btn = document.querySelector('#add');
  btn.addEventListener("click", createItem);
});



//Get and show items
function loadItems() {
  var xhr = new XMLHttpRequest();

  xhr.open('GET', '/items', true);
  xhr.send();
  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4) return;
    if (xhr.status != 200) {
      console.log(xhr.status + ': ' + xhr.statusText);
    }
    else {
      showItems(JSON.parse(xhr.responseText));
    }
  }
}

function showItems(items) {
  var body = document.querySelector('body');
  if (items.length) {
    var table = body.appendChild(document.createElement('table'));
    fillTable(items[0], false);

    items.forEach(function(item) {
        fillTable( item, true);
    });
  }
}

function fillTable(item, isValue) {
  var table = document.querySelector('table');
  var tr = table.appendChild(document.createElement('tr'));
  for (prop in item) {
    var td = table.appendChild(document.createElement('td'));
    if(isValue) {
      td.innerHTML = item[prop];
    }
    else {
      td.innerHTML = prop;
    }
  }
}

//Create items

function createItem() {
  var name = document.querySelector('#name').value;
  var email = document.querySelector('#email').value;
  var phone = document.querySelector('#phone').value;

  var xhr = new XMLHttpRequest();
  var newItem = 'name=' + encodeURIComponent(name) + '&email=' + encodeURIComponent(email) + '&phone=' + encodeURIComponent(phone);

  xhr.open("POST", '/items', true)
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  xhr.send(newItem);

  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4) return;
    if (xhr.status != 200) {
      alert(xhr.status + ': ' + xhr.statusText);
    }
    else {
      fillTable(JSON.parse(xhr.responseText), true);
    }
  }
}
