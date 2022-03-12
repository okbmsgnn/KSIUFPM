import { Reducer } from 'redux';
import { createSelector } from 'reselect';
import { PredictionTableAction, PredictionTableState } from './model';
import { POPULATE_TABLES } from './predictionTableActions';

export const STATE_KEY = 'predictionTable';

const initialState: PredictionTableState = {
  tables: [],
};

export const predictionTableReducer: Reducer<
  PredictionTableState,
  PredictionTableAction
> = (state = initialState, action) => {
  switch (action.type) {
    case POPULATE_TABLES: {
      return { ...state, tables: action.payload };
    }
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
