const ajaxUtility = require('./ajaxUtility');
const view = require('./view');

module.exports = {
  //Get and show items
  loadItems: function() {
    ajaxUtility.ajaxUtility('GET', '/items', view.showItems);
  },
  //Create items
  createItem: function() {
    let email = document.querySelector('#email').value;
    let phone = document.querySelector('#phone').value;
    let name = document.querySelector('#name').value;
    view.clearInputs();

    let newItem = 'name=' + encodeURIComponent(name) + '&email=' + encodeURIComponent(email) + '&phone=' + encodeURIComponent(phone);
    ajaxUtility.ajaxUtility('POST', '/items', view.fillTable, newItem);
  },
  //Remove item
  removeItem: function() {
    let id = this.parentNode.parentNode.getAttribute('data-id');
    let url = '/items?id=' + id;

    ajaxUtility.ajaxUtility('DELETE', url, view.removeRow);
  }
}
