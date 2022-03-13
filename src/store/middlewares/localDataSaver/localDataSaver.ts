import { Middleware } from 'redux';
import { app } from '@electron/remote';
import path from 'path';
import { writeFileAsync } from '../../../utils/file-system';
import { SAVE_LOCAL_DATA, DSAction } from './createDataSaverAction';

export const localDataSaverMiddleware: Middleware =
  (store) => (next) => (_action) => {
    const result = next(_action);

    if (_action.meta?.type !== SAVE_LOCAL_DATA) return result;

    const action = _action as DSAction;

    const targetPath = path.isAbsolute(action.payload.path)
      ? action.payload.path
      : path.join(app.getAppPath(), action.payload.path);

    const save = async () => {
      try {
        await writeFileAsync(
          targetPath,
          JSON.stringify(action.payload.data, null, 2)
        );

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

    save();

    return result;
  };
