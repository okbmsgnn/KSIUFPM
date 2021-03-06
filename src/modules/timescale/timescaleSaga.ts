import { utcMillisecond } from 'd3-time';
import { all, put, select, takeLatest } from 'redux-saga/effects';
import { IRange } from '../../types/IRange';
import { PredictionTable } from '../prediction-table/model';
import { getTableById } from '../prediction-table/predictionTableReducer';
import { OPEN_WINDOW } from '../workspace/workspaceActions';
import {
  RESET_ZOOM,
  setExtremeDates,
  ZOOM_IN,
  ZOOM_OUT,
} from './timescaleActions';
import { getExtremeDates, getMsDelta } from './timescaleReducer';
import { calculateExtremeDatesFor } from './utils/calculateExtremeDatesFor';
import { getTimeIntervalFor } from './utils/getTimeIntervalFor';

function* setTimescaleDataSaga(
  action: any
): Generator<any, any, any> {
  const window = action.payload;
  const table: PredictionTable = yield select(getTableById, {
    tableId: window.id,
  });

  const timeInterval = getTimeIntervalFor(table);
  const dates = calculateExtremeDatesFor(table, timeInterval, 30);

  yield put(
    setExtremeDates({
      dates,
      tableId: table.id,
    })
  );
}

function* zoomTimescaleSaga(action: any): Generator<any, any, any> {
  const tableId = action.payload;
  const table: PredictionTable = yield select(getTableById, {
    tableId,
  });
  const timeInterval = getTimeIntervalFor(table);
  const extremeDates: IRange<Date> = yield select(getExtremeDates, {
    tableId,
  });
  const msDelta = yield select(getMsDelta, { tableId });
  const zoomValue = msDelta * 0.1;

  let dates = { ...extremeDates };

  if (action.type === ZOOM_IN) {
    dates = {
      min: utcMillisecond.offset(dates.min, zoomValue),
      max: utcMillisecond.offset(dates.max, -zoomValue),
    };
  } else if (action.type === ZOOM_OUT) {
    const min = utcMillisecond.offset(dates.min, -zoomValue);
    const max = utcMillisecond.offset(dates.max, zoomValue);

    dates = {
      min:
        table.startDate && min.getTime() < table.startDate.getTime()
          ? table.startDate
          : min,
      max:
        table.endDate && max.getTime() > table.endDate.getTime()
          ? table.endDate
          : max,
    };
  } else {
    const defaultDates = calculateExtremeDatesFor(
      table,
      timeInterval,
      30
    );
    dates = defaultDates;
  }

  yield put(
    setExtremeDates({
      dates,
      tableId,
    })
  );
}

export function* timescaleSaga() {
  yield all([
    takeLatest(OPEN_WINDOW, setTimescaleDataSaga),
    takeLatest([ZOOM_IN, ZOOM_OUT, RESET_ZOOM], zoomTimescaleSaga),
  ]);
}
