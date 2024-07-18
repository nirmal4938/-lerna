import { useContext, useEffect } from 'react';
import { HotkeyContext } from './HotkeyContext';

export const useHotkeys = (hotkeys) => {
  const { bindHotkey, unbindHotkey } = useContext(HotkeyContext);
  useEffect(() => {
    hotkeys.forEach(bindHotkey);
    return () => {
      hotkeys.forEach(unbindHotkey);
    };
  }, [bindHotkey, hotkeys, unbindHotkey]);
};
