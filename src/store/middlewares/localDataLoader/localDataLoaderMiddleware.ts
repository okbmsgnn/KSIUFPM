import { Middleware } from 'redux';
import { app } from '@electron/remote';
import path from 'path';
import {
  readDirAsync,
  readFileAsync,
  readFilesAsync,
  stat,
} from '../../../utils/file-system';

import { LDAction, LOAD_LOCAL_DATA } from './createLDAction';

export const localDataLoaderMiddleware: Middleware =
  (store) => (next) => (_action) => {
    const result = next(_action);

    if (_action.meta?.type !== LOAD_LOCAL_DATA) return result;

    const action = _action as LDAction;

    const targetPath = path.isAbsolute(action.payload.path)
      ? action.payload.path
      : path.join(app.getAppPath(), action.payload.path);

    const load = async () => {
      const stats = await stat(targetPath);
      let data: string | string[] | undefined = undefined;

      if (stats.isFile()) {
        data = await readFileAsync(targetPath);
      } else if (stats.isDirectory()) {
        const files = await readDirAsync(targetPath);
        const paths = files.map((f) => path.join(targetPath, f));
        data = await readFilesAsync(paths);
      }

      if (data === undefined) throw new Error('Something went wrong');

      store.dispatch({
        type: `${action.type}_SUCCESS`,
        payload: data,
        previousAction: action,
      });
    };

    load().catch((e) => {
      store.dispatch({
        type: `${action.type}_FAIL`,
        previousAction: action,
        error: e,
      });
    });

    return result;
  };
