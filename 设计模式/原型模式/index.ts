function extendsClass(Parent, Child) {
  function F() {}
  F.prototype = Parent.prototype;
  Child.prototype = new F();
  Child.prototype.constructor = Child;
  return Child;
}

function Animal(name) {
  this.name = name;
}

Animal.prototype.getName = function() {
  return this.name;
}

Animal.prototype.live = function() {
  console.log('live: 出生到死亡');
}

function Dog(name) {
  this.name = name;
}

// 原型式继承
// 这行代码的位置挺重要的
// 否则后面对Dog.prototype挂在的属性方法
// 就会在函数extendsClass内丢失

// 哈士奇 ==> 狗的名字是：哈士奇
extendsClass(Animal, Dog);

Dog.prototype.getName = function() {
  return `狗的名字是：${this.name}`;
}

const dog = new Dog('哈士奇');

dog.live();
console.log(dog);
const dogName = dog.getName();
console.log(dogName);

// live: 出生到死亡
// 哈士奇
