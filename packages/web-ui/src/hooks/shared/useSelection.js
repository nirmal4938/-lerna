import update from 'immutability-helper';
import {
    useState, useCallback, useMemo,
} from 'react';

export const useSelection = (results, options = {}) => {
    const [selected, setSelected] = useState({});
    const [lastSelected, setLastSelected] = useState();

    const onSelect = useCallback((id, e) => {
        const shift = e.shiftKey;
        e.stopPropagation();
        e.preventDefault();

        setSelected(s => {
            const op = { $unset: [] };

            if (s[id]) {
                op.$unset.push(id.toString());
            } else {
                op[id.toString()] = { $set: true };
            }

            if (!op.$unset.length) {
                delete op.$unset;
            }

            if (shift && lastSelected) {
                const lastIndex = results.findIndex((r) => r.id === lastSelected);
                const currentIndex = results.findIndex((r) => r.id === id);
                if (lastIndex !== -1) {
                    const from = Math.min(lastIndex, currentIndex);
                    const to = Math.max(lastIndex, currentIndex);
                    for (let i = from; i <= to; i++) {
                        if (op.$unset) {
                            op.$unset.push(results[i].id);
                        } else {
                            op[results[i].id] = { $set: true };
                        }
                    }
                }
            }

            return update(s, op);
        });

        if (!shift) {
            setLastSelected(id);
        }
    }, [results, lastSelected]);

    const allSelected = useMemo(() => {
        const selectable = options.onSelectAllFilter ? results.filter(options.onSelectAllFilter) : results;
        return !!selectable.length && selectable.every((r) => !!selected[r.id]);
    }, [results, selected, options.onSelectAllFilter]);

    const onSelectAll = useCallback(() => {
        setSelected(s => {
            const op = {};
            const selectable = options.onSelectAllFilter ? results.filter(options.onSelectAllFilter) : results;

            if (allSelected) {
                op.$unset = [];
                op.$unset.push(...selectable.map((r) => r.id));
            } else {
                selectable.forEach((r) => {
                    op[r.id] = { $set: true };
                });
            }

            return update(s, op);
        });
    }, [results, allSelected, options.onSelectAllFilter]);

    const onClearSelected = useCallback(() => {
        setSelected({});
    }, []);

    return {
        selected,
        allSelected,
        onSelect,
        onSelectAll,
        onClearSelected,
        setSelected,
    };
};
