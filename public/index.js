document.addEventListener("DOMContentLoaded", function() {
  loadItems();

  //Validation
  var email = document.querySelector('#email');
  email.addEventListener("blur", validateEmail);

  var phone = document.querySelector('#phone');
  phone.addEventListener("blur", validatePhone);

  //Validate inputs and create item
  var addBtn = document.querySelector('#add');
  addBtn.addEventListener("click", function() {
    if (validateResult) {
      createItem();
    }
    else {
      alert('Please fill inputs correct');
    }
  });
});


//Validation
var validateResult = false;

function validateEmail() {
  var regexEmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
  var value = this.value;
  var label = document.querySelector('[for=email]');

  if(!regexEmail.test(value)) {
    validateResult = false;
    label.classList.add('incorrect');
  }
  else {
    validateResult = true;
    label.classList.remove('incorrect');
  }
}

function validatePhone() {
  var regexPhone1 = /^\+375\d{9}$/;
  var regexPhone2 = /^\8017\d{7}$/;

  var value = this.value;
  var label = document.querySelector('[for=phone]');

  if(regexPhone1.test(value) || regexPhone2.test(value)) {
    validateResult = true;
    label.classList.remove('incorrect');
  }
  else {
    validateResult = false;
    label.classList.add('incorrect');
  }
}

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
  var table = body.appendChild(document.createElement('table'));
  var tr = table.appendChild(document.createElement('tr'));
  var thArr = ['name', 'email', 'phone', ''];
  thArr.forEach(function(thValue) {
    var th = tr.appendChild(document.createElement('th'));
    th.innerHTML = thValue;
  });

  if (items.length) {
    items.forEach(function(item) {
        fillTable(item);
    });
  }
}

function fillTable(item) {
  var table = document.querySelector('table');
  var tr = table.appendChild(document.createElement('tr'));
  for (prop in item) {
    if(prop === 'id') {
      tr.setAttribute('data-id', item[prop]);
      createRemoveButton()
    }
    else {
      var td = tr.appendChild(document.createElement('td'));
      td.innerHTML = item[prop];
    }
  }
}

function createRemoveButton() {
  var trArr = document.querySelectorAll('tr');
  var tdDel = trArr[trArr.length - 1].appendChild(document.createElement('td'));
  var btnDel =  tdDel.appendChild(document.createElement('button'));
  btnDel.innerHTML = 'Remove';
  btnDel.addEventListener("click", removeItem);
}

//Create items
function createItem() {
  var name = document.querySelector('#name').value;
  var email = document.querySelector('#email').value;
  var phone = document.querySelector('#phone').value;

  clearInputs();

  var xhr = new XMLHttpRequest();
  var newItem = 'name=' + encodeURIComponent(name) + '&email=' + encodeURIComponent(email) + '&phone=' + encodeURIComponent(phone);

  xhr.open("POST", '/items', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(newItem);

  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4) return;
    if (xhr.status != 200) {
      console.log(xhr.status + ': ' + xhr.statusText);
    }
    else {
      fillTable(JSON.parse(xhr.responseText));
    }
  }
}

function clearInputs() {
  var inputs = document.querySelectorAll('input');
  inputs.forEach(function(input) {
    input.value = '';
  });
}

//Remove item
function removeItem() {
  var id = this.parentNode.parentNode.getAttribute('data-id');

  var xhr = new XMLHttpRequest();
  var url = '/items?id=' + id;
  xhr.open("DELETE", url, true);
  xhr.send();

  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4) return;
    if (xhr.status != 200) {
      console.log(xhr.status + ': ' + xhr.statusText);
    }
    else {
      removeRow(JSON.parse(xhr.responseText));
    }
  }
}

function removeRow(item) {
  var rowArr = document.querySelectorAll('[data-id]');
  rowArr.forEach(function(row) {
    if (row.getAttribute('data-id') === item[0].id) {
      document.querySelector('table').removeChild(row);
    }
  })
}
