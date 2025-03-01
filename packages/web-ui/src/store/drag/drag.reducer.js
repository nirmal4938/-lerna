import update from 'immutability-helper';
import max from 'lodash/max';
import { DragActionTypes } from './drag.actions';
import { SET_DRAGGING } from './drag.types';

const initialState = {
  dragging: false,
  count: 0,
};

export default (state = initialState, action) => {
  if (action.type.startsWith('@@redux/INIT')) {
    return initialState;
  }
  
  switch (action.type) {
    case SET_DRAGGING:
      const nextCount = state.count + (action.payload ? 1 : -1);
      return update(state, {
        dragging: { $set: nextCount > 0 },
        count: { $set: max([nextCount, 0]) || 0 },
      });
    default:
      return state;
  }
};
