class Giraff {
  private static instance: Giraff = null;

  public static getInstance() {
    if (this.instance == null) {
      this.instance = new Giraff();
    }
    return this.instance;
  }

  public in(): void {
    console.log('Giraff in');
  }

  public out(): void {
    console.log('Giraff out');
  }
}

export default Giraff;
