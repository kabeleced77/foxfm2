import IInput from "./IInput";

export default interface IInputRadio extends IInput {
  name: string;
  value: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
