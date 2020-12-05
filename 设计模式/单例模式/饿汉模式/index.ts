import Singleton from './Starving';

const obj1: Singleton = Singleton.getInstance();
const obj2: Singleton = Singleton.getInstance();

// 单例模式返回的是同一个对象实例
console.log(obj1 === obj2); // true