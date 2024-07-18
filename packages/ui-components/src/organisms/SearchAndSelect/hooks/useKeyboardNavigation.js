import keycode from 'keycode';
import {
  useState, useCallback, useEffect,
} from 'react';

export default function useKeyNavigation({ searchOpen, inputValue, setInputValue, searchingItems, onSelect, onDelete }) {
  const [focusedItemIndex, setFocus] = useState(0);

  useEffect(() => {
    if (focusedItemIndex < 0) {
      setFocus(searchingItems.length - 1);
    } else if (focusedItemIndex >= searchingItems.length) {
      setFocus(0);
    }
  }, [focusedItemIndex, searchingItems]);

  const onKeyDown = useCallback(
    e => {
      switch (keycode(e)) {
        case 'down':
        case 'tab':
          if (!inputValue && keycode(e) === 'tab') {
            break;
          }
          if (e.shiftKey) {
            setFocus(f => f - 1);
            e.preventDefault();
            e.stopPropagation();
          } else {
            setFocus(f => f + 1);
            e.preventDefault();
            e.stopPropagation();
          }
          break;
        case 'up':
          setFocus(f => f - 1);
          e.preventDefault();
          e.stopPropagation();
          break;
        case 'backspace':
          if (!inputValue) {
            e.preventDefault();
            e.stopPropagation();
            onDelete();
          }
          break;
        case 'enter':
          if (searchOpen) {
            e.preventDefault();
            e.stopPropagation();
          }
          break;
        default:
          break;
      }
    },
    [inputValue, setInputValue, onDelete, searchOpen],
  );

  const onKeyUp = useCallback(
    e => {
      switch (keycode(e)) {
        case 'enter':
          if (searchOpen) {
            e.preventDefault();
            e.stopPropagation();
            setFocus(i => {
              if (searchingItems[focusedItemIndex]?.disabled || searchingItems[focusedItemIndex]?.value === 'DIVIDER') {
                return i;
              }
              onSelect(i);
              return i;
            });
          }
          break;
        default:
          break;
      }
    },
    [searchOpen, onSelect, focusedItemIndex, searchingItems],
  );

  return {
    focusedItemIndex,
    onKeyDown,
    onKeyUp,
    setFocusIndex: setFocus,
  };
}
