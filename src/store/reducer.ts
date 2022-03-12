import { combineReducers } from 'redux';
import { predictionTableReducer as predictionTable } from '../modules/prediction-table/predictionTableReducer';

const rootReducer = combineReducers({
  predictionTable,
});

export { rootReducer };
