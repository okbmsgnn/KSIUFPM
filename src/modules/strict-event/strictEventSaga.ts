import { all, put, select, takeLatest } from 'redux-saga/effects';
import { OPEN_WINDOW } from '../workspace/workspaceActions';
import { IStrictEvent } from './model';
import {
  CREATE_STRICT_EVENT,
  loadStrictTableObjects,
  REMOVE_STRICT_EVENT,
  saveStrictEvents,
  UPDATE_STRICT_EVENT,
} from './strictEventActions';
import { getStrictEvents } from './strictEventReducer';

function* loadStrictEventsSaga(
  action: any
): Generator<any, any, any> {
  const tableId = action.payload.id;

  yield put(loadStrictTableObjects(tableId));
}

function* updateStrictEventSaga(
  action: any
): Generator<any, any, any> {
  const { tableId, event } = action.payload;

  const events = yield select(getStrictEvents, { tableId });

  const eventsToInsert = events.map((e: IStrictEvent) =>
    e.id === event.id ? event : e
  );

  yield put(saveStrictEvents({ tableId, events: eventsToInsert }));
}

function* removeStrictEventSaga(
  action: any
): Generator<any, any, any> {
  const { tableId, eventId } = action.payload;

  const events = yield select(getStrictEvents, { tableId });

  const eventsToInsert = events.filter(
    (e: IStrictEvent) => e.id !== eventId
  );

  yield put(saveStrictEvents({ tableId, events: eventsToInsert }));
}

function* createStrictEventSaga(
  action: any
): Generator<any, any, any> {
  const { tableId, event } = action.payload;

  const events = yield select(getStrictEvents, { tableId });

  const eventsToInsert: IStrictEvent[] = [...events, event];

  yield put(saveStrictEvents({ tableId, events: eventsToInsert }));
}

export function* strictEventSaga(): Generator<any, any, any> {
  yield all([
    takeLatest(OPEN_WINDOW, loadStrictEventsSaga),
    takeLatest(UPDATE_STRICT_EVENT, updateStrictEventSaga),
    takeLatest(REMOVE_STRICT_EVENT, removeStrictEventSaga),
    takeLatest(CREATE_STRICT_EVENT, createStrictEventSaga),
  ]);
}
