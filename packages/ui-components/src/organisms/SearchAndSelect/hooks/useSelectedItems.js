import filter from 'lodash/filter';
import find from 'lodash/find';
import isArray from 'lodash/isArray';
import isEqual from 'lodash/isEqual';
import without from 'lodash/without';
import {
  useState, useCallback, useEffect, createRef,
} from 'react';

export default function useSelectedItems({
  value,
  items,
  dropdownItems,
  onCreate,
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
}) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchingItems, setSearchingItems] = useState([]);

  const onSelect = useCallback(
    index => {
      setSearchingItems(searching => {
        const item = searching[index];
        if (item.value === 'add') {
          setInputValue(_inputValue => {
            onCreate(_inputValue);
            return '';
          });
          return searching;
        }
        setSelectedItems(items => {
          setInputValue('');
          if (item.value === 'N/A') {
            return items;
          }
          const next = [];
          if (multi) {
            items.push({ text: item.text, value: item.value });
            items.forEach(i => next.push(i));
          } else {
            next.push({ text: item.text, value: item.value });
          }
          setImmediate(() => {
            onChange({
              target: {
                name,
                value: next.map(n => n.value),
              },
            });
          });
          return next;
        });
        return searching;
      });
      setImmediate(() => {
        inputRef.current && inputRef.current.focus();
      });
    },
    [setInputValue, inputRef, multi, name, onChange, onCreate],
  );

  const onDelete = useCallback(
    index => {
      setSelectedItems(items => {
        if (typeof index === 'undefined') {
          index = items.length - 1;
        }
        const item = items[index];
        const next = without(items, item);
        setImmediate(() => {
          onChange({
            target: {
              name,
              value: next.map(n => n.value),
            },
          });
        });
        return next;
      });
    },
    [onChange, name],
  );

  useEffect(() => {
    let _value = value;
    if (!_value) {
      return;
    }
    const next = [];
    if (typeof _value === 'string') {
      _value = [_value];
    }
    _value.forEach((v, i) => {
      const item = find(items, { value: v });
      if (!item) {
        return;
      }
      next.push({
        text: item.text,
        value: item.value,
      });
    });
    setSelectedItems(next);
  }, [items, value]);

  useEffect(() => {
    if (inputValue.length < minimumCharacters) {
      return;
    }

    const visible = [];
    const itms = dropdownItems || items;

    if (
      add
      && !find(itms, i => i.text.toLowerCase() === inputValue.toLowerCase())
      && !find(itms, i => i.search?.toLowerCase() === inputValue.toLowerCase())
      && inputValue.length >= 1
    ) {
      visible.push({
        text: addText(inputValue), value: 'add', ref: createRef(),
      });
    }

    itms.forEach(item => {
      if (
        `${item.text}${item.value}${item.search || ''}`
          .toLowerCase()
          .indexOf(inputValue.toLowerCase()) !== -1
      ) {
        if (inputValue && item.value === 'DIVIDER') {
          return;
        }
        visible.push({ ...item, ref: createRef() });
      }
    });

    const selectedValues = selectedItems.map(s => s.value);
    const filtered = filter(visible, v => selectedValues.indexOf(v.value) === -1);
    if (filtered.length === 0) {
      filtered.push({ text: noItemsText, value: 'N/A' });
    }
    setSearchingItems(filtered);
  }, [
    inputValue,
    items,
    dropdownItems,
    minimumCharacters,
    add,
    addText,
    noItemsText,
    selectedItems,
  ]);

  return {
    selectedItems,
    searchingItems,
    onSelect,
    onDelete,
  };
}
