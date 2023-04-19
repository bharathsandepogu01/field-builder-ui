import {PropsWithChildren} from 'react';
import {IFieldsObject} from 'src/types/fieldTypes';

export interface IFieldListProps extends PropsWithChildren {
  fieldsData: IFieldsObject;
  setFieldsData: Dispatch<SetStateAction<IFieldsObject>>;
  fieldId?: string | null;
  parentId?: string | null;
}

export type FieldRefs = {
  [key: string]: HTMLDivElement | null;
};

export type FieldChildrenOpenedRefs = {
  [key: string]: boolean;
};
