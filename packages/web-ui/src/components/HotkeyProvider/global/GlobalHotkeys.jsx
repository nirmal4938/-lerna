import { useMemo } from 'react';
import { useMe } from '../../../hooks/useMe';
import { useHotkeys } from '../useHotkeys';
import { debugHotkey } from './debugHotkey';
import { helpHotkey } from './helpHotkey';

export const GlobalHotkeys = (props) => {
  const { me } = useMe();
  const hotkeys = useMemo(() => ([
    helpHotkey,
    ...(me?.god_mode ? [debugHotkey] : []),
  ]), [me?.god_mode]);
  useHotkeys(hotkeys);

  return props.children;
};
