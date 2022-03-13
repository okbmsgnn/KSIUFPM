import { all, put, takeLatest } from 'redux-saga/effects';
import { MESSAGE, TableStatus } from './model';
import {
  CREATE_TABLE,
  DELETE_TABLE,
  setTableStatus,
} from './predictionTableActions';

function* notificationSaga(action: any) {
  const success = /SUCCESS/.test(action.type);

  const payload: TableStatus = {
    success,
  };

  if (/CREATE/.test(action.type))
    payload.description = success
      ? MESSAGE.TABLE_CREATION_SUCCESS
      : MESSAGE.TABLE_CREATION_FAIL;

  if (/DELETE/.test(action.type))
    payload.description = success
      ? MESSAGE.TABLE_DELETION_SUCCESS
      : MESSAGE.TABLE_DELETION_FAIL;

  yield put(setTableStatus(payload));
}

export function* predictionTableSagas() {
  yield all([
    takeLatest(
      [
        `${CREATE_TABLE}_SUCCESS`,
        `${CREATE_TABLE}_FAIL`,
        `${DELETE_TABLE}_SUCCESS`,
        `${DELETE_TABLE}_FAIL`,
      ],
      notificationSaga
    ),
  ]);
}
