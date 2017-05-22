export interface IDom {
  dom(): Document;
}

export class Dom implements IDom {
  private domField: Document;

  constructor(dom: Document) {
    this.domField = dom;
  }

  public dom(): Document {
    return this.domField;
  }
}
