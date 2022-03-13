import { Middleware } from 'redux';
import { app } from '@electron/remote';
import path from 'path';
import {
  readDirAsync,
  readFileAsync,
  readFilesAsync,
  stat,
} from '../../../utils/file-system';

import { DLAction, LOAD_LOCAL_DATA } from './createDataLoaderAction';

export const localDataLoaderMiddleware: Middleware =
  (store) => (next) => (_action) => {
    const result = next(_action);

    if (_action.meta?.type !== LOAD_LOCAL_DATA) return result;

    const action = _action as DLAction;

    const targetPath = path.isAbsolute(action.payload.path)
      ? action.payload.path
      : path.join(app.getAppPath(), action.payload.path);

    const load = async () => {
      const stats = await stat(targetPath);
      let data: { filename: string; filedata: string }[] | undefined =
        undefined;

      if (stats.isFile()) {
        const filename =
          /[^\\/]+$/.exec(targetPath)?.at(0) ?? '__UNKNOWN__';
        const filedata = await readFileAsync(targetPath);
        data = [{ filename, filedata }];
      } else if (stats.isDirectory()) {
        const files = await readDirAsync(targetPath);
        const paths = files.map((f) => path.join(targetPath, f));
        const filedata = await readFilesAsync(paths);
        data = files.map((filename, idx) => ({
          filename,
          filedata: filedata[idx],
        }));
      }

      if (data === undefined) throw new Error('Something went wrong');

      const deserialize = (filename: string, data: string) => {
        if (action.payload.deserialize)
          return action.payload.deserialize(filename, data);

        return JSON.parse(data);
      };

      const deserializedData = data.map((d) =>
        deserialize(d.filename, d.filedata)
      );

      store.dispatch({
        type: `${action.type}_SUCCESS`,
        payload: deserializedData,
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
