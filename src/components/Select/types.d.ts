import {PropsWithChildren} from 'react';
import {FieldType} from 'src/types/fieldTypes';

export interface ISelectOption<T> {
  id: string;
  value: T;
  name: string;
}

export interface ISelectProps<T> extends PropsWithChildren {
  onChangeFieldType: (optionValue: T) => void;
  value: T;
  options: ISelectOption<T>[];
}
