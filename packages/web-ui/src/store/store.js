import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import auth from './auth';
import {thunk} from 'redux-thunk';
import drag from './drag';

const rootReducer = combineReducers({
  auth, drag
});

const store = createStore(rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ));

export default store;
