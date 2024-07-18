import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import mousetrap from 'mousetrap';
// import { HotkeyManager } from './HotkeyManager';
import { keysToStringArray } from './utils/keysToStringArray';
import { GlobalHotkeys } from './global/GlobalHotkeys';
import { HotkeyContext } from './HotkeyContext';
// import { useToasts } from 'react-toast-notifications';

const arraysEqual = (a, b) => {
  if (a === b) {
    return true;
  }
  if (a == null || b == null) {
    return false;
  }
  if (a.length !== b.length) {
    return false;
  }
  const a1 = [...a];
  const b1 = [...b];
  a1.sort();
  b1.sort();

  return a1.every((el, i) => (b1[i] === el));
};

export const HotkeyProvider = ({ children }) => {
  const [state, setState] = useState({});
  const _state = useRef(state);
  const hotkeys = useRef([]);
  // const { addToast } = useToasts();

  const bindHotkey = useCallback(({
    keys,
    handler,
    name,
    section,
    description,
  }) => {
    mousetrap.bind(keys, (ev, combo) => (handler(ev, combo, {
      state: _state.current, setState,
    })));
    if (!hotkeys.current.find((hotkey) => (arraysEqual(hotkey.keys, keys)))) {
      hotkeys.current = hotkeys.current.concat([{
        keys,
        name,
        section,
        description,
      }]);
    }
  }, []);

  const unbindHotkey = useCallback((hotkey) => {
    const keys = keysToStringArray(hotkey);
    hotkeys.current = hotkeys.current
      // First, remove matching keys
      .map((hotkey) => ({
        ...hotkey,
        keys: hotkey.keys.filter((k) => (keys.indexOf(k) === -1)),
      }))
      // Then, remove handlers that have no keys left
      .filter(({ keys }) => (keys.length > 0));
    mousetrap.unbind(keys);
  }, []);

  const manager = useMemo(() => ({
    state,
    setState,
    hotkeys: hotkeys.current,
    bindHotkey,
    unbindHotkey,
  }), [bindHotkey, state, unbindHotkey]);

  return (
    <HotkeyContext.Provider value={manager}>
      <GlobalHotkeys>
        {children}
      </GlobalHotkeys>
    </HotkeyContext.Provider>
  );
};
