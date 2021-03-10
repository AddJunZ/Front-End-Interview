class Singleton {
  private static instance: Singleton = null;
  constructor() {
    console.log('懒汉单例');
  }
  // 实例方法不需要加static
  public getInstance() {
    if(!Singleton.instance){
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
}

export default Singleton;