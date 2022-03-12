import { Reducer } from 'redux';
import { PredictionTableAction, PredictionTableState } from './model';
import { SET_DATA } from './predictionTableActions';

const initialState: PredictionTableState = {
  tables: [],
};

export const predictionTableReducer: Reducer<
  PredictionTableState,
  PredictionTableAction
> = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA: {
      return state;
    }
    default:
      return state;
  }
};
