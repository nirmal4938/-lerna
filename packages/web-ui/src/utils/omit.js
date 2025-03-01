export default (obj, ...keys) => (
    keys.reduce((a, e) => {
      const { [e]: omit, ...rest } = a;
      return rest;
    }, obj)
  );
  