import { applyMiddleware, createStore } from 'redux';
import { localDataLoaderMiddleware } from './middlewares/localDataLoader';
import { localDataRemoverMiddleware } from './middlewares/localDataRemover';
import { localDataSaverMiddleware } from './middlewares/localDataSaver';
import { loggerMiddleware } from './middlewares/logger';
import { sagaMiddleware } from './middlewares/saga';
import { rootReducer } from './reducer';
import { rootSaga } from './saga';

const store = createStore(
  rootReducer,
  applyMiddleware(
    sagaMiddleware,
    loggerMiddleware,
    localDataLoaderMiddleware,
    localDataSaverMiddleware,
    localDataRemoverMiddleware
  )
);

Object.defineProperty(window, 'state', {
  get: () => store.getState(),
});

sagaMiddleware.run(rootSaga);

export { store };
