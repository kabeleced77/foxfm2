export interface ICheckboxViewModel {
  state: Boolean;
  label: String;
}

export class CheckboxViewModel implements ICheckboxViewModel {
  public state: Boolean;
  public label: String;

  constructor(state: Boolean, label: String) {
    this.state = state;
    this.label = label;
  }
}
