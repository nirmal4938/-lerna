import {
    Input,
    Field,
  } from 'ui-components';
  import React, {
    useState, useCallback, useMemo, useEffect,
  } from 'react';
  
  import { useTranslation } from 'react-i18next';
  import { useRouting } from '../../hooks/useRouting';
  import { useHotkeys } from '../HotkeyProvider/useHotkeys';
  import Modal from '../OverlayProvider/Modal';
  import QuickSwitcherItem from './QuickSwitcherItem';
  
  export default ({ routes }) => {
    const [value, setValue] = useState('');
    const [index, setIndex] = useState(0);
    const [t] = useTranslation('common');
  
    const [quickSwitchOpen, setQuickSwitchOpen] = useState(false);
    const onQuickSwitch = useCallback(() => {
      setQuickSwitchOpen(true);
      setValue('');
      setIndex(0);
      return false;
    }, []);
    const onQuickSwitchCancel = useCallback(() => {
      setQuickSwitchOpen(false);
    }, []);
    useHotkeys([{
      keys: ['cmd+k', 'meta+k', 'ctrl+k'],
      handler: onQuickSwitch,
      name: 'Quick switcher',
    }]);
  
    const { push } = useRouting();
  
    let items = useMemo(() => routes.filter(r => !r.disabled).map(r => ({
      text: t(`nav.${r.title}`),
      action: () => {
        push(r.link)();
        setQuickSwitchOpen(false);
      },
    })), [routes, push, t]);
  
    if (value) {
      items = items.filter(i => i.text.match(new RegExp(value, 'i')));
    }
  
    const onKeyDown = useCallback((e) => {
      switch (e.keyCode) {
        case 38:
          e.preventDefault();
          return setIndex(i => i - 1);
        case 40:
          e.preventDefault();
          return setIndex(i => i + 1);
        default:
      }
    }, []);
  
    const onKeyUp = useCallback((e) => {
      if (e.keyCode === 13 && items.length) {
        items[index].action();
      } else if (e.keyCode === 13 && !items.length && value.startsWith('/')) {
        push(value)();
        setQuickSwitchOpen(false);
      }
    }, [items, index, value, push]);
  
    useEffect(() => {
      if (index > items.length - 1) {
        setIndex(0);
      } else if (index < 0) {
        setIndex(items.length - 1);
      }
    }, [index, items]);
  
    return quickSwitchOpen ? (
      <Modal
        title="Jump to"
        style={{
          width: '486px', top: '128px', position: 'absolute',
        }}
        onCancel={onQuickSwitchCancel}
      >
        <Field>
          <Input
            search
            autoFocus
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Field>
        {items.map((item, i) => (
          <QuickSwitcherItem key={item.text} item={item} active={index === i} />
        ))}
      </Modal>
    ) : null;
  };
  