## RPC(Remote Procedure Call) 远程过程调用
> 服务器A想要调用服务器B的服务，则需要进行远程调用

### 1. RPC架构
一个完整的RPC架构包含四个核心组件：客户端(Client)、客户端存根(Client Stub)、服务端(Server)、服务端存根(Server Stub)。
* Client: 服务的调用方
* Client Stub: 存放服务端的地址信息，再将客户端的请求参数打包成网络消息，然后通过网络远程发送给服务方
* Server: 服务的提供方
* Server Stub: 接受客户端发送过来的消息，将消息解包，并调用本地方法

![image](https://github.com/AddJunZ/Front-End/blob/master/img/rpc_20220101.jpeg)

RPC的目标是要把2、3、4、7、8、9这些步骤都封装起来。

Q：
1. RPC和和直接后台调用后台的区别是啥

参考文献：
[RPC原理解析](https://www.cnblogs.com/swordfall/p/8683905.html)
