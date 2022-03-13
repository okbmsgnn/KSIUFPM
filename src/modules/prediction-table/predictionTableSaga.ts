import { all, put, takeLatest } from 'redux-saga/effects';
import { MESSAGE } from './model';
import {
  CREATE_TABLE,
  LOAD_TABLES,
  populateTables,
  setTableCreationStatus,
} from './predictionTableActions';
import { normalizePredictionTables } from './utils/normalizePredictionTables';

function* normalizeTablesSaga(action: any) {
  const data = action.payload;

  const tables = normalizePredictionTables(
    Array.isArray(data) ? data : [data]
  );

  yield put(populateTables(tables));
}

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
    takeLatest(`${LOAD_TABLES}_SUCCESS`, normalizeTablesSaga),
    takeLatest(
      [`${CREATE_TABLE}_SUCCESS`, `${CREATE_TABLE}_FAIL`],
      notificationSaga
    ),
  ]);
}
