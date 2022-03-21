import { utcDay, utcHour, utcMonth } from 'd3-time';
import { all, put, select, takeLatest } from 'redux-saga/effects';
import { PredictionTable } from '../prediction-table/model';
import { getTableById } from '../prediction-table/predictionTableReducer';
import { OPEN_WINDOW } from '../workspace/workspaceActions';
import { setExtremeDates } from './timescaleActions';

function* setTimescaleDataSaga(
  action: any
): Generator<any, any, any> {
  const window = action.payload;
  const table: PredictionTable = yield select(getTableById, {
    tableId: window.id,
  });

  const startDate = table.startDate ?? new Date();
  let endDate: Date = startDate;

  if (table.step.type === 'days') {
    const value = table.step.value < 3 ? 30 : table.step.value * 2;
    endDate = utcDay.offset(startDate, value);
  } else if (table.step.type === 'hours') {
    const value =
      table.step.value < 48 ? 7 * 24 : table.step.value * 2;
    endDate = utcHour.offset(startDate, value);
  } else if (table.step.type === 'month') {
    const value = table.step.value < 3 ? 6 : table.step.value * 2;
    endDate = utcMonth.offset(startDate, value);
  }

  yield put(
    setExtremeDates({
      dates: {
        max: endDate,
        min: startDate,
      },
      tableId: window.id,
    })
  );
}

export function* timescaleSaga() {
  yield all([takeLatest(OPEN_WINDOW, setTimescaleDataSaga)]);
}
