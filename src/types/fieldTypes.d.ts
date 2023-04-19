export type FieldType = 'number' | 'boolean' | 'string' | 'object';

export interface IField {
  id: string;
  name: string;
  type: FieldType;
  required: boolean;
  hasChildren: boolean;
  parentId: string | null;
}

export interface IFieldsObject {
  [key: string]: IField;
}

export interface IFinalObjectField {
  fieldName: string;
  type: FieldType;
  children: IFinalObject | null;
}

export interface IFinalArrObject {
  fieldName: string;
  type: FieldType;
  children: IFinalArrObject[];
}

export interface IFinalObject {
  [key: string]: IFinalObjectField;
}
