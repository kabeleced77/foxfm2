import { ISelectViewModel } from "./SelectViewModel";
import { ICheckboxViewModel } from "./CheckBoxViewModel";

export interface ICheckboxWithSelectViewModel<T> {
  checkbox: ICheckboxViewModel;
  select: ISelectViewModel<T>;
}

export class CheckboxWithSelectViewModel<T> implements ICheckboxWithSelectViewModel<T> {
  public checkbox: ICheckboxViewModel;
  public select: ISelectViewModel<T>;

  constructor(checkbox: ICheckboxViewModel, select: ISelectViewModel<T>) {
    this.checkbox = checkbox;
    this.select = select;
  }
}
