import { IValue } from "./IValue";

export class Sum implements IValue<Number> {
  constructor(
    private readonly moAugend: IValue<Number>,
    private readonly miAddend: number,
  ) { }

  public value(): Number {
    return this.moAugend.value().valueOf() + this.miAddend;
  }
}
