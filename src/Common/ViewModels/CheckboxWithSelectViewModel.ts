import { ISelectViewModel } from "./SelectViewModel";
import { ICheckboxViewModel } from "./CheckBoxViewModel";

export interface ICheckboxWithSelectViewModel<T1, T2> {
  checkbox: ICheckboxViewModel;
  select: ISelectViewModel<T1, T2>;
}

export class CheckboxWithSelectViewModel<T1, T2> implements ICheckboxWithSelectViewModel<T1, T2> {
  public checkbox: ICheckboxViewModel;
  public select: ISelectViewModel<T1, T2>;

  constructor(checkbox: ICheckboxViewModel, select: ISelectViewModel<T1, T2>) {
    this.checkbox = checkbox;
    this.select = select;
  }
}
