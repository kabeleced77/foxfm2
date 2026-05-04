import IInput from "../Interfaces/IInput";
import React, { useState, useEffect } from "react";

export default function InputCheckbox(input: IInput) {
  const [inputChecked, setInputChecked] = useState(input.checked);

  useEffect(() => {
    setInputChecked(input.checked);
  }, [input.checked]);

  function handleInputCheckedChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const checked = event.target.checked;
    setInputChecked(checked);
    if (input.onChange) {
      input.onChange(event);
    }
  }

  const labelClass = input.labelClass ? input.labelClass : "w3-margin-top";
  return (
    <>
      <label
        className={labelClass}
        style={{ display: input.label ? "inline" : "none" }}
        htmlFor={input.id}
      >
        <input
          type="checkbox"
          id={input.id}
          name={input.name ? input.name : input.id}
          className={`w3-check w3-padding-small ${input.inputClass}`}
          checked={inputChecked}
          onChange={handleInputCheckedChange}
        />{" "}
        {input.label}
      </label>
    </>
  );
}
