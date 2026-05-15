import React, { SubmitEventHandler } from "react";
import { RessourceCommonButtonApply } from "../../Common/Ressource";
import InputCheckbox from "./InputCheckbox";
import CheckboxWithSelect, {
  ICheckboxWithSelectOption,
} from "./CheckboxWithSelect";
import Button from "./Button";
import IInput from "../Interfaces/IInput";
import ISelect from "../Interfaces/ISelect";

interface ICheckboxProps {
  id: string;
  name?: string;
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface ICheckboxWithSelectProps {
  checkbox: IInput;
  select: ISelect;
  options: ICheckboxWithSelectOption[];
  wrapperClassName?: string;
  checkboxClassName?: string;
  selectClassName?: string;
}

interface ISettingsForm {
  header: string;
  intro: string;
  checkboxes?: ICheckboxProps[];
  checkboxesWithSelect?: ICheckboxWithSelectProps[];
  handleSubmit: SubmitEventHandler<HTMLFormElement>;
  buttonId?: string;
}

export default function SettingsForm(settings: ISettingsForm) {
  const {
    header,
    intro,
    checkboxes = [],
    checkboxesWithSelect = [],
    handleSubmit,
    buttonId = "apply-settings",
  } = settings;
  return (
    <>
      <h1 className="w3-xxxlarge w3-text-red">
        <b>{header}</b>
      </h1>
      <hr style={{ width: 50, border: "5px solid red" }} className="w3-round" />
      {intro}

      <form onSubmit={handleSubmit}>
        {checkboxes.map((checkbox: ICheckboxProps) => (
          <InputCheckbox
            key={checkbox.id}
            id={checkbox.id}
            name={checkbox.name}
            label={checkbox.label}
            checked={checkbox.checked}
            onChange={checkbox.onChange}
          />
        ))}
        {checkboxesWithSelect.map(
          (item: ICheckboxWithSelectProps, index: number) => (
            <CheckboxWithSelect
              key={item.checkbox.id || `checkbox-with-select-${index}`}
              checkbox={item.checkbox}
              select={item.select}
              options={item.options}
              wrapperClassName={item.wrapperClassName}
              checkboxClassName={item.checkboxClassName}
              selectClassName={item.selectClassName}
            />
          ),
        )}
        <Button
          id={buttonId}
          type="submit"
          title={new RessourceCommonButtonApply().value().toString()}
          value={new RessourceCommonButtonApply().value().toString()}
        />
      </form>
    </>
  );
}
