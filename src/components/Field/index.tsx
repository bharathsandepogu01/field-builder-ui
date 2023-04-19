import React, {useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import Toggle from '@components/Toggle';
import Select from '@components/Select';
import PlusIcon from '@public/icons/plus-icon.svg';
import DeleteIcon from '@public/icons/delete-icon.svg';
import {IFieldProps} from './types';
import classes from './styles.module.scss';
import Input from '@components/Input';
import {FieldType, IField, IFieldsObject} from 'src/types/fieldTypes';
import {ISelectOption} from '@components/Select/types';

const fieldSelectOptions: ISelectOption<FieldType>[] = [
  {id: 'number', value: 'number', name: 'NUMBER'},
  {id: 'string', value: 'string', name: 'STRING'},
  {id: 'boolean', value: 'boolean', name: 'BOOLEAN'},
  {id: 'object', value: 'object', name: 'OBJECT'},
];

function Field(props: IFieldProps) {
  const {
    fieldData: field,
    fieldsData,
    setFieldsData,
    onChangeFieldData,
  } = props;
  const [editMode, setEditMode] = useState<boolean>(false);

  const getFieldsValuesArrMap = (fieldsValuesArr: IField[]): IFieldsObject => {
    const newObj: IFieldsObject = Object.fromEntries(
      fieldsValuesArr.map(fieldValue => [fieldValue.id, {...fieldValue}]),
    );
    return newObj;
  };

  const removeObjectFields = (
    fields: IField[],
    fieldIdToRemove: string,
    checkCurrField: boolean = true,
  ): IField[] => {
    return fields.reduce((acc, curr) => {
      if (
        (checkCurrField && curr.id === fieldIdToRemove) ||
        curr.parentId === fieldIdToRemove
      ) {
        const filteredList = acc.filter(eachField => eachField.id !== curr.id);
        if (!curr.hasChildren) {
          return filteredList;
        } else {
          return removeObjectFields(filteredList, curr.id);
        }
      } else {
        return acc;
      }
    }, fields);
  };

  const handleDeleteField = () => {
    if (field.type !== 'object') {
      const {[field.id]: x, ...remainingFieldsData} = fieldsData;
      setFieldsData(remainingFieldsData);
    } else {
      const remainingFieldsObj = getFieldsValuesArrMap(
        removeObjectFields(Object.values(fieldsData), field.id),
      );
      setFieldsData(remainingFieldsObj);
    }
  };

  const handleOnChangeFieldType = (value: FieldType) => {
    const fieldToUpdate = {...field};
    fieldToUpdate.type = value;
    if (field.type === 'object') {
      const remainingFields = getFieldsValuesArrMap(
        removeObjectFields(Object.values(fieldsData), field.id, false),
      );
      fieldToUpdate.hasChildren = false;

      setFieldsData({
        ...remainingFields,
        [field.id]: {...remainingFields[field.id], ...fieldToUpdate},
      });
      return;
    }
    setFieldsData({
      ...fieldsData,
      [field.id]: {...fieldsData[field.id], ...fieldToUpdate},
    });
  };

  const handleCreateNewNestedField = () => {
    const randomId = uuidv4();
    const newNestedField: IField = {
      id: randomId,
      name: 'field name',
      type: 'string',
      required: false,
      hasChildren: false,
      parentId: field.id,
    };
    const currFieldToUpdate = {...field};
    currFieldToUpdate.hasChildren = true;
    setFieldsData({
      ...fieldsData,
      [field.id]: {...fieldsData[field.id], ...currFieldToUpdate},
      [randomId]: {...newNestedField},
    });
    onChangeFieldData({...currFieldToUpdate});
  };

  const handleFieldRequired = (required: boolean) => {
    let fieldToUpdate = {...field};
    fieldToUpdate.required = required;
    setFieldsData({
      ...fieldsData,
      [field.id]: {...fieldsData[field.id], ...fieldToUpdate},
    });
  };

  const handleOnClickFieldName = () => {
    setEditMode(!editMode);
  };

  const handleOnChangeFieldName = (value: string) => {
    let fieldToUpdate = {...field};
    fieldToUpdate.name = value;
    setFieldsData({
      ...fieldsData,
      [field.id]: {...fieldsData[field.id], ...fieldToUpdate},
    });
    setEditMode(!editMode);
  };

  const handleClickEventPropagation = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className={classes.fieldContainer}
      onClick={handleClickEventPropagation}>
      <div className={classes.inputsContainer}>
        <div className={classes.textInputContainer}>
          {!editMode && (
            <p role="button" tabIndex={0} onClick={handleOnClickFieldName}>
              {field.name}
            </p>
          )}
          {editMode && (
            <Input
              inputValue={field.name}
              onChangeInputValue={handleOnChangeFieldName}
            />
          )}
        </div>
        <Select
          onChangeFieldType={handleOnChangeFieldType}
          value={field.type}
          options={fieldSelectOptions}
        />
      </div>
      <div className={classes.actionsContainer}>
        <div className={classes.toggleContainer}>
          <span>Required</span>
          <Toggle
            enabled={field.required}
            enableFn={() => handleFieldRequired(true)}
            disableFn={() => handleFieldRequired(false)}
          />
        </div>
        {field.type === 'object' && (
          <button
            className={classes.plusIcon}
            onClick={handleCreateNewNestedField}>
            <PlusIcon />
          </button>
        )}
        <button className={classes.deleteIcon} onClick={handleDeleteField}>
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
}

export default Field;
