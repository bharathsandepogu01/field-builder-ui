import React, {useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import FieldList from '@components/FieldList';
import PlusIcon from '@public/icons/plus-icon.svg';
import {IField, IFieldsObject} from 'src/types/fieldTypes';
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

  return (
    <div className={classes.fieldsLayoutContainer}>
      <div className={classes.headerContainer}>
        <h4>Field Name and Type</h4>
        <button
          className={classes.createFieldBtn}
          onClick={handleCreateNewField}>
          <span>Create</span>
          <PlusIcon />
        </button>
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
