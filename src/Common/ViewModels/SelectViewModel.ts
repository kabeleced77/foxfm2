export interface ISelectViewModel<T1, T2> {
  options: Array<T1>;
  selectedOption: T2;
}

export class SelectViewModel<T1, T2> implements ISelectViewModel<T1, T2> {
  public options: Array<T1>;
  public selectedOption: T2;

  constructor(
    options: Array<T1>,
    selectedOption: T2
  ) {
    this.options = options;
    this.selectedOption = selectedOption;
  }
}
