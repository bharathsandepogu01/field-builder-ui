import React, {useRef} from 'react';
import {clsx} from 'clsx';
import Field from '@components/Field';
import DownArrowIcon from '@public/icons/down-arrow.svg';
import {FieldChildrenOpenedRefs, FieldRefs, IFieldListProps} from './types.d';
import classes from './styles.module.scss';
import {IField} from 'src/types/fieldTypes';

function FieldList(props: IFieldListProps) {
  const fieldsContainerRef = useRef<FieldRefs>({});
  const fieldsChildrenOpenedRefs = useRef<FieldChildrenOpenedRefs>({});
  const fieldArrowRefs = useRef<FieldRefs>({});
  const {fieldsData, parentId = null, setFieldsData} = props;

  const filteredFields = Object.values(fieldsData).filter(
    field => field.parentId === parentId,
  );

  const showChildren = (field: IField) => {
    fieldsContainerRef.current[field.id]?.classList.remove(
      classes.fieldsContainerClose,
    );
    fieldsChildrenOpenedRefs.current[field.id] = true;
    fieldArrowRefs.current[field.id]?.classList.add(classes.downArrowRotate);
  };

  const hideChildren = (field: IField) => {
    fieldsContainerRef.current[field.id]?.classList.add(
      classes.fieldsContainerClose,
    );
    fieldsChildrenOpenedRefs.current[field.id] = false;
    fieldArrowRefs.current[field.id]?.classList.remove(classes.downArrowRotate);
  };

  const handleOnClickFieldContainer = (field: IField) => {
    const fieldChildrenOpenedState = fieldsChildrenOpenedRefs.current[field.id];
    if (fieldChildrenOpenedState) {
      hideChildren(field);
    } else {
      showChildren(field);
    }
  };

  return (
    <>
      {filteredFields.map(field => {
        const hasChildren = field.hasChildren;
        const isObjectField = field.type === 'object';
        return (
          <div
            className={clsx(
              classes.fieldsContainer,
              parentId && classes.fieldsContainerBorder,
            )}
            key={field.id}
            ref={el => (fieldsContainerRef.current[field.id] = el)}>
            <div className={classes.fieldWithArrow}>
              <div
                className={clsx(
                  classes.downArrowIcon,
                  isObjectField && classes.pointerCursor,
                )}
                onClick={() =>
                  isObjectField && handleOnClickFieldContainer(field)
                }
                ref={el => (fieldArrowRefs.current[field.id] = el)}>
                {isObjectField && <DownArrowIcon />}
              </div>
              <div className={classes.field}>
                <Field
                  fieldData={field}
                  fieldsData={fieldsData}
                  setFieldsData={setFieldsData}
                  onChangeFieldData={updatedField =>
                    updatedField.type === 'object' && showChildren(updatedField)
                  }
                />
              </div>
            </div>
            {hasChildren && (
              <div className={classes.children}>
                <FieldList
                  fieldsData={fieldsData}
                  parentId={field.id}
                  setFieldsData={setFieldsData}
                />
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

export default FieldList;
