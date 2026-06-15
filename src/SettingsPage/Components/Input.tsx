import IInput from 'OptionsPage/Interfaces/IInput'
import React, { useState } from 'react'

export default function Input(input: IInput) {
  const [inputValue, setInputValue] = useState(input.value)

  function handleInputValueChange(e: { target: { value: React.SetStateAction<string> } }) {
    setInputValue(e.target.value)
  }

  const labelClass = input.labelClass ? input.labelClass : 'w3-margin-top'
  const inputClass = `w3-input w3-border w3-light-grey w3-padding-small ${input.inputClass}`
  return (
    <div style={{ display: input.visible === false ? 'none' : '' }}>
      <label
        className={labelClass}
        style={{ display: input.label ? 'block' : 'none' }}
        htmlFor={input.id}
      >
        {input.label}
      </label>
      <input
        type="text"
        id={input.id}
        name={input.name ? input.name : input.id}
        className={inputClass}
        value={inputValue}
        onChange={handleInputValueChange}
      />
    </div>
  )
}
