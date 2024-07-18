
export const helpHotkey = {
  keys: ['?', 'alt+?'],
  handler: (ev, combo, { setState }) => {
    setState((state) => ({
      ...state,
      help: !state.help,
    }));
  },
  name: 'Hotkey help!',
  description: 'Display the hotkey summary.',
};
