class Singleton {
  private static instance: Singleton = null;
  constructor() {
    console.log('懒汉单例');
  }
  public getInstance() {
    if(!Singleton.instance){
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
}

export default Singleton;