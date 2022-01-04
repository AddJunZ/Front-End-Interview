## RPC(Remote Procedure Call) 远程过程调用
> 服务器A想要调用服务器B的服务，则需要进行远程调用。常用的RPC框架：[grpc](https://grpc.io/docs/what-is-grpc/introduction/)底层使用的http2.0、[dubbo](https://dubbo.apache.org/zh/)

### 1. RPC架构
一个完整的RPC架构包含四个核心组件：客户端(Client)、客户端存根(Client Stub)、服务端(Server)、服务端存根(Server Stub)。
* Client: 服务的调用方
* Client Stub: 存放服务端的地址信息，再将客户端的请求方法、参数打包成网络消息，然后通过网络远程发送给服务方
* Server: 服务的提供方
* Server Stub: 接受客户端发送过来的消息，将消息解包，并调用本地方法

![image](https://github.com/AddJunZ/Front-End/blob/master/img/rpc_20220101.jpeg)

RPC的目标是要把2、3、4、7、8、9这些步骤都封装起来。同时交换数据的过程需要进行序列化和反序列化的操作，只有二进制数据才能在网络中传输。将对象转换成二进制流称为序列化，反之为反序列化。

### 2. 注册中心
3和8的过程需要借助**注册中心**，Server将自己的服务注册到注册中心中，Client则去注册中心发现服务，完成服务的调用。Server告诉注册中心自己的IP和对应能提供的服务。

### 3. 分类
1. 通讯协议：
- 基于HTTP协议: 基于文本的Simple Object Access Protocol(XML); Rest(JSON);基于二进制Hessian(Binary)
- 基于TCP协议（通常会借助Mina、Netty等高性能网络框架）

Q：
1. RPC和和直接后台调用后台的区别是啥

参考文献：
[RPC原理解析](https://www.cnblogs.com/swordfall/p/8683905.html),
[Java RMI框架](https://blog.51cto.com/haolloyin/332426),
[RMI网络编程开发之二 如何搭建基于JDK1.5的分布式JAVA RMI 程序](https://blog.51cto.com/u_6221123/1112619),
[直观讲解一下 RPC 调用和 HTTP 调用的区别](https://www.jianshu.com/p/b0350ef9a0bb),
[既然有 HTTP 请求，为什么还要用 RPC 调用](https://www.zhihu.com/question/41609070)
