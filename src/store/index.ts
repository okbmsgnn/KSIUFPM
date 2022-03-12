import { applyMiddleware, createStore } from 'redux';
import { loggerMiddleware } from './middlewares/logger';
import { sagaMiddleware } from './middlewares/saga';
import { rootReducer } from './reducer';
import { rootSaga } from './saga';

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware, loggerMiddleware)
);

Object.defineProperty(window, 'state', {
  get: () => store.getState(),
});

sagaMiddleware.run(rootSaga);

export { store };
