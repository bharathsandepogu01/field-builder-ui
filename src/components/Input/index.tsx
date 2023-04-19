import React, {useEffect, useState} from 'react';
import {clsx} from 'clsx';
import IInputProps from './types';
import classes from './styles.module.scss';

function Input(props: IInputProps) {
  const {inputValue, onChangeInputValue} = props;
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setValue(inputValue);
  }, [inputValue]);

  const handleOnChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleOnBlur = () => {
    if (!value) {
      setError('Required');
    } else {
      setError('');
      onChangeInputValue(value);
    }
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleOnBlur();
    }
  };

  return (
    <input
      required={true}
      value={value}
      onChange={handleOnChangeValue}
      autoFocus
      onBlur={handleOnBlur}
      placeholder={`${error ? error : 'field name'}`}
      onKeyDown={handleOnKeyDown}
      className={clsx(classes.input, error && classes.inputError)}
    />
  );
}

export default Input;
