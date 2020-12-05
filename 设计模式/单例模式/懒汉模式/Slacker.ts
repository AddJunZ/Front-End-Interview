class Singleton {
  private static instance: Singleton
  constructor() {
    console.log('懒汉单例');
  }
  getInstance() {
    if(!Singleton.instance){
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
}

export default Singleton;