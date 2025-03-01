/**
 * Converts a regular JavaScript object into a FormData instance.
 *
 * @param {object} data - Any object to convert.
 * @returns {FormData} - The resulting FormData object.
 */
export const convertToFormData = (data) => {
    const formData = new FormData();
  
    for (const key in data) {
      if (data[key] instanceof Array) {
        if (!data[key].length) {
          formData.append(`${key}[]`, 'null');
        }
        for (const obj of data[key]) {
          if (obj instanceof File) {
            formData.append(`${key}[]`, obj, obj.name);
          } else {
            formData.append(`${key}[]`, JSON.stringify(obj));
          }
        }
      } else if (typeof data[key] === 'object') {
        formData.append(key, JSON.stringify(data[key]));
      } else {
        formData.append(key, data[key]);
      }
    }
  
    return formData;
  };
  