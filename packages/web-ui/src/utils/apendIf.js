export const appendIf = (condition, str, _default = '') => {
    return condition ? str : _default;
};