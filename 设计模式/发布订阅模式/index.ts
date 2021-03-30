// 主题
class Dep {
  private subs: Sub[];
  private callback: Function;

  constructor(callback) {
    this.subs = [];
    this.callback = callback;
  }

  addSub(sub: Sub) {
    this.subs.push(sub);
    // return this;
  }

  notify() {
    // 通知此主题所有订阅者更新数据
    this.subs.forEach(item => item.update(this.callback))
  }
}

// 订阅者
class Sub {
  private val: any;

  constructor(val) {
    this.val = val;
  }

  update(callback) {
    this.val = callback(this.val);
    //相当于更新视图操作
    console.log(this.val);
  }
}

// 发布者
class Pub {
  private deps: Dep[];

  constructor() {
    this.deps = [];
  }

  addDep(dep: Dep) {
    this.deps.push(dep);
  }

  removeDep(dep: Dep) {
    const index = this.deps.indexOf(dep);
    if (index !== -1) {
      this.deps.splice(index, 1);
      return true
    } else {
      return false
    }
  }

  publish(dep: Dep) {
    //发布某个主题的更新
    this.deps.forEach(item => item == dep && item.notify());
  }
}

//新建主题， 并向主题中增加订阅者
let dep1 = new Dep(item => item * item);
// dep1.addSub(new Sub(1)).addSub(new Sub(2)).addSub(new Sub(3));
dep1.addSub(new Sub(1));
dep1.addSub(new Sub(2));
dep1.addSub(new Sub(3));
//新建发布者， 并向发布者中增加主题
let pub = new Pub();
pub.addDep(dep1);
//发布者发布， 通知所有主题的所有订阅者更新
pub.publish(dep1);
//发布者发布， 通知所有主题的所有订阅者更新
pub.publish(dep1);
console.log("===========================");
//新建主题， 并向主题中增加订阅者
let dep2 = new Dep(item => item + item);
dep2.addSub(new Sub(1));
dep2.addSub(new Sub(2));
dep2.addSub(new Sub(3));
//向发布者中增加主题
pub.addDep(dep2);
//发布者发布， 通知所有主题的所有订阅者更新
pub.publish(dep2);
//发布者发布， 通知所有主题的所有订阅者更新
pub.publish(dep2);

// 1
// 4
// 9
// 1
// 16
// 81
// ===========================
// 2
// 4
// 6
// 4
// 8
// 12