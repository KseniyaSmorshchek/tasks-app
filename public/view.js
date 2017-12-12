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
