import { useEffect } from 'react';
import mousetrap from 'mousetrap';


export const useMousetrap = (handlers) => {
  useEffect(() => {
    Object.keys(handlers).forEach((key) => {
      mousetrap.bind(key, handlers[key], 'keyup');
    });
    return () => {
      Object.keys(handlers).forEach(mousetrap.unbind);
    };
  }, [handlers]);
};
