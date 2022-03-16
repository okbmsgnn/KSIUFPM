import { Reducer } from 'redux';
import { createSelector } from 'reselect';
import {
  PredictionTable,
  PredictionTableAction,
  PredictionTableState,
} from './model';
import {
  CREATE_TABLE,
  DELETE_TABLE,
  LOAD_TABLES,
  SET_TABLE_STATUS,
} from './predictionTableActions';

export const STATE_KEY = 'predictionTable';

const initialState: PredictionTableState = {
  tables: [],
  tableStatus: null,
};

export const predictionTableReducer: Reducer<
  PredictionTableState,
  PredictionTableAction
> = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TABLE: {
      return {
        ...state,
        tables: state.tables.concat([action.payload.data]),
      };
    }
    case DELETE_TABLE: {
      return {
        ...state,
        tables: state.tables.filter(
          (t) => t.id !== action.payload.table.id
        ),
      };
    }
    case `${LOAD_TABLES}_SUCCESS` as const:
      return { ...state, tables: action.payload };
    case SET_TABLE_STATUS:
      return { ...state, tableStatus: action.payload };
    default:
      return state;
  }
};

export const getState = (state: any): PredictionTableState =>
  state[STATE_KEY];

export const getPredictionTables = createSelector(
  getState,
  (state) => state.tables
);

export const getSortedPredictionTables = createSelector(
  getState,
  (state) =>
    state.tables.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    )
);

export const getIndexedPredictionTables = createSelector(
  getState,
  (state) =>
    state.tables.reduce<{ [key: string]: PredictionTable }>(
      (acc, n) => {
        acc[n.id] = n;
        return acc;
      },
      {}
    )
);

export const getStatus = createSelector(
  getState,
  (state) => state.tableStatus
);
