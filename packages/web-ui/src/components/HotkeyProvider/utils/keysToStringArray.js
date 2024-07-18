export const keysToStringArray = (keys) => {
  if (typeof keys === 'string') {
    return [keys];
  }
  if (Array.isArray(keys)) {
    return keys;
  }
  if (Object.prototype.hasOwnProperty.call(keys, 'keys')) {
    return keysToStringArray(keys.keys);
  }
  // eslint-disable-next-line no-console
  console.debug('Unrecognized keys: ', keys);
  return [];
};
