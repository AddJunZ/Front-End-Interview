## deeplink

> [deeplink](https://cloud.tencent.com/developer/article/1049347)

deeplink是一种在手机上点击某个连接后，可以直接到达app内的某个页面的一种技术方案，而不是正常打开时显示的首页。不像web，一个链接就可以打开web的内页，app的内页打开，必须使用deeplink技术。


### 1. URL Scheme

在技术上实现两个app的横向调用，需要用到Scheme技术。假如要从APP-F调用APP-T

1. APP-F要进行自定义scheme的配置（IOS是info文件，Android是activity），并且进行参数处理的coding
2. APP-F进行调用，首先判断设备是否安装APP-T
3. 如果未安装，则跳转APP-T的web版应用或者是跳转到APP Store等应用市场下载
4. 如果已经安装，则调用APP-T配置好的URL Scheme，直接打开APP-T配置好的URL SCHEME，直接打开APP-T的相关界面

![image](https://github.com/AddJunZ/Front-End/blob/master/img/scheme.png)

### 2. deeplink的支持条件
1. APP要被其他APP打开，自身得支持，让自己具备被别人打开的能力（URL Scheme）
2. APP想要打开其他的APP，自身也得支持（判断设备是否安装，各种跳转的处理）
> web页面判断手机里是否安转应用的原理就是：首先试着打开手机端某个app的本地协议；如果超时就转到app下载页，下载该app。

### 3. deeplink在广告上的应用
1. 广告主APP支持
2. 按照平台进行定投
3. 将广告主的APP的URL SCHEME地址、未安装跳转地址（包名/appid/landing page）发给adx
4. 点击广告后，媒体端通过js代码进行调用（设备安装判断、URL SCHEME端跳转等）
