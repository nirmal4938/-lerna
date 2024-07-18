import { createStore } from 'redux';

// Initial State
const initialState = {
  counter: 0,
};

// Reducer Function
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, counter: state.counter + 1 };
    case 'DECREMENT':
      return { ...state, counter: state.counter - 1 };
    default:
      return state;
  }
};

// Create Redux Store
const store = createStore(rootReducer);

export default store;
