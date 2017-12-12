const ajaxUtility = require('./ajaxUtility');
const view = require('./view');

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
