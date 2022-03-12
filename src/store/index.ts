import { applyMiddleware, createStore } from 'redux';
import { loggerMiddleware } from './middlewares/logger';
import { rootReducer } from './reducer';

const store = createStore(
  rootReducer,
  applyMiddleware(loggerMiddleware)
);

export { store };
