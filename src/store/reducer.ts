import { combineReducers } from 'redux';
import * as predictionTable from '../modules/prediction-table/predictionTableReducer';

const rootReducer = combineReducers({
  [predictionTable.STATE_KEY]: predictionTable.predictionTableReducer,
});

export { rootReducer };
