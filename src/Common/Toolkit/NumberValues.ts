import { IValues } from "./Values";

export class NumberValues implements IValues<Number>{
  private readonly numbers: Number[];

  constructor(
    numbers: Number[]
  ) {
    this.numbers = numbers;
  }

  public values(): Number[] {
    return this.numbers;
  }
}
