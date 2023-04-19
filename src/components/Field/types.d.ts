import {PropsWithChildren} from 'react';
import {IField, IFieldsObject} from 'src/types/fieldTypes';

export interface IFieldProps extends PropsWithChildren {
  fieldData: IField;
  fieldsData: IFieldsObject;
  setFieldsData: Dispatch<SetStateAction<IFieldsObject>>;
  onChangeFieldData: (field: IField) => void;
}
