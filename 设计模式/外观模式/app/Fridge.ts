class Fridge {
  private static instance: Fridge = null;

  public static getInstance() {
    if (this.instance == null) {
      this.instance = new Fridge();
    }
    return this.instance;
  }

  public on(): void {
    console.log('fridge on');
  }

  public off(): void {
    console.log('fridge off');
  }
}

export default Fridge;
