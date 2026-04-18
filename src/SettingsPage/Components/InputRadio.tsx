import IInputRadio from "../Interfaces/IInputRadio";

export default function InputRadio(input: IInputRadio) {
  const labelClass = input.labelClass ? input.labelClass : "w3-margin-top";
  const inputClass = `w3-radio w3-padding-small ${input.inputClass ? input.inputClass : ""}`;
  return (
    <>
      <label
        className={labelClass}
        style={{ display: input.label ? "inline" : "none" }}
        htmlFor={input.id}
      >
        <input
          type="radio"
          id={input.id}
          name={input.name}
          value={input.value}
          className={inputClass}
          checked={input.checked}
          onChange={input.onChange}
        />
        {input.label}
      </label>
      &nbsp;
    </>
  );
}
