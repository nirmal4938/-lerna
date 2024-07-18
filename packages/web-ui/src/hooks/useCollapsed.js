import {
    useState, useCallback, useEffect,
  } from 'react';
  
  const smallScreen = matchMedia('(max-width: 1200px)');
  
  export default () => {
    const [collapsed, setCollapsed] = useState(smallScreen.matches);
    const onScreenSizeChanged = useCallback(() => {
      setCollapsed(smallScreen.matches);
    }, []);
  
    useEffect(() => {
      smallScreen.addListener(onScreenSizeChanged);
      return () => {
        smallScreen.removeListener(onScreenSizeChanged);
      };
    }, [onScreenSizeChanged]);
  
    return collapsed;
  };
  