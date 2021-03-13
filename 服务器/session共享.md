## session共享

当网站的访问量上去后，一般会采用web集群的方式满足用户量的增长，但在多个服务器下，每次请求都会因为**负载均衡**而被分配到不同的服务器上。用户在登录服务器后，下一次请求被分配到另一个服务器上，这时候session就不同步，用户就无法继续使用之前的session。

### 1. 使用mysql数据库共享session数据

使用一个mysql服务器做共享服务器，把所有的session的数据保存在mysql服务器上，所有web服务器都来这台mysql服务器获取session。**session数据库表不要和其他数据库表放在一起**

### 2. 使用cookie共享session数据

当用户请求产生session后，服务器将sessionid和值都保存在cookie里，这样访问a服务器后，产生来session放在客户端的cookie里面。再次访问b服务器，b服务器首先会判断服务器上有没有这个用户的session，如果没有，会去看客户端的cookie里面有没有这个session，如果有，就获取客户端的这个cookie里面的session，从而实现**session同步**

### 3. 使用内存来共享session数据

不管哪个服务器产生的session都放在一个"内存池"里面。要获取session数据的时候都统一到这里获取。我建议用这个方法。