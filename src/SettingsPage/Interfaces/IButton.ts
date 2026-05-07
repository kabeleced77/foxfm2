import { CSSProperties } from 'react'

export default interface IButton {
  type: 'reset' | 'submit' | 'button'
  id?: string
  style?: CSSProperties
  class?: string
  title?: string
  value?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}
