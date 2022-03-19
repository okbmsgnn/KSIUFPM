import { Reducer } from 'redux';
import * as R from 'ramda';
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
  tables: {},
  tableStatus: null,
};

export const predictionTableReducer: Reducer<
  PredictionTableState,
  PredictionTableAction
> = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TABLE: {
      const table = action.payload.data;
      return R.assocPath(['tables', table.id], table, state);
    }
    case DELETE_TABLE: {
      return R.dissocPath(['tables', action.payload.table.id], state);
    }
    case `${LOAD_TABLES}_SUCCESS` as const: {
      const tables = action.payload.reduce<{
        [key: string]: PredictionTable;
      }>((acc, t) => {
        acc[t.id] = t;
        return acc;
      }, {});

      return R.assoc('tables', tables, state);
    }
    case SET_TABLE_STATUS:
      return { ...state, tableStatus: action.payload };
    default:
      return state;
  }
};

export const getState = (state: any): PredictionTableState =>
  state[STATE_KEY];

export const getIndexedPredictionTables = createSelector(
  getState,
  (state) => state.tables
);

export const getPredictionTablesAsArray = createSelector(
  getState,
  (state) => Object.values(state.tables)
);

export const getTableById = createSelector(
  getState,
  (_: any, props: { tableId: string }) => props.tableId,
  (state, id) => state.tables[id]
);

export const getSortedPredictionTables = createSelector(
  getPredictionTablesAsArray,
  (tables) =>
    tables.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    )
);

export const getStatus = createSelector(
  getState,
  (state) => state.tableStatus
);
