import { all, put, takeLatest } from 'redux-saga/effects';
import {
  LOAD_TABLES,
  populateTables,
} from './predictionTableActions';
import { normalizePredictionTables } from './utils/normalizePredictionTables';

function* normalizeTablesSaga(action: any) {
  const data = action.payload;

  const tables = normalizePredictionTables(
    Array.isArray(data) ? data : [data]
  );

  yield put(populateTables(tables));
}

export function* predictionTableSagas() {
  yield all([
    takeLatest(`${LOAD_TABLES}_SUCCESS`, normalizeTablesSaga),
  ]);
}
