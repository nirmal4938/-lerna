import keycode from 'keycode';
import includes from 'lodash/includes';
import isEqual from 'lodash/isEqual';
import without from 'lodash/without';
import React from 'react';
import lifecycle from 'recompose/lifecycle';
import withHandlers from 'recompose/withHandlers';
import withStateHandlers from 'recompose/withStateHandlers';
import { compose } from 'redux';

export const withSelectability = compose(
    /**
     * Dropdown Internal State
     */
    withStateHandlers(
        ({ value }) => ({
            _value: value,
            itemFocusIndex: -1,
            open: false,
        }),
        {
            setValue: () => _value => ({ _value }),
            setOpen: () => open => ({ open }),
            setFocus: () => itemFocusIndex => ({ itemFocusIndex }),
            setState: () => state => state,
        },
    ),
    /**
     * Dropdown Functionality
     */
    withHandlers(() => {
        let _wrapperRef;
        const _itemRefs = {};

        return {
            // Handles Global Clicks to determine if the dropdown should close.
            onGlobalClick: ({ open, setOpen }) => e => {
                if (!_wrapperRef) {
                    return;
                }

                if (_wrapperRef.contains(e.target)) {
                    return;
                }

                if (open) {
                    setOpen(false);
                }
            },
            // Increments the active highlighted item of the expanded dropdown.
            incrementIndex: ({
                itemFocusIndex, setFocus, items,
            }) => amt => {
                let next = itemFocusIndex + amt;
                while (items[next] && items[next].value === 'DIVIDER') {
                    next += amt;
                }
                if (next > items.length - 1) {
                    next = 0;
                    while (items[next] && items[next].value === 'DIVIDER') {
                        next += 1;
                    }
                } else if (next < 0) {
                    next = items.length - 1;
                }
                setFocus(next);
            },
            // Focuses the scrollable dropdown item into view.
            focusItem: ({ itemFocusIndex }) => () => {
                if (itemFocusIndex === -1) {
                    return;
                }

                try {
                    _itemRefs[`${itemFocusIndex}`].focus();
                } catch (e) {
                    // handle error
                }
            },
            // Registers the item ref for scroll focusing.
            itemRef: () => index => ref => {
                _itemRefs[`${index}`] = ref;
            },
            // Registers the wrapper ref for outside-click detection.
            wrapperRef: ({ wrapperRef }) => ref => {
                _wrapperRef = ref;
                if (wrapperRef) {
                    wrapperRef(ref);
                }
            },
            // Handles when the Dropdown is focused.
            _onFocus: ({
                open, setOpen, disabled, onFocus,
            }) => e => {
                if (!open && !disabled) {
                    setOpen(true);
                }

                onFocus && onFocus(e);
            },
            _onClick: ({ onClick }) => e => {
                onClick && onClick(e);
            },
            // Handler for when items are selected based on whether it's a multi- or single-select.
            _onSelect: ({
                multiple,
                setState,
                name,
                onChange,
                onSelect,
                onUnselect,
                _value,
            }) => value => e => {
                if (typeof value === 'function') {
                    value();
                    setState({ open: false });
                    return;
                }

                const nextState = {};
                if (multiple) {
                    let values = _value || [];
                    if (includes(values, value)) {
                        values = without(values, value);
                        onUnselect && onUnselect({ target: { name, value } });
                    } else {
                        const nextValues = [];
                        values.forEach(v => nextValues.push(v));
                        nextValues.push(value);
                        values = nextValues;
                        onSelect && onSelect({ target: { name, value } });
                    }
                    nextState._value = values;
                } else {
                    nextState._value = value;
                    nextState.open = false;
                }

                if (e) {
                    nextState.itemFocusIndex = -1;
                }

                setState(nextState);
                onChange && onChange({ target: { name, value: nextState._value } });
            },
        };
    }),
    /**
     * Keyboard Navigation Functionality.
     *
     * Could be moved into its own file.
     */
    withHandlers({
        _onKeyDown: ({
            incrementIndex, setOpen, open,
        }) => e => {
            let preventDefault = true;
            switch (keycode(e)) {
                case 'esc':
                case 'tab':
                    preventDefault = false;
                    setOpen(false);
                    break;
                case 'right':
                case 'down':
                    if (open) {
                        incrementIndex(1);
                    } else {
                        preventDefault = false;
                    }
                    break;
                case 'up':
                case 'left':
                    if (open) {
                        incrementIndex(-1);
                    } else {
                        preventDefault = false;
                    }
                    break;
                default:
                    preventDefault = false;
                    break;
            }

            if (preventDefault) {
                e.stopPropagation();
                e.preventDefault();
            }
        },
        _onKeyUp: ({
            open, setOpen, itemFocusIndex, items, _onSelect,
        }) => e => {
            switch (keycode(e)) {
                case 'space':
                case 'enter':
                    if (!open) {
                        setOpen(true);
                    } else if (itemFocusIndex === -1) {
                        return;
                    }

                    const item = items[itemFocusIndex];
                    _onSelect(item.value)();
                    break;
                default:
                    break;
            }
        },
    }),
    /**
     * Dropdown lifecycle events.
     */
    lifecycle({
        componentDidUpdate(pp) {
            if (pp.itemFocusIndex !== this.props.itemFocusIndex) {
                this.props.focusItem();
            }
        },
        UNSAFE_componentWillMount() {
            window.addEventListener('click', this.props.onGlobalClick);
        },
        componentWillUnmount() {
            window.removeEventListener('click', this.props.onGlobalClick);
        },
        UNSAFE_componentWillReceiveProps(np) {
            if (!isEqual(np.value, this.props._value)) {
                this.props.setState({
                    _value: np.value,
                    itemFocusIndex: -1,
                });
            }

            if (!isEqual(np.disabled, this.props.disabled) && this.props.open) {
                this.props.setOpen(false);
            }
        },
    }),
);
