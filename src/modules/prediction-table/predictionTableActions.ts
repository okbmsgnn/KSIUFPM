import path from 'path';
import { createDataLoaderAction } from '../../store/middlewares/localDataLoader';
import { createDataRemoverAction } from '../../store/middlewares/localDataRemover';
import { createDataSaverAction } from '../../store/middlewares/localDataSaver';
import { PredictionTable, TableStatus } from './model';
import { predictionTableDeserializer } from './utils/predictionTableDeserializer';

export const namespace = 'PREDICTION_TABLE';

export const LOAD_TABLES = `${namespace}/LOAD_TABLES` as const;
export const CREATE_TABLE = `${namespace}/CREATE_TABLE` as const;
export const DELETE_TABLE = `${namespace}/DELETE_TABLE` as const;
export const SET_TABLE_STATUS =
  `${namespace}/SET_TABLE_STATUS` as const;

export const loadTables = () =>
  createDataLoaderAction(LOAD_TABLES, {
    path: 'tables',
    deserialize: predictionTableDeserializer,
  });

export const createTable = (payload: PredictionTable) =>
  createDataSaverAction(CREATE_TABLE, {
    path: path.join(
      'tables',
      `table_${payload.createdAt.getTime()}.json`
    ),
    data: payload,
  });

export const deleteTable = (payload: PredictionTable) =>
  createDataRemoverAction(DELETE_TABLE, {
    path: path.join('tables', payload.localName),
    table: payload,
  });

export const setTableStatus = (payload: TableStatus | null) => ({
  type: SET_TABLE_STATUS,
  payload,
});

export const predictionTableActions = {
  loadTables,
  createTable,
  deleteTable,
  setTableStatus,
};
