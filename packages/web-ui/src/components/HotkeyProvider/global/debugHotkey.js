
export const debugHotkey = {
  keys: ['shift+alt+d'],
  handler: (ev, combo, { setState, addToast }) => {
    // TODO We should only add this hotkey for superusers
    // TODO We should show a toast or a modal to let the user know that
    //   debug mode is enabled now
    // eslint-disable-next-line no-console
    setState((state) => {
      setImmediate(() => {
        addToast(`Debug mode ${state.debug ? 'DISABLED' : 'ENABLED'}`, {
          appearance: state.debug ? 'info' : 'info',
          autoDismiss: true,
        });
      });
      return {
        ...state,
        debug: !state.debug,
      };
    });
  },
  name: 'Debug mode',
  description: 'Enable debugging mode. This may have unintended side-effects. Be careful!',
};
