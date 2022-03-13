import { all, put, takeLatest } from 'redux-saga/effects';
import { MESSAGE } from './model';
import {
  CREATE_TABLE,
  setTableCreationStatus,
} from './predictionTableActions';

function* notificationSaga(action: any) {
  const success = /SUCCESS/.test(action.type);
  const message = success
    ? MESSAGE.TABLE_CREATION_SUCCESS
    : MESSAGE.TABLE_CREATION_FAIL;

  yield put(
    setTableCreationStatus({
      success,
      description: message,
    })
  );
}

export function* predictionTableSagas() {
  yield all([
    takeLatest(
      [`${CREATE_TABLE}_SUCCESS`, `${CREATE_TABLE}_FAIL`],
      notificationSaga
    ),
  ]);
}
