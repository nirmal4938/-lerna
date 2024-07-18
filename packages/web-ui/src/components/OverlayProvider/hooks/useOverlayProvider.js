import {
    useState, useRef, useMemo,
  } from 'react';
  
  export default () => {
    const [active, setActive] = useState(false);
    const overlayRef = useRef(null);
    const contextObject = useMemo(() => ({
      setActive,
      overlayRef,
    }), []);
  
    return {
      overlayRef,
      active,
      contextObject,
    };
  };
  