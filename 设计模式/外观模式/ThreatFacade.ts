import Elephant from "./app/Elephant";
import Fridge from "./app/Fridge";
import Giraffe from "./app/Giraffe";

class ThreatFacade {
  private elephant: Elephant;
  private fridge: Fridge;
  private giraffe: Giraffe;

  constructor() {
    this.elephant = new Elephant();
    this.fridge = new Fridge();
    this.giraffe = new Giraffe();
  }

  public step1(): void {
    console.log('把大象放进冰箱里');
    this.fridge.on();
    this.elephant.in();
  }

  public step2(): void {
    console.log('把长颈鹿放进冰箱里');
    this.elephant.out();
    this.giraffe.in();
    this.fridge.off();
  }
}

export default ThreatFacade;