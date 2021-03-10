class Singleton {
  private static instance: Singleton = new Singleton();
  constructor() {
    console.log('饿汉单例');
  }
  // 类方法又叫静态方法，实例方法又叫非静态方法
  public static getInstance() {
    return Singleton.instance;
  }
}

export default Singleton;
