// 观察者模式和订阅发布的主要区别是
// 发布订阅没有把自己的观察者身份挂到发布者上？


// class Subject{
//   constructor(name){
//     this.name = name
//     this.state = 'W'
//     // 观察者列表
//     this.attachList = [];
//   }
//   // 更新状态(相当于发布)
//   setState(state){
//     this.state = state
//     // 通知
//     this.attachList.forEach(x => x.update(this.state))
//   }

//   // 添加观察者(相当于添加订阅者)
//   attach(obj){
//     this.attachList.push(obj)
//   }
// }

// class Observer{
//   constructor(name){
//     this.name = name
//   }
//   update(newState){
//     console.log(`你监测的状态变了，变成${newState}`);
//   }
// }

// let ee = new Subject('baby')
// let er1 = new Observer('huihui');
// let er2 = new Observer('addjun');
// ee.attach(er1)
// ee.attach(er2)
// ee.setState('F');



// 发布订阅(借助中介)
let events = {
  list =[],
  on(){
    
  },
  emit(){

  }
}
class Publisher{
  constructor(name){
    this.name = name
    this.state = 'W'
    // 观察者列表
    this.attachList = [];
  }
  // 更新状态(相当于发布)
  setState(state){
    this.state = state
    // 通知
    this.attachList.forEach(x => x.update(this.state))
  }
}

class Subscriber{
  constructor(name){
    this.name = name
  }
  update(newState){
    console.log(`你监测的状态变了，变成${newState}`);
  }  
}