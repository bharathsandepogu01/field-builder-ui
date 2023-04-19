import React, {RefObject, useEffect, useRef, useState} from 'react';
import IToggleProps from './types';
import classes from './styles.module.scss';

function Toggle(props: IToggleProps): JSX.Element {
  const toggleBtnRef: RefObject<HTMLButtonElement> = useRef(null);
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  useEffect(() => {
    setIsEnabled(!!props.enabled);
  }, [props.enabled]);

  useEffect(() => {
    if (isEnabled) {
      toggleBtnRef.current?.classList.add(classes.btnContainerActive);
      props.enableFn && props.enableFn();
    } else {
      toggleBtnRef.current?.classList.remove(classes.btnContainerActive);
      props.disableFn && props.disableFn();
    }
  }, [isEnabled]);

  const handleToggleBtnClick = () => {
    setIsEnabled(!isEnabled);
  };

  return (
    <button
      className={classes.btnContainer}
      ref={toggleBtnRef}
      onClick={handleToggleBtnClick}>
      <span />
    </button>
  );
}

export default Toggle;
