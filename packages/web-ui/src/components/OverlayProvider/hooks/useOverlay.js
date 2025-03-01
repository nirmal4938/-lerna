import {
    useContext, useEffect, useCallback, useState,
  } from 'react';
  import OverlayProviderContext from '../context/OverlayProviderContext';
  
  export default function useOverlay({ onCancel }) {
    const {
      setActive,
      overlayRef,
    } = useContext(OverlayProviderContext);
    const [clickedInside, setClickedInside] = useState(false);
     console.log("useoverlay", overlayRef)
    const onMouseDown = useCallback((e) => {
      setClickedInside(true);
    }, []);
  
    const onWindowClicked = useCallback((e) => {
      setClickedInside(false);
  
      if (!onCancel) {
        return;
      }
  
      if (e.target === overlayRef.current && !clickedInside) {
        onCancel();
      }
    }, [onCancel, overlayRef, clickedInside]);
  
    // Trigger onCancel when overlay is clicked
    useEffect(() => {
      window.addEventListener('click', onWindowClicked);
      return () => {
        window.removeEventListener('click', onWindowClicked);
      };
    }, [onWindowClicked]);
  
    // Set active when mounted, inactive when unmounted.
    useEffect(() => {
      setActive(true);
      return () => {
        setActive(false);
      };
    }, [setActive]);
  
    // Hack to re-render when the overlayRef becomes available.
    const [hasRef, setHasRef] = useState(!!overlayRef.current);
    useEffect(() => {
      if (hasRef) {
        return;
      }
  
      const interval = setInterval(() => {
        if (overlayRef.current) {
          setHasRef(true);
        }
      }, 100);
  
      return () => clearInterval(interval);
    }, [hasRef, overlayRef]);
  
    return { overlayRef, onMouseDown };
  }
  