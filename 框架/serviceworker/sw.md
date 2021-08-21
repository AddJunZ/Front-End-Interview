## Service Worker

### 1. 概念和用法
SW是一个介于web应用程序、浏览器、（可用）网络之间的代理服务器。它通过拦截网络请求，根据网络的可用性采取适当的动作。

2. 单个sw`Unregister`之后，再次刷新页面为什么，还会重新注册该sw任务。运行过的sw缓存的资源会放在浏览器的`Cache`里面。
3. 清空浏览器硬性加载的时候，第一次进入会显示不出页面，等一下就加载出来了。

### 2. 关于官网（sw-test.js）的一些测试
第一次打开布置有sw的[网络站点](https://mdn.github.io/sw-test/)，会触发sw的`reg.installing`钩子。sw文件注册的路径是相对于`Origin`，而不是文件所在位置。如果sw注册的路径是`/example/sw.js`，那么它就只收到`example`路径下的fetch事件。
```js
// app.js 入口文件
navigator.serviceWorker.register('/sw.js', { scope: '/sw-test' }).then(function(reg) {
  if(reg.installing) {
    console.log('Service worker installing');
  } else if(reg.waiting) {
    console.log('Service worker installed');
  } else if(reg.active) {
    console.log('Service worker active');
  }
}).catch(function(error) {
  console.log('Registration failed with ' + error);
});
```
同时`Cache Storage`中存有`sw.js`文件内定义好的`Cache`需要缓存的对应资源
```js
// sw.js service worker服务文件
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        // 需要cache做缓存的资源路径地址，依然是要带上 Origin 源
        '/sw-test/',
        '/sw-test/index.html',
        '/sw-test/style.css',
        '/sw-test/app.js',
        '/sw-test/image-list.js',
        '/sw-test/star-wars-logo.jpg',
      ]);
    })
  );
});
```
同时Google的dev tools的Server Workers里面已经注册好对应的sw服务。切换其他域名地址就看不到对应的sw服务了。
