export interface IFocusElementViewModel {
  index(): Number;
  name(): String;
}

export class FocusElementViewModel implements IFocusElementViewModel {
  private readonly elementIndex: Number;
  private readonly elementName: String;

  constructor(index: Number, name: String) {
    this.elementIndex = index;
    this.elementName = name;
  }

  public index(): Number {
    return this.elementIndex;
  }
  public name(): String {
    return this.elementName;
  }
}
