import { all, put, takeLatest } from 'redux-saga/effects';
import { OPEN_WINDOW } from '../workspace/workspaceActions';
import { loadStrictTableObjects } from './tableObjectActions';

function* loadTableObjectsSaga(
  action: any
): Generator<any, any, any> {
  const tableId = action.payload.id;

  yield put(loadStrictTableObjects(tableId));
}

function* tableObjectSaga(): Generator<any, any, any> {
  yield all([takeLatest(OPEN_WINDOW, loadTableObjectsSaga)]);
}

export default tableObjectSaga;
