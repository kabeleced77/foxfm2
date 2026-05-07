import { CSSProperties } from 'react'

export default interface IInput {
  id: string
  visible?: boolean
  label?: string
  name?: string
  value?: string | number | readonly string[]
  checked?: boolean
  inputClass?: string
  labelClass?: string
  style?: CSSProperties
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}
