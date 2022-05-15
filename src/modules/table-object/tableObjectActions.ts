import { createDataLoaderAction } from '../../store/middlewares/localDataLoader';
import { strictEventDeserializer } from './utils/strictEventDeserializer';

export const namespace = 'TABLE_OBJECT';

export const LOAD_STRICT_EVENTS =
  `${namespace}/LOAD_STRICT_EVENTS` as const;

export const loadStrictTableObjects = (payload: string) =>
  createDataLoaderAction(
    LOAD_STRICT_EVENTS,
    {
      path: `table-objects/strict-events-${payload}.json`,
      deserialize: strictEventDeserializer,
    },
    { tableId: payload }
  );

export const tableObjectActions = {
  loadStrictTableObjects,
};
