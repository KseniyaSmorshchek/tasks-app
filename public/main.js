const formValidation = require('./formValidation');
const items = require('./items');

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
