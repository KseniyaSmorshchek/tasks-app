/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

function validateEmail(field) {
  const regexEmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
  let value = field.value;
  let label = document.querySelector('[for=email]');

  if(!regexEmail.test(value)) {
    label.classList.add('incorrect');
    return false;
  }
  else {
    label.classList.remove('incorrect');
    return true;
  }
}

function validatePhone(field) {
  const regexPhone1 = /^\+375\d{9}$/;
  const regexPhone2 = /^\8017\d{7}$/;

  let value = field.value;
  let label = document.querySelector('[for=phone]');

  if(regexPhone1.test(value) || regexPhone2.test(value)) {
    label.classList.remove('incorrect');
    return true;
  }
  else {
    label.classList.add('incorrect');
    return false;
  }
}

module.exports = {
  validateEmail: validateEmail,
  validatePhone: validatePhone
}


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

const ajaxUtility = __webpack_require__(2);
const view = __webpack_require__(3);

//Get and show items
function loadItems() {
  ajaxUtility('GET', '/items', view.showItems);
}

//Create items
function createItem() {
  let email = document.querySelector('#email').value;
  let phone = document.querySelector('#phone').value;
  let name = document.querySelector('#name').value;
  view.clearInputs();

  let newItem = 'name=' + encodeURIComponent(name) + '&email=' + encodeURIComponent(email) + '&phone=' + encodeURIComponent(phone);
  ajaxUtility('POST', '/items', view.fillTable, newItem);
}

//Remove item
function removeItem() {
  let id = this.parentNode.parentNode.getAttribute('data-id');
  let url = '/items?id=' + id;

  ajaxUtility('DELETE', url, view.removeRow);
}

module.exports = {
  loadItems: loadItems,
  createItem: createItem,
  removeItem: removeItem
}


/***/ },
/* 2 */
/***/ function(module, exports) {

function ajaxUtility(method, url, callback, reqBody) {
  let xhr = new XMLHttpRequest();

  xhr.open(method, url, true);
  if (reqBody) {
    xhr.send(reqBody);
  }
  else {
    xhr.send();
  }
  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4) return;
    if (xhr.status != 200) {
      console.log(xhr.status + ': ' + xhr.statusText);
    }
    else {
      callback(JSON.parse(xhr.responseText));
    }
  }
}

module.exports = ajaxUtility;


/***/ },
/* 3 */
/***/ function(module, exports) {

// Fill the table with DB data
function fillTable(item) {
  let table = document.querySelector('table');
  let tr = table.appendChild(document.createElement('tr'));
  td = tr.appendChild(document.createElement('td'));
  td = tr.appendChild(document.createElement('td'));
  let div = td.appendChild(document.createElement('div'));
  div.classList.add('item-img');
  div.innerHTML = item.name.charAt(0);
  for (prop in item) {
    if(prop === 'id') {
      tr.setAttribute('data-id', item[prop]);
      createRemoveButton()
    }
    else {
      td = tr.appendChild(document.createElement('td'));
      td.innerHTML = item[prop];
    }
  }
  fillRowNumber();
}

// Show the table with items
function showItems(items) {
  let body = document.querySelector('body');
  let div = body.appendChild(document.createElement('div'));
  div.classList.add('table-wrapper');
  let table = div.appendChild(document.createElement('table'));
  if (items.length) {
    items.forEach(function(item) {
        fillTable(item);
        fillRowNumber();
    });
  }
}

// Set rows order
function fillRowNumber() {
  let trArr = document.querySelectorAll('tr');
  trArr.forEach(function(tr, i) {
      let td = tr.querySelector('td:first-child');
      td.innerHTML = i+1;
  });
}

// Create button, which removes items
function createRemoveButton() {
  let trArr = document.querySelectorAll('tr');
  let tdDel = trArr[trArr.length - 1].appendChild(document.createElement('td'));
  let btnDel =  tdDel.appendChild(document.createElement('button'));
  btnDel.classList.add('remove');
}

// Clear form inputs
function clearInputs() {
  let inputs = document.querySelectorAll('input');
  inputs.forEach(function(input) {
    input.value = '';
  });
}

// Remove the row
function removeRow(item) {
  let rowArr = document.querySelectorAll('[data-id]');
  rowArr.forEach(function(row) {
    if (row.getAttribute('data-id') === item[0].id) {
      document.querySelector('table').removeChild(row);
    }
  })
  fillRowNumber();
}

module.exports = {
  fillTable: fillTable,
  showItems: showItems,
  removeRow: removeRow,
  clearInputs: clearInputs
}


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

const formValidation = __webpack_require__(0);
const items = __webpack_require__(1);

document.addEventListener("DOMContentLoaded", function() {
  // Load and show items
  items.loadItems();

  // Validation
  let email = document.querySelector('#email');
  email.addEventListener("blur", function() {
    formValidation.validateEmail(this);
  });
  let phone = document.querySelector('#phone');
  phone.addEventListener("blur", function() {
    formValidation.validatePhone(this);
  });

  // Register hadler function for the button, which create items
  let addBtn = document.querySelector('#add');
  addBtn.addEventListener("click", function() {
    if (formValidation.validateEmail(email) && formValidation.validatePhone(phone)) {
      items.createItem();
    }
  });

  // Register hadler function for the button, which removes items
  let body = document.querySelector('body');
  body.addEventListener("click", function(e) {
    let btnDelArr = document.querySelectorAll('.remove');
    btnDelArr.forEach(function(btnDel) {
      if (btnDel === e.target) {
        items.removeItem.apply(btnDel);
      }
    });
  });
});


/***/ }
/******/ ]);