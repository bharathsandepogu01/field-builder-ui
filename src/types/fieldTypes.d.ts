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
