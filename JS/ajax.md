<!-- ajax.md -->
## ajax
### 原生ajax
```js
var ajax = (url) => {
  var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : ActiveXObject("microsoft.XMLHttp")
  xhr.open('get',url,true)
  xhr.send();
  xhr.onreadystatechange = () => {
    if(xhr.readyState == 4 && xhr.status == 200){
      return xhr.responseText;
    }
  }
}
```

### get方式
```js
var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : ActiveXObject("microsoft.XMLHttp")
xhr.open('get','/getData?id=123',true)
xhr.send();
xhr.onreadystatechange = () => {
  if(xhr.readyState == 4 && xhr.status == 200){
    return xhr.responseText;
  }
}
```

### post方式
```js
var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : ActiveXObject("microsoft.XMLHttp")
xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded")
xhr.open('post','/getData',true)
xhr.send('id=123');
xhr.onreadystatechange = () => {
  if(xhr.readyState == 4 && xhr.status == 200){
    return xhr.responseText;
  }
}
```

### 使用Promise封装ajax
```js
var promiseAjax = (url) => {
  return new Promise((resolve,reject)=>{
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : ActiveXObject("microsoft.XMLHttp")
    xhr.open('get',url,true)
    xhr.send();
    xhr.onreadystatechange = () => {
      if(xhr.readyState == 4 && xhr.status == 200){
        resolve(xhr.responseText);
      }
    }
  })
}
```
