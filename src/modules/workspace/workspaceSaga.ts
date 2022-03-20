import { all, put, select, takeLatest } from 'redux-saga/effects';
import { distanceBetweenPoints } from '../../utils/math';
import { getWindowSize } from '../application/applicationReducer';
import { WorkspaceWindow } from './model';
import { createWindow } from './utils/createWindow';
import { INIT_OPEN_WINDOW, openWindow } from './workspaceActions';
import { getWindowsAsArray } from './workspaceReducer';

function* openWindowSaga(action: any): Generator<any, any, any> {
  const windowID = action.payload;

  const existingWindows: WorkspaceWindow[] = yield select(
    getWindowsAsArray
  );
  const globalWindowSize = yield select(getWindowSize);

  const newWindow = createWindow({
    id: windowID,
    location: { x: globalWindowSize.client.width / 4, y: 50 },
  });

  for (let i = 0; i < 5; i++) {
    const badLocation = existingWindows.find(
      (window) =>
        distanceBetweenPoints(window.location, newWindow.location) <=
        20
    );

    if (!badLocation) break;

    newWindow.location = {
      x: badLocation.location.x + 20,
      y: badLocation.location.y + 20,
    };

    if (
      i === 4 ||
      newWindow.location.y > globalWindowSize.client.height - 100 ||
      newWindow.location.x > globalWindowSize.client.width - 100
    ) {
      newWindow.location = {
        x:
          globalWindowSize.client.width / 2 -
          newWindow.size.width / 2,
        y:
          globalWindowSize.client.height / 2 -
          newWindow.size.height / 2,
      };
    }
  }

  yield put(openWindow(newWindow));
}

export function* workspaceSaga() {
  yield all([takeLatest(INIT_OPEN_WINDOW, openWindowSaga)]);
}
