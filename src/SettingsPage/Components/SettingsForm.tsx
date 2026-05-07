import React, { SubmitEventHandler } from "react";
import { RessourceCommonButtonApply } from "../../Common/Ressource";
import InputCheckbox from "./InputCheckbox";
import Button from "./Button";

interface ICheckboxProps {
  id: string;
  name?: string;
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface ISettingsForm {
  header: string;
  intro: string;
  checkboxes: ICheckboxProps[];
  handleSubmit: SubmitEventHandler<HTMLFormElement>;
}

export default function SettingsForm(settings: ISettingsForm) {
  const { header, intro, checkboxes, handleSubmit } = settings;
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
        <Button
          id="apply-settings"
          type="submit"
          title={new RessourceCommonButtonApply().value().toString()}
          value={new RessourceCommonButtonApply().value().toString()}
        />
      </form>
    </>
  );
}
