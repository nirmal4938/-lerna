// Assuming `Sort` type is not needed in JavaScript, so it's removed
export const sortOrder = (name, sort) => {
    if (!sort) return;

    const _sort = sort?.find(s => s[0] === name);

    if (!_sort) return 'default';

    if (_sort[1] === 'ASC') {
        return 'up';
    }

    return 'down';
};

export const sortProps = (name, sort, onClick) => ({
    name,
    sort: sortOrder(name, sort),
    onClick,
});
