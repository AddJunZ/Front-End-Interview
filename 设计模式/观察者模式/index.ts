class Observer {
  name: string;
  constructor(name) {
    this.name = name;
  }
  update(msg) {
    console.log(`${this.name}收到消息${msg}`);
  }
}
class Subject {
  state: Boolean;
  list: Array<Observer>;
  constructor(state : Boolean) {
    this.state = state;
    this.list = [];
  }
  setState(newState) {
    this.state = newState;
    // 发布通知
    this.list.map(l => l.update(newState));
  }
  attach(ob: Observer) {
    this.list.push(ob);
    return this;
  }
  // remove(ob:Observer) {
  //   const index = this.list.findIndex(o => o === ob);
  //   this.list.splice(index, 1);
  // }
}
const sub = new Subject(true);
const ob1 = new Observer('ob1');
const ob2 = new Observer('ob2');
sub.attach(ob1);
sub.attach(ob2);
sub.setState(false);
// sub.remove(ob1);
// sub.setState(true);
// 输出结果
// ob1收到消息false
// ob2收到消息false