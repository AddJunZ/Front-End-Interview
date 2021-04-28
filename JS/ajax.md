<!-- ajax.md -->
## ajax
### 原生ajax
```js
var ajax = (url) => {
  var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : ActiveXObject("microsoft.XMLHttp")
  xhr.open('get',url,true)
  xhr.send();
  xhr.onreadystatechange = () => {
    // 0：请求未初始化，还没有调用 open()
    // 1：请求已经建立，但是还没有发送，还没有调用 send()
    // 2：请求已发送，正在处理中（通常现在可以从响应中获取内容头）
    // 3：请求在处理中；通常响应中已有部分数据可用了，没有全部完成
    // 4：响应已完成；您可以获取并使用服务器的响应了
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
