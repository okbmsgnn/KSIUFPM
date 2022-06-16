import { createDataLoaderAction } from '../../store/middlewares/localDataLoader';
import { createDataSaverAction } from '../../store/middlewares/localDataSaver';
import { IStrictEvent } from './model';
import { strictEventDeserializer } from './utils/strictEventDeserializer';

export const namespace = 'TABLE_OBJECT';

export const LOAD_STRICT_EVENTS =
  `${namespace}/LOAD_STRICT_EVENTS` as const;
export const UPDATE_STRICT_EVENT =
  `${namespace}/UPDATE_STRICT_EVENT` as const;
export const CREATE_STRICT_EVENT =
  `${namespace}/CREATE_STRICT_EVENT` as const;
export const REMOVE_STRICT_EVENT =
  `${namespace}/REMOVE_STRICT_EVENT` as const;
export const SAVE_STRICT_EVENTS =
  `${namespace}/SAVE_STRICT_EVENTS` as const;

export const loadStrictTableObjects = (payload: string) =>
  createDataLoaderAction(
    LOAD_STRICT_EVENTS,
    {
      path: `table-objects/strict-events-${payload}.json`,
      deserialize: strictEventDeserializer,
    },
    { tableId: payload }
  );

export const createStrictEvent = (payload: {
  tableId: string;
  event: IStrictEvent;
}) => ({ type: CREATE_STRICT_EVENT, payload });

export const removeStrictEvent = (payload: {
  tableId: string;
  eventId: string;
}) => ({ type: REMOVE_STRICT_EVENT, payload });

export const updateStrictEvent = (payload: {
  tableId: string;
  event: IStrictEvent;
}) => ({ type: UPDATE_STRICT_EVENT, payload });

export const saveStrictEvents = (payload: {
  events: IStrictEvent[];
  tableId: string;
}) =>
  createDataSaverAction(
    SAVE_STRICT_EVENTS,
    {
      data: payload.events,
      path: `table-objects/strict-events-${payload.tableId}.json`,
    },
    { tableId: payload.tableId }
  );

export const tableObjectActions = {
  createStrictEvent,
  removeStrictEvent,
  updateStrictEvent,
  saveStrictEvents,
  loadStrictTableObjects,
};
