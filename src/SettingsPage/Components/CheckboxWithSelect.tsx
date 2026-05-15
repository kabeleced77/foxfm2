import InputCheckbox from "./InputCheckbox";
import Select from "./Select";
import IInput from "../Interfaces/IInput";
import ISelect from "../Interfaces/ISelect";

export interface ICheckboxWithSelectOption {
  value: string | number;
  label: string;
}

export interface ICheckboxWithSelectProps {
  checkbox: IInput;
  select: ISelect;
  options: ICheckboxWithSelectOption[];
  wrapperClassName?: string;
  checkboxClassName?: string;
  selectClassName?: string;
}

export default function CheckboxWithSelect({
  checkbox,
  select,
  options,
  wrapperClassName = "w3-row",
  checkboxClassName = "w3-col m9",
  selectClassName = "w3-col m3",
}: ICheckboxWithSelectProps) {
  return (
    <div className={wrapperClassName} style={{ alignItems: "center" }}>
      <div className={checkboxClassName}>
        <InputCheckbox {...checkbox} />
      </div>
      <div className={selectClassName}>
        <Select select={select}>
          {options.map((option) => (
            <option key={option.value.toString()} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
}
