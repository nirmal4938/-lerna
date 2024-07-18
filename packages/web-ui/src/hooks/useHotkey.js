import { useEffect, useCallback } from 'react';

export const useHotkey = (key, cb, config = {}) => {
  const handler = useCallback((e) => {
    if (e.key === key) {
      if (!config.cmd) {
        cb();
      } else if ((config.cmd && e.metaKey) || (config.cmd && e.ctrlKey)) {
        e.preventDefault();
        cb();
      }
    }
  }, [cb, key, config.cmd]);

  useEffect(() => {
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handler]);
};
