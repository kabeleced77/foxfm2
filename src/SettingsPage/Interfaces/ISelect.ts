export default interface ISelect {
  id: string
  label?: string
  name?: string
  defaultValue?: string | number | readonly string[]
  onChange?: React.ChangeEventHandler<HTMLSelectElement>
}
