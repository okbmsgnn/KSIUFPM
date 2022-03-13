import { Middleware } from 'redux';
import { app } from '@electron/remote';
import path from 'path';
import { removeAsync } from '../../../utils/file-system';
import {
  REMOVE_LOCAL_DATA,
  DRAction,
} from './createDataRemoverAction';

export const localDataRemoverMiddleware: Middleware =
  (store) => (next) => (_action) => {
    const result = next(_action);

    if (_action.meta?.type !== REMOVE_LOCAL_DATA) return result;

    const action = _action as DRAction;

    const targetPath = path.isAbsolute(action.payload.path)
      ? action.payload.path
      : path.join(app.getAppPath(), action.payload.path);

    const load = async () => {
      try {
        await removeAsync(targetPath);

        store.dispatch({
          type: `${action.type}_SUCCESS`,
          previousAction: action,
        });
      } catch (e) {
        store.dispatch({
          type: `${action.type}_FAIL`,
          previousAction: action,
          error: e,
        });
      }
    };

    load();

    return result;
  };
