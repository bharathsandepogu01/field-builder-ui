import {PropsWithChildren} from 'react';

export default interface IInputProps extends PropsWithChildren {
  inputValue: string;
  onChangeInputValue: (value: string) => void;
}
