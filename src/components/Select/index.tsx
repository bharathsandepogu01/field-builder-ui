import React from 'react';
import {ISelectProps} from './types';
import classes from './styles.module.scss';

function Select<T extends string>(props: ISelectProps<T>) {
  const {onChangeFieldType, value, options} = props;

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeFieldType(e.target.value as T);
  };

  return (
    <select
      name="Field Types"
      id="fieldTypes"
      className={classes.selectContainer}
      onChange={handleOnChange}
      value={value}>
      {options.map(eachOption => {
        return (
          <option value={eachOption.value} key={eachOption.id}>
            {eachOption.name}
          </option>
        );
      })}
    </select>
  );
}

export default Select;
