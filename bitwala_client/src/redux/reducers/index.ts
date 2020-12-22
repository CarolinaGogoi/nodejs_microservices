import { combineReducers } from 'redux';
import { coinsReducer } from './coinsReducer';

export const rootReducer = combineReducers({
  coinsReducer
});

export type ApplicationState = ReturnType<typeof rootReducer>;
