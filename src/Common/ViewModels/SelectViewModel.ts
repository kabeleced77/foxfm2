export interface ISelectViewModel<T> {
  options: Array<T>;
  selectedOption: Number;
}

export class SelectViewModel<T> implements ISelectViewModel<T> {
  public options: Array<T>;
  public selectedOption: Number;

  constructor(options: Array<T>, selectedOption: Number) {
    this.options = options;
    this.selectedOption = selectedOption;
  }
}
