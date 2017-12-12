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
