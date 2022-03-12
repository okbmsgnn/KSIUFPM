import { all, put, takeLatest } from 'redux-saga/effects';
import { PredictionTable } from './model';
import {
  LOAD_TABLES,
  predictionTableActions,
} from './predictionTableActions';

function* normalizeTablesSaga(action: any) {
  const data = action.payload;

  const tables: PredictionTable[] = [];

  if (Array.isArray(data)) {
    tables.push(...data.map((d) => JSON.parse(d)));
  } else {
    tables.push(JSON.parse(data));
  }

  yield put(predictionTableActions.populateTables(tables));
}

export function* predictionTableSagas() {
  yield all([
    takeLatest(`${LOAD_TABLES}_SUCCESS`, normalizeTablesSaga),
  ]);
}
