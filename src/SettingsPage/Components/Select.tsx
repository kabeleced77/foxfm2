import ISelect from '../Interfaces/ISelect'
import React, { ReactNode, useState } from 'react'

export default function Select({ children, select }: { children: ReactNode; select: ISelect }) {
  const [selected, setSelected] = useState(select.defaultValue ?? "")

  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelected(e.target.value)
    if (select.onChange) {
      select.onChange(e)
    }
  }

  return (
    <>
      <label style={{ display: select.label ? 'block' : 'none' }} htmlFor={select.id}>
        {select.label}
      </label>
      <select
        id={select.id}
        name={select.name ? select.name : select.id}
        className="w3-select w3-border w3-padding-small w3-margin-top"
        value={selected}
        onChange={handleSelectChange}
      >
        {children}
      </select>
    </>
  )
}
