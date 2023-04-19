import React, {useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import FieldList from '@components/FieldList';
import PlusIcon from '@public/icons/plus-icon.svg';
import {
  IField,
  IFieldsObject,
  IFinalArrObject,
  IFinalObject,
} from 'src/types/fieldTypes';
import classes from './styles.module.scss';

function FieldsLayout() {
  const [fieldsData, setFieldsData] = useState<IFieldsObject>({});

  const isFieldsDataEmpty = Object.keys(fieldsData).length === 0;

  const handleCreateNewField = () => {
    const randomId = uuidv4();
    const newFieldObj: IField = {
      id: randomId,
      hasChildren: false,
      name: 'field name',
      parentId: null,
      required: false,
      type: 'string',
    };
    setFieldsData({...fieldsData, [randomId]: {...newFieldObj}});
  };

  const getFinalObject = (
    fields: IField[],
    finalObj: IFinalObject,
    parentId: string | null,
  ) => {
    const fieldsWithParentId = fields.filter(
      field => field.parentId === parentId,
    );

    for (let i = 0; i < fieldsWithParentId.length; i++) {
      const field = fieldsWithParentId[i];

      if (!field.hasChildren) {
        finalObj[field.id] = {
          children: null,
          fieldName: field.name,
          type: field.type,
        };
      } else {
        finalObj[field.id] = {
          children: getFinalObject(fields, {}, field.id),
          fieldName: field.name,
          type: field.type,
        };
      }
    }
    return finalObj;
  };

  const getFinalFieldArr = (
    fields: IField[],
    finalArr: IFinalArrObject[],
    parentId: string | null,
  ) => {
    const fieldsWithParentId = fields.filter(
      field => field.parentId === parentId,
    );

    for (let i = 0; i < fieldsWithParentId.length; i++) {
      const field = fieldsWithParentId[i];

      if (!field.hasChildren) {
        finalArr.push({
          children: [],
          fieldName: field.name,
          type: field.type,
        });
      } else {
        finalArr.push({
          children: getFinalFieldArr(fields, [], field.id),
          fieldName: field.name,
          type: field.type,
        });
      }
    }
    return finalArr;
  };

  const handleSaveBtnClick = () => {
    const fieldsDataObjValues: IField[] = Object.values(fieldsData);

    const finalObj: IFinalObject = {};

    const finalArr: IFinalArrObject[] = [];

    getFinalObject(fieldsDataObjValues, finalObj, null);

    getFinalFieldArr(fieldsDataObjValues, finalArr, null);

    console.log({jsonFormat: finalObj, arrayFormat: finalArr});
  };

  return (
    <div className={classes.fieldsLayoutContainer}>
      <div className={classes.headerContainer}>
        <h4>Field Name and Type</h4>
        <div className={classes.actionBtnsContainer}>
          <button className={classes.saveBtn} onClick={handleSaveBtnClick}>
            <span>Save</span>
          </button>
          <button
            className={classes.createFieldBtn}
            onClick={handleCreateNewField}>
            <span>Create</span>
            <PlusIcon />
          </button>
        </div>
      </div>
      {isFieldsDataEmpty && (
        <div className={classes.emptyData}>
          <h5>No Fields Created. Please Create Fields</h5>
        </div>
      )}
      {!isFieldsDataEmpty && (
        <FieldList fieldsData={fieldsData} setFieldsData={setFieldsData} />
      )}
    </div>
  );
}

export default FieldsLayout;
