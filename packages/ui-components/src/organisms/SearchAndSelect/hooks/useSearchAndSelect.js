import {
    useRef, useEffect, useState, useCallback, useLayoutEffect, useMemo,
  } from 'react';
  
  import useOnClickOutside from '../../../hooks/useOnClickOutside';
  import useKeyboardNavigation from './useKeyboardNavigation';
  import useSelectedItems from './useSelectedItems';
  
  const defaultAddText = val => `Add "${val}"`;
  
  export default function useSearchAndSelect({
    add = false,
    multi,
    onCreate,
    items: _items,
    dropdownItems,
    minimumCharacters = 0,
    noItemsText = 'No results.',
    addText = defaultAddText,
    onSearchChange,
    onChange,
    value,
    name,
  }) {
    const wrapperRef = useRef(null);
    const inputRef = useRef(null);
    const canvasRef = useRef(document.createElement('canvas'));
    const [focused, setFocused] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [inputWidth, setInputWidth] = useState('4px');
    const [timer, setTimer] = useState(null);
  
    const items = useMemo(() => {
      if (_items) {
        return _items;
      }
  
      if (Array.isArray(value)) {
        return value.map((v) => ({ text: v, value: v }));
      }
      return [];
    }, [_items, value]);
  
    useOnClickOutside(wrapperRef, () => setSearchOpen(false));
  
    const {
      onSelect, onDelete, selectedItems, searchingItems,
    } = useSelectedItems({
      value,
      items,
      dropdownItems,
      setInputValue,
      inputRef,
      inputValue,
      minimumCharacters,
      add,
      addText,
      noItemsText,
      multi,
      onChange,
      name,
      onCreate,
    });
  
    const onInputChange = useCallback(
      e => {
        if (!multi && selectedItems.length) {
          return;
        }
        setInputValue(e.target.value);
        onSearchChange && onSearchChange({
          target: {
            name,
            value: e.target.value,
          },
        });
      },
      [multi, selectedItems.length, onSearchChange, name],
    );
  
    const searchItemLength = searchingItems.length;
    useEffect(() => {
      const isSingleSelectWithValue = !multi && inputValue.length === 0 && !!value.length;
      if (
        inputValue.length >= minimumCharacters
        && searchItemLength > 0
        && focused
        && !isSingleSelectWithValue
      ) {
        setSearchOpen(true);
      } else {
        setSearchOpen(false);
      }
    }, [inputValue, minimumCharacters, searchItemLength, focused, multi, value]);
  
    const {
      focusedItemIndex, onKeyDown, onKeyUp, setFocusIndex,
    } = useKeyboardNavigation({
      searchOpen,
      inputValue,
      setInputValue,
      searchingItems,
      onSelect,
      onDelete,
    });
  
    const onBlur = useCallback(() => {
      setFocusIndex(0);
      const timeout = setTimeout(() => {
        setFocused(false);
        setInputValue('');
        onSearchChange && onSearchChange({
          target: {
            name,
            value: '',
          },
        });
      }, 150);
      setTimer(timeout);
    }, [onSearchChange]);
  
    const onFocus = useCallback(() => {
      setFocusIndex(0);
      setFocused(true);
      clearTimeout(timer);
    }, [timer]);
  
    const onSetInputFocus = useCallback(() => {
      if (!inputRef.current) {
        return;
      }
      inputRef.current.focus();
    }, []);
  
    useLayoutEffect(() => {
      const context = canvasRef.current.getContext('2d');
      if (!context) {
        return;
      }
      context.font = '16px "arial", sans-serif';
      const metrics = context.measureText(inputValue);
      setInputWidth(`${Math.ceil(metrics.width) + 4}px`);
    }, [inputValue]);
  
    return {
      selectedItems,
      onSelect,
      onDelete,
      inputValue,
      searchingItems,
      searchOpen,
      wrapperRef,
      inputRef,
      inputWidth,
      onInputChange,
      onSetInputFocus,
      focusedItemIndex,
      onKeyDown,
      onKeyUp,
      onBlur,
      onFocus,
    };
  }
  