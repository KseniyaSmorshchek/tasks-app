module.exports = {
  ajaxUtility: function (method, url, callback, reqBody) {
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
}
