import { rootReducer } from '../reducers';
import thunk from 'redux-thunk';
// import { logger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';

const Store = createStore(rootReducer, applyMiddleware(thunk));

export { Store };