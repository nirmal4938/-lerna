import { createContext, createRef } from 'react';

export default createContext({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setActive: (active) => {},
  overlayRef: createRef(),
});
