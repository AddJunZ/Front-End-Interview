class Elephant {
  private static instance: Elephant = null;

  public static getInstance() {
    if (this.instance == null) {
      this.instance = new Elephant();
    }
    return this.instance;
  }

  public in(): void {
    console.log('Elephant in');
  }

  public out(): void {
    console.log('Elephant out');
  }
}

export default Elephant;