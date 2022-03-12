import { createLDAction } from '../../store/middlewares/localDataLoader';
import { PredictionTable } from './model';

export const namespace = 'PREDICTION_TABLE';

export const LOAD_TABLES = `${namespace}/LOAD_TABLES` as const;
export const POPULATE_TABLES =
  `${namespace}/POPULATE_TABLES` as const;

export const loadTables = () =>
  createLDAction(LOAD_TABLES, { path: 'tables' });

export const populateTables = (payload: PredictionTable[]) => ({
  type: POPULATE_TABLES,
  payload,
});

export const predictionTableActions = {
  loadTables,
  populateTables,
};
