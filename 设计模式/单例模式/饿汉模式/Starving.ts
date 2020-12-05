class Singleton {
  private static instance: Singleton = new Singleton();
  constructor() {
    console.log('饿汉单例');
  }
  public getInstance() {
    return Singleton.instance;
  }
}

export default Singleton;
