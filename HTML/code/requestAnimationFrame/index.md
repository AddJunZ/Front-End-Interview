### requestAnimationFrame与浏览器帧率

> 针对旋转动画，其实有很多疑问，为什么id明明被覆盖了 下次却还是能找到id并成功消除呢

第一次stop
![image](https://github.com/AddJunZ/Front-End/blob/master/img/requestAnimationFrame-once.png)

第二次stop
![image](https://github.com/AddJunZ/Front-End/blob/master/img/requestAnimationFrame-twice.png)


在点击方块两次的基础上，触发一次stop事件

![image](https://github.com/AddJunZ/Front-End/blob/master/img/requestAnimationFrame-afterstop.png)